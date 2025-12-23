import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Task from './toDos/config';


const pages: Array<IRoute | null> = [
	...Task.pagesRouterList, 

];

const menuItens: Array<IAppMenu | null> = [
	...Task.pagesMenuItemList, 

];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
