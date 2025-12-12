import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { sysShadows, sysSizing } from '../../../../ui/materialui/styles';

interface ISysCardTaskStyled {
	Container: React.ElementType;
	ActionBox: React.ElementType;
	Status: React.ElementType;
}

const SysCardTaskStyled: ISysCardTaskStyled = {
	Container: styled(Box)(({ theme }) => ({
		width: '100%',
		backgroundColor: theme.palette.background.default,
		borderRadius: sysSizing.radiusSm,
		padding: sysSizing.spacingFixedMd,
		boxShadow: sysShadows.shadow2,
		display: 'grid',
		gap: '0.75rem 1.25rem',
		gridTemplateColumns: ' 25px 2fr 2fr 140px 1fr',
		gridTemplateAreas: '"icon description owner status actions"',
		alignItems: 'center',
		textAlign: 'left',
		[theme.breakpoints.down('lg')]: {
			gridTemplateColumns: ' 25px 2fr 1fr 1fr',
			gridTemplateAreas: '"icon description owner" "status actions actions"'
		},
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns: '25px 1fr 1fr 1fr',
			gridTemplateAreas: '"icon description description" "owner owner" "status actions actions"'
		},
		'& > p': {
			wordBreak: 'break-all'
		}
	})),
	ActionBox: styled(Box)(({ theme }) => ({
		gridArea: 'actions',
		display: 'flex',
		justifyContent: 'end',
		gap: sysSizing.spacingFixedMd,
		'> svg': {
			cursor: 'pointer',
			color: theme.palette.sysAction?.primaryIcon
		}
	})),
	Status: styled(Typography)(({ theme }) => ({
		gridArea: 'status',
		[theme.breakpoints.down('sm')]: {
			justifySelf: 'end'
		}
	}))
};

export default SysCardTaskStyled;
