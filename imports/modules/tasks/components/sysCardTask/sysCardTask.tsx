import React, { Fragment, useCallback, useRef, RefObject } from 'react';
import { SxProps, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SysCardTaskStyled from './sysCardTaskStyles';
import { TaskListControllerContext } from '../../pages/taskList/taskListController';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import SysMenu from '/imports/ui/components/sysMenu/sysMenuProvider';
import { ISysMenuRef } from '/imports/ui/components/sysMenu/sysMenuProvider';
import { ITask } from '../../api/taskSch';
import { useNavigate } from 'react-router-dom';

interface ISysTaskProps {
	title: string;
	description: string;
	owner: string | undefined;
	ownerId: string | undefined;
	_id: string;
	type: string;
	sx?: SxProps<Theme>;
}


export const SysCardTask: React.FC<ISysTaskProps> = ({ ...props }: ISysTaskProps) => {
	const navigate = useNavigate();
	const context = React.useContext(TaskListControllerContext);
	const menuMobileRef = useRef<ISysMenuRef>(null);

	const { onDeleteButtonClick, onEditButtonClick, onConcluirButtonClick } = context;
	const { title, description, owner, ownerId, _id, type, sx } = props;
	const { Container, ActionBox, Status, Owner, Description, NavContainerDesktop, NavContainerMobile } = SysCardTaskStyled;
	const userId = Meteor.userId();

	const StatusTexto = () => {
		switch (type) {
			case 'concluido':
				return <Status color="green" >Concluído</Status>;
				break;
			case 'andamento':
				return <Status color="orange"  >Em andamento</Status>;
				break;
			case 'naoConcluido':
				return <Status color="red"  >Não concluído</Status>;
				break;
			default:
				return <Status color="red"  >Não concluído</Status>;
				break;
		}
	}
	const menuOpcoes = () => {
		const opcoes =
			[
				{
					key: `${_id}-AvancarStatus`,
					onClick: () => onConcluirButtonClick(props as ITask),
					otherProps: {
						label: 'Avançar status',
						startIcon: (<SysIcon name='checkCircle' />)
					}
				},
			]
		if (ownerId === userId) {
			opcoes.push(
				{
					key: `${_id}-Deletar`,
					onClick: () => onDeleteButtonClick(_id),
					otherProps: {
						label: 'Deletar',
						startIcon: (<SysIcon name='delete' />),
					}
				}
			)
			opcoes.unshift({
									key: `${_id}-Editar`,
									onClick: () => onEditButtonClick(props._id),
									otherProps: {
										label: 'Editar',
										startIcon: (<SysIcon name='edit' />),
									}
								})
		}
		return opcoes;
	}

	const abrirMenuMobile = useCallback((event: React.MouseEvent<HTMLElement>): void => {
		menuMobileRef.current?.openMenu(event)
	}, [menuMobileRef]);

	const fecharMenuMobile = useCallback((): void => {
		menuMobileRef.current?.closeMenu()
	}, [menuMobileRef]);

	return (
		<Container sx={sx} key={_id}>

			<ListItemAvatar sx={{ maxWidth: '3%', gridArea: 'icon' }}>
				{type === "concluido" ? <SysIcon name='checkCircle'/> : <SysIcon name='errorCircle'  /> }
			</ListItemAvatar>

			<Description onClick= {()=> navigate(`/mytask/view/${_id}`)}>
				{description}
			</Description>

			<Owner >
				{owner}
			</Owner>


			{StatusTexto()}

			<ActionBox>
				<NavContainerDesktop>
					<Tooltip title={'Avançar etapa de status'}>
						<span>
							<IconButton onClick={() => onConcluirButtonClick(props as ITask)} >
								<SysIcon name={'checkCircle'} />
							</IconButton>
						</span>
					</Tooltip>

					<Tooltip title={'Editar'}>
						<span>
							<IconButton onClick={() => onEditButtonClick(_id)} disabled={ownerId !== userId}>
								<SysIcon name={'edit'} />
							</IconButton>
						</span>
					</Tooltip>


					<Tooltip title={'Deletar'}>
						<span>
							<IconButton onClick={() => onDeleteButtonClick(_id)} disabled={ownerId !== userId}>
								<SysIcon name={'delete'} />
							</IconButton>
						</span>
					</Tooltip>
				</NavContainerDesktop>
				<NavContainerMobile>
					<Fragment>
						<IconButton onClick={abrirMenuMobile}>
							<SysIcon name='moreVert' sx={{ width: '24px', height: '24px', padding: '-24px' }} />
						</IconButton>
						<SysMenu
							ref={menuMobileRef}
							options={menuOpcoes()}
							activeArrow
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						/>

					</Fragment>
				</NavContainerMobile>


			</ActionBox>
		</Container>
	);
};
