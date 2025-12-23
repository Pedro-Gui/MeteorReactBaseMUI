import React from 'react';
import { ElementType } from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { sysShadows, sysSizing } from '../../../../ui/materialui/styles';

interface ISysCardTaskStyled {
	Container: React.ElementType;
	ActionBox: React.ElementType;
	Status: React.ElementType;
	Owner: React.ElementType;
	Description: React.ElementType;
	NavContainerDesktop: ElementType<BoxProps>;
	NavContainerMobile: ElementType<BoxProps>;
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
		gridTemplateColumns: ' 25px 2fr 2fr 1fr',
		gridTemplateAreas: '"icon description description description" " icon owner status actions"',
		alignItems: 'center',
		textAlign: 'left',
		[theme.breakpoints.down('lg')]: {
			gridTemplateColumns: ' 25px 1.5fr 1.5fr 1fr',
			gridTemplateAreas: '"icon description description description" "icon owner status actions"'
		},
		[theme.breakpoints.down('sm')]: {
			padding: sysSizing.spacingFixedSm,
			gridTemplateColumns: '25px 1fr  1.1fr 32px',
			gridTemplateAreas: '"icon description description  actions"  "icon owner status actions"'
		},
		'& > p': {
			wordBreak: 'break-all'
		},

	})),
	ActionBox: styled(Box)(({ theme }) => ({
		gridArea: 'actions',
		display: 'flex',
		justifySelf: 'flex-end',
		justifyContent: 'flex-end',
		gap: sysSizing.spacingFixedMd,
		'> svg': {
			cursor: 'pointer',
			color: theme.palette.sysAction?.primaryIcon
		}
	})),
	Status: styled(Typography)(({ theme }) => ({
		gridArea: 'status',
		[theme.breakpoints.down('sm')]: {
			justifySelf: 'start',
		},
		[theme.breakpoints.down('lg')]: {
			justifySelf: 'start'
		}

	})),
	Owner: styled(Typography)(({ theme }) => ({
		gridArea: 'owner',
		[theme.breakpoints.down('lg')]: {
			justifySelf: 'start'

		},
		[theme.breakpoints.down('sm')]: {
			justifySelf: 'start',
			justifyContent: 'start'
		},


	})),
	Description: styled(Typography)(({ theme }) => ({
		gridArea: 'description',
		variant: "subtitle1",
		cursor: 'pointer',
		transition: 'color 0.3s ease',
		borderRadius: sysSizing.radiusSm,
		
		'&:hover': {
			color: theme.palette.primary.contrastText, 
			backgroundColor: theme.palette.primary.light,
			transform: 'scale(0.99)' 
			//textDecoration: 'underline',
		},

		'&:active': {
			color: theme.palette.primary.contrastText, 
			backgroundColor: theme.palette.primary.dark,
			transform: 'scale(0.99)' 
		}

	}
	)),

	/**
   * Each breakpoint (a key) matches with a fixed screen width (a value).
   * {
   *    // extra-small
   *    xs: 0,
   *    // small
   *    sm: 600,
   *    // medium
   *    md: 900,
   *    // large
   *    lg: 1200,
   *    // extra-large
   *    xl: 1536,
   * }
   */

	NavContainerDesktop: styled(Box)(({ theme }) => ({
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: sysSizing.spacingRemMd,
		paddingRight: sysSizing.spacingFixedMd,
		[theme.breakpoints.down('sm')]: { display: 'none' },
	})),
	NavContainerMobile: styled(Box)(({ theme }) => ({
		display: 'none',
		flex: 1,
		alignItems: 'end',
		justifyContent: 'end',
		[theme.breakpoints.down('sm')]: { display: 'flex' },
	})),

};

export default SysCardTaskStyled;