import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import {sysShadows, sysSizing } from '../../../../ui/materialui/styles';
import { SysSectionPaddingXY } from '../../../../ui/layoutComponents/sysLayoutComponents';

interface ITaskDetailStyles {
	Container: ElementType<BoxProps>;
	Header: ElementType<BoxProps>;
	Body: ElementType<BoxProps>;
	Footer: ElementType<BoxProps>;
	FormColumn: ElementType<BoxProps>;
	FormRow: ElementType<BoxProps>;
}

const TaskDetailStyles: ITaskDetailStyles = {
	Container: styled(SysSectionPaddingXY)(({theme}) => ({
		width: '95%',
		backgroundColor: theme.palette.background.default,
		borderRadius: sysSizing.radiusSm,
		padding: sysSizing.spacingFixedMd,
		boxShadow: sysShadows.shadow2,
		margin:sysSizing.spacingFixedMd,

		display: 'flex',
		flexDirection: 'column',
		alignSelf: 'center',
		justifyContent: 'flex-start',
		alignItems: 'center',
		'& > p': {
			wordBreak: 'break-all'
		},
	})),
	Header: styled(Box)({
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}),
	Body: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		gap: '64px',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			gap: sysSizing.spacingFixedMd
		}
	})),
	Footer: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
		gap: sysSizing.spacingRemMd,
		marginTop: '40px'
	}),
	FormColumn: styled(Box)({
		width: '100%',
		display: 'flex',
		paddingTop: sysSizing.spacingFixedMd,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: sysSizing.spacingFixedLg
	}),
	FormRow: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: sysSizing.spacingFixedLg,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			gap: sysSizing.spacingFixedMd
		}
	})),
};

export default TaskDetailStyles;
