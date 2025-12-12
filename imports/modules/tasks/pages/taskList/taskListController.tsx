import React, { createContext, useCallback, useMemo, useContext } from 'react';
import TaskListView from './taskListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { ITask } from '../../api/taskSch';
import { taskApi } from '../../api/taskApi';
import { TaskModuleContext } from '../../taskContainer';
import { IMeteorError } from '../../../../typings/BoilerplateDefaultTypings';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface ITaskListContollerContext {
	onTaskButtonClick: () => void;
	onAddButtonClick: () => void;
	onEditButtonClick: (id: string) => void;
	onDeleteButtonClick: (id: string) => void;
	onConcluirButtonClick: (doc: ITask) => void;
	onSearch: (username: string | undefined) => void;
	onSetFilter: (field: string, value: string | null | undefined) => void;
	list: ITask[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
	state: string | undefined;
}

export const TaskListControllerContext = React.createContext<ITaskListContollerContext>(
	{} as ITaskListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false
};

const TaskListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);
	const { state } = useContext(TaskModuleContext);
	const { title, type, typeMulti } = taskApi.getSchema();
	const taskSchReduzido = { title, type, typeMulti, createdat: { type: Date, label: 'Criado em' } };
	const navigate = useNavigate();

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { loading, tasks } = useTracker(() => {
		const list = state == 'mytask' ? 'taskList' : '5FirstTaskList';
		
		const subHandle = taskApi.subscribe(list, filter, {
			sort
		});

		const tasks = subHandle?.ready() ? taskApi.find(filter, { sort }).fetch() : [];
		return {
			tasks,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : tasks.length
		};
	}, [config, state]);

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/task/mytask/create/${newDocumentId}`);
	}, []);

	const onEditButtonClick = useCallback((id: string) => {
		const newDocumentId = nanoid();
		navigate(`/task/mytask/edit/${id}`);
	}, []);

	const onTaskButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/task/mytask`);
	}, []);

	const onConcluirButtonClick  = useCallback((doc: ITask) => {
			switch (doc.type) {
					case 'concluido':
						doc.type = 'naoConcluido';
						break;
					case 'andamento':
						doc.type = 'concluido';
						break;
					case 'naoConcluido':
						doc.type = 'andamento';
						break;
					default:
						doc.type = 'naoConcluido';
						break;
				}

			taskApi['update'](doc, (e: IMeteorError) => {
				
				if (!e) {
					
					showNotification({
						type: 'success',
						title: 'Operação realizada!',
						message: `A tarefa foi atualizada com sucesso!`
					});
				} else {
					showNotification({
						type: 'error',
						title: 'Operação não realizada!',
						message: `Erro ao realizar a operação: ${e.reason}`
					});
				}
			});
		}, []);
	const onDeleteButtonClick = useCallback((id: string) => {
		taskApi.remove({ _id: id });
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);
		return () => clearTimeout(delayedSearch);
	}, []);

	const onSelectedCategory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!value) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					type: { $ne: null }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, type: value } }));
	}, []);

	const onSearch = useCallback((username: string | undefined) => {
			const searchUsername = username !== undefined ? username.trim() : '';
			const delayedSearch = setTimeout(() => {
				setConfig((prevConfig) => ({
					...prevConfig,
					searchBy: searchUsername !== '' ? searchUsername : null
				}));
			}, 1000);
			return () => clearTimeout(delayedSearch);
		}, []);
	
		const onSetFilter = useCallback(
			(field: string, value: string | null | undefined) => {
				setConfig((prevConfig) => ({
					...prevConfig,
					filter: {
						...prevConfig.filter,
						...(value ? { [field]: value } : { [field]: { $ne: null } })
					}
				}));
			},
			[tasks]
		);

	const providerValues: ITaskListContollerContext = useMemo(
		() => ({
			onTaskButtonClick,
			onAddButtonClick,
			onEditButtonClick,
			onConcluirButtonClick,
			onDeleteButtonClick,
			onSearch,
			onSetFilter,
			list: tasks,
			schema: taskSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory,
			state
		}),
		[tasks, loading, state]
	);

	return (
		<TaskListControllerContext.Provider value={providerValues}>
			<TaskListView />
		</TaskListControllerContext.Provider>
	);
};

export default TaskListController;
