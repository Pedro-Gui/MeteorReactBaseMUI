import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import { TaskListControllerContext } from './taskListController';
import { SysCardTask } from '../../components/sysCardTask/sysCardTask';
import TaskListStyles from './taskListStyles';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';

const TaskListView = () => {

	const { list, onSearch, onSetFilter, onAddButtonClick, onTaskButtonClick, state, page, setPage, loading } = useContext(TaskListControllerContext);
	const [searchTxt, setSearchTxt] = useState('');
	const theme = useTheme();
	const { Container, Filters } = TaskListStyles;
	const options = [
		{ value: '', label: 'Todos' },
		{ value: 'aberto', label: 'Em aberto' },
		{ value: 'concluido', label: 'Concluído' },
		{ value: 'andamento', label: 'Em andamento' },
		{ value: 'naoConcluido', label: 'Não concluído' }
	];

	return (
		<Container>
			<Typography variant="h5">{state ? "Minhas Tarefas" : "Atividades recentes"}</Typography>
			{state && (
				<Filters>
					<TextField
						name="TaskSearch"
						placeholder="Pesquisar por descrição"
						value={searchTxt}
						onChange={(e) => { setSearchTxt(e.target.value); onSearch('description', e.target.value); }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SysIcon name={'search'} sx={{ color: theme.palette.sysAction?.primaryIcon }} />
								</InputAdornment>

							),
							endAdornment: searchTxt && (
								<InputAdornment position="end">
									<IconButton onClick={() => { setSearchTxt(''); onSearch('description', '') }} edge="end">
										<SysIcon name={'close'} />
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
					<SysSelectField
						name="type"
						label="Filtrar por status"
						placeholder="Selecionar"	
						onChange={(e) => {
							onSetFilter('type', e.target.value);
						}}
						options={options}
					/>
				</Filters>)}
			{list && !loading &&
				list?.map((task) => {
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
			{/*no lugar de 10 deveria ser tamanho da lista dividido pelo numero de elementos por pagina, mas não consegui publicar o tamanho da lista ainda*/}
			{state && !loading && (<Pagination count={10} page={page} onChange={(e, value) => setPage(value)} color="primary" />)}
			<SysFab
				variant="extended"
				text={state ? "Adicionar tarefa" : "Minhas tarefas"}
				startIcon={state ? <SysIcon name={'add'} /> : <SysIcon name={'attachFile'} />}
				fixed={true}
				onClick={state ? onAddButtonClick : onTaskButtonClick}
			/>
		</Container>
	);
};

export default TaskListView;
