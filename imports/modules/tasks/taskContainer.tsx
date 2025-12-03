import React from 'react';
import { IDefaultContainerProps } from '../../typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import TaskListController from './pages/taskList/taskListController';
import TaskDetailController from './pages/taskDetail/taskDetailContoller';

export interface ITaskModuleContext {
	state?: string;
	id?: string;
}

export const TaskModuleContext = React.createContext<ITaskModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, taskId } = useParams();
	const state = screenState ?? props.screenState;
	const id = taskId ?? props.id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!state || !validState.includes(state)) return <TaskListController />;
		return <TaskDetailController />;
	};

	const providerValue = {
		state,
		id
	};
	return <TaskModuleContext.Provider value={providerValue}>{renderPage()}</TaskModuleContext.Provider>;
};
