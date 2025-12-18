import React, { createContext, useCallback, useContext } from 'react';
import TaskDetailView from './taskDetailView';
import { useNavigate } from 'react-router-dom';
import { TaskModuleContext } from '../../taskContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { taskApi } from '../../api/taskApi';
import { ITask } from '../../api/taskSch';
import { ISchema } from '../../../../typings/ISchema';
import { IMeteorError } from '../../../../typings/BoilerplateDefaultTypings';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';

interface ITaskDetailContollerContext {
	closePage: () => void;
	document: ITask;
	userId: string;
	loading: boolean;
	schema: ISchema<ITask>;
	onSubmit: (doc: ITask) => void;
	changeToEdit: (id: string) => void;
	onDeleteButtonClick: (id: string) => void;
}

export const TaskDetailControllerContext = createContext<ITaskDetailContollerContext>(
	{} as ITaskDetailContollerContext
);

const TaskDetailController = () => {
	const navigate = useNavigate();
	const { id, state } = useContext(TaskModuleContext);
	const { showNotification, showDialog ,closeDialog } = useContext<IAppLayoutContext>(AppLayoutContext);
	
	const { document, userId, loading } = useTracker(() => {
		const subHandle = !!id ? taskApi.subscribe('taskDetail', { _id: id }) : null;
		const document = !!id && subHandle?.ready() ? taskApi.findOne({ _id: id }) : {};
		const userId = Meteor.userId();
		return {
			document: (document as ITask) ?? ({ _id: id } as ITask),
			userId: userId || '',
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id, state]);
	
	const closePage = useCallback(() => {
		navigate(-1);
	}, []);
	const changeToEdit = useCallback((id: string) => {
		navigate(`/mytask/edit/${id}`);
		location.reload();// recarregar a pagina para a descriçãod a tarefa aparecer
	}, []);

	const onSubmit = useCallback((doc: ITask) => {
		const selectedAction = state === 'create' ? 'insert' : 'update';
		
		doc.owner = Meteor.user()?.username || 'unknown';
		doc.ownerId = Meteor.userId()!;
		taskApi[selectedAction](doc, (e: IMeteorError) => {
			if (!e) {
				closePage();
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: `A tarefa foi ${selectedAction === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
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
								navigate(-1);
								showNotification({
								  type: 'success',
								  title: 'Operação realizada!',
								  message: 'Tarefa excluída com sucesso!'
								});
							}
						});
	}, []);
	return (
		<TaskDetailControllerContext.Provider
			value={{
				closePage,
				document: { ...document, _id: id },
				userId,
				loading,
				schema: taskApi.getSchema(),
				onSubmit,
				changeToEdit,
				onDeleteButtonClick
			}}>
			{<TaskDetailView />}
		</TaskDetailControllerContext.Provider>
	);
};

export default TaskDetailController;
