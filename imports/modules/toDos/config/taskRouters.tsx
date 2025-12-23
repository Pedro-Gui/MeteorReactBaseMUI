import TaskContainer from '../taskContainer';
import { Recurso } from './recursos';
import { IRoute } from '../../modulesTypings';

export const taskRouterList: (IRoute | null)[] = [
	{
		path: '/mytask/:screenState/:taskId',
		component: TaskContainer,
		isProtected: true,
		resources: [Recurso.TASK_VIEW]
	},
	{
		path: '/:screenState',
		component: TaskContainer,
		isProtected: true,
		resources: [Recurso.TASK_CREATE]
	},
	{
		path: '/',
		exact: true,
		component: TaskContainer,
		isProtected: true,
		resources: [Recurso.TASK_VIEW]
	}
];
