import React from 'react';
import { IAppMenu } from '../../modulesTypings';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

export const taskMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/task',
		name: 'Home',
		icon: <SysIcon name={'menuOpen'} />,
		exact: true
		
	},
	{
		path: '/task/mytask',
		name: 'Mytask',
		icon: <SysIcon name={'person'} />
	}
];
