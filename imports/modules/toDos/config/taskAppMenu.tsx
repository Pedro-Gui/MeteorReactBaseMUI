import React from 'react';
import { IAppMenu } from '../../modulesTypings';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

export const taskMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/',
		name: 'Home',
		icon: <SysIcon name={'menuOpen'} />,
		exact: true
		
	},
	{
		path: '/mytask',
		name: 'Mytask',
		icon: <SysIcon name={'person'} />
	}
];
