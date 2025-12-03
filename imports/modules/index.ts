import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Task from './tasks/config';
import Aniversario from './aniversario/config';
import UserProfile from './userprofile/config';

const pages: Array<IRoute | null> = [
	...Task.pagesRouterList, 
	...Aniversario.pagesRouterList, 
	...UserProfile.pagesRouterList
];

const menuItens: Array<IAppMenu | null> = [
	...Task.pagesMenuItemList, 
	...Aniversario.pagesMenuItemList,
	...UserProfile.pagesMenuItemList
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
