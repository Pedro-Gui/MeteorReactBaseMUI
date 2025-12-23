import React, { useCallback, useMemo, useContext, useState } from 'react';
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
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean; skip: number; limit: number };
	filter: Object;
	searchBy: string | null;
	pageInitial: number;
}

interface ITaskListContollerContext {
	onTaskButtonClick: () => void;
	onAddButtonClick: () => void;
	onEditButtonClick: (id: string) => void;
	onDeleteButtonClick: (id: string) => void;
	onConcluirButtonClick: (doc: ITask) => void;
	onSearch: (field: string, description: string | undefined) => void;
	onSetFilter: (field: string, value: string | null | undefined) => void;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
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
	sortProperties: { field: 'createdat', sortAscending: false, skip: 0, limit: 5 },
	filter: {},
	searchBy: null,
	pageInitial: 1,
};

const TaskListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification,showWindow, showDialog, closeDialog } = useContext<IAppLayoutContext>(AppLayoutContext);
	
	const { state } = useContext(TaskModuleContext);
	
	const { title, type, typeMulti } = taskApi.getSchema();
	const taskSchReduzido = { title, type, typeMulti, createdat: { type: Date, label: 'Criado em' } };
	const navigate = useNavigate();

	const { sortProperties, filter, pageInitial } = config;

	const [page, setPage] = useState<number>(pageInitial);

	let sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1,
		limit: sortProperties.limit,
		skip: sortProperties.skip
	};

	const { loading, tasks } = useTracker(() => {
		const list = state == 'mytask' ? 'taskList' : '5FirstTaskList';
		sort.skip = sort.limit * (page - 1);

		const subHandle = taskApi.subscribe(list, filter, {
			sort
		});

		const tasks = subHandle?.ready() ? taskApi.find(filter, { sort }).fetch() : [];
		return {
			tasks,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : tasks.length
		};
	}, [config, state, filter, page]);

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		showWindow({
							urlPath: `/mytask/create/${newDocumentId}`
						});
	}, []);

	const onEditButtonClick = useCallback((id: string) => {

		showWindow({
							urlPath: `/mytask/edit/${id}`
						});
	}, []);

	const onTaskButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/mytask`);
	}, []);

	const onConcluirButtonClick = useCallback((doc: ITask) => {

		switch (doc.type) { //passando para o proximo estagio naoConcluido -> andamento -> concluido -> maoconcluido .....
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
						DeleteDialog({
							showDialog: showDialog,
							closeDialog: closeDialog,
							title:  'Excluir arquivo',
							message:  'Tem certeza que deseja excluir a tarefa ?',
							onDeleteConfirm: () => {
								taskApi.remove({ _id: id });
								showNotification({
								  type: 'success',
								  title: 'Operação realizada!',
								  message: 'Tarefa excluída com sucesso!'
								});
							}
						});
					

		
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

	const onSearch = useCallback((field: string, description: string | undefined) => {
		const searchDescription = description !== undefined ? description.trim() : '';
		const delayedSearch = setTimeout(() => {
			setConfig((prevConfig) => ({
				...prevConfig,
				//{ $regexMatch: { input: <expression> , regex: <expression>, options: <expression> } }
				filter: {
					...prevConfig.filter,
					...(searchDescription ? { [field]: { $regex: searchDescription, $options: 'i' } } : { [field]: { $ne: null } })
				}
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
						...(value ?
							 {[field]: value === 'aberto' ?  { $in: ['andamento', 'naoConcluido'] } :  value } : { [field]: { $ne: null } })
					}
				}));
			
		},
		[tasks]
	);
	const { filter2 } = useTracker(() => { // fiz isso para resetar o filtro quando mudar de estado entre minhas tarefas e todas as tarefas
		const filter2 = !state ? setConfig((prevConfig) => ({
					...prevConfig,
					filter: {
						...prevConfig.filter,
						...( { ['type']: { $ne: null } })
					}
				})) : null;
		return {
			filter2,
		};
	}, [state]);
	
	const providerValues: ITaskListContollerContext = useMemo(
		() => ({
			onTaskButtonClick,
			onAddButtonClick,
			onEditButtonClick,
			onConcluirButtonClick,
			onDeleteButtonClick,
			onSearch,
			onSetFilter,
			setPage,
			page,
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
