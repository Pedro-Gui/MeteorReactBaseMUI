import React, { useContext,  useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { TaskListControllerContext } from './taskListController';
import { SysCardTask } from '../../components/sysCardTask/sysCardTask';
import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '../../../../ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '../../../../ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import TaskListStyles from './taskListStyles';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';

const TaskListView = () => {

	const { list, onSearch, onSetFilter, onAddButtonClick,onTaskButtonClick, state } = useContext(TaskListControllerContext);
	const [selectedRole, setSelectedRole] = useState('');
	const theme = useTheme();
	const { Container, Filters } = TaskListStyles;
	const options = [
		{ value: '',			 label: 'Nenhum'},
		{ value: 'concluido', 	 label: 'Concluído' },
		{ value: 'andamento', 	 label: 'Em andamento' },
		{ value: 'naoConcluido', label: 'Não concluído' }
	];

	
	return (
		<Container>
			<Typography variant="h5">{state ? "Minhas Tarefas":"Atividades recentes"}</Typography>
			<Filters>
				<TextField
					name="TaskSearch"
					placeholder="Pesquisar por descrição"
					onChange={(e) => onSearch('description', e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SysIcon name={'search'} sx={{ color: theme.palette.sysAction?.primaryIcon }} />
							</InputAdornment>
						)
					}}
				/>
				<SysSelectField
					name="Status"
					label="Filtrar por status"
					placeholder="Selecionar"
					value={selectedRole}
					onChange={(e) => {
						setSelectedRole(e.target.value);
						onSetFilter('type', e.target.value);
					}}
					options={options}
				/>
			</Filters>
			{list &&
				list?.map((task) => {
					
					//console.log('passando props:', task);
					return (
						<SysCardTask
							title={task.title}
							key={task._id}
							description={task.description}
							owner={task.owner}
							ownerId={task.ownerId}
							type={task.type}
							_id={task._id!}
						/>
					);
				})}
			<SysFab
				variant="extended"
				text={state? "Adicionar tarefa" :"Minhas tarefas"}
				startIcon={<SysIcon name={'attachFile'} />}
				fixed={true}
				onClick={state? onAddButtonClick : onTaskButtonClick}
			/>
		</Container>
	);
};

export default TaskListView;
