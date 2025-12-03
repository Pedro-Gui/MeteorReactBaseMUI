import React from 'react';
import { IAppMenu } from '../../modulesTypings';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

export const taskMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/task',
		name: 'Home',
		icon: <SysIcon name={'dashboard'} />
	}
];
