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

interface ISysTaskProps {
	title: string;
	description: string;
	owner: string | undefined;
	_id: string;
	type: string;
	sx?: SxProps<Theme>;
}

export const SysCardTask: React.FC<ISysTaskProps> = ({ ...props }: ISysTaskProps) => {
	//console.log('SysCardTask props:', props);
	const context = React.useContext(TaskListControllerContext);
	const { onDeleteButtonClick, onEditButtonClick } = context;
	const { title, description, owner, _id, type, sx } = props;
	const { Container, ActionBox, Status } = SysCardTaskStyled;

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

			<Typography variant="body1" sx={{ gridArea: 'status' }}>
				{type}
			</Typography>

			<ActionBox>
				<>
					<Tooltip title={'Editar'}>
						<IconButton onClick={() => onEditButtonClick(_id)}>
							<SysIcon name={'edit'} />
						</IconButton>
					</Tooltip>
				</>

				<Tooltip title={'Deletar'}>
					<IconButton onClick={() => onDeleteButtonClick(_id)}>
						<SysIcon name={'delete'} />
					</IconButton>
				</Tooltip>

			</ActionBox>
		</Container>
	);
};
