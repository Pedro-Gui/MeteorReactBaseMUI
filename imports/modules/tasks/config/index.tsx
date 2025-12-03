import { taskRouterList } from './taskRouters';
import { taskMenuItemList } from './taskAppMenu';
import { IModuleHub } from '../../modulesTypings';

const Task: IModuleHub = {
	pagesRouterList: taskRouterList,
	pagesMenuItemList: taskMenuItemList
};

export default Task;
