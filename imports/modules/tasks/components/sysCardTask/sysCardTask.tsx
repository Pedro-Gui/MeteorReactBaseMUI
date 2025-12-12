import React from 'react';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SysCardTaskStyled from './sysCardTaskStyles';
import { TaskListControllerContext } from '../../pages/taskList/taskListController';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { ITask } from '../../api/taskSch';

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
	//console.log('SysCardTask props:', props);
	const context = React.useContext(TaskListControllerContext);
	const { onDeleteButtonClick, onEditButtonClick, onConcluirButtonClick } = context;
	const { title, description, owner, ownerId, _id, type, sx } = props;
	const { Container, ActionBox, Status } = SysCardTaskStyled;
	const userId = Meteor.userId();
	Status
	const StatusTexto = () => {
	switch(type) {
					case 'concluido':
						return <Status color="green"  variant="body1" sx={{ gridArea: 'status' }} >Concluído</Status>;
						break;
					case 'andamento':
						return <Status color="orange"  variant="body1" sx={{ gridArea: 'status' }} >Em andamento</Status>;
						break;
					case 'naoConcluido':
						return <Status color="red"  variant="body1" sx={{ gridArea: 'status' }} >Não concluído</Status>;
						break;
					default:
						return <Status color="red"  variant="body1" sx={{ gridArea: 'status' }}>Não concluído</Status>;
						break;
				}
	}
	return (
		<Container sx={sx} key={_id}>

			<ListItemAvatar sx={{ maxWidth: '3%', gridArea: 'icon' }}>
				<LabelOutlinedIcon color="action" />
			</ListItemAvatar>

			<Typography sx={{ gridArea: 'description' }} variant="subtitle1">
				{description}
			</Typography>

			<Typography variant="body1" sx={{ gridArea: 'owner' }}>
				{owner}
			</Typography>

			
			{StatusTexto()}
			

			<ActionBox>
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


			</ActionBox>
		</Container>
	);
};
