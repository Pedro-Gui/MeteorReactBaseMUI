import TaskContainer from '../taskContainer';
import { Recurso } from './recursos';
import { IRoute } from '../../modulesTypings';

export const taskRouterList: (IRoute | null)[] = [
	{
		path: '/task/:screenState/:taskId',
		component: TaskContainer,
		isProtected: true,
		resources: [Recurso.TASK_VIEW]
	},
	{
		path: '/task/:screenState',
		component: TaskContainer,
		isProtected: true,
		resources: [Recurso.TASK_CREATE]
	},
	{
		path: '/task',
		exact: true,
		component: TaskContainer,
		isProtected: true,
		resources: [Recurso.TASK_VIEW]
	}
];
