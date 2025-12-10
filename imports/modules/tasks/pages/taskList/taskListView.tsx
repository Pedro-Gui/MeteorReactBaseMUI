import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { TaskListControllerContext } from './taskListController';
import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '../../../../ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '../../../../ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import TaskListStyles from './taskListStyles';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

const TaskListView = () => {
	const controller = React.useContext(TaskListControllerContext);
	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer } = TaskListStyles;

	const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.type.options?.() ?? [])];

	return (
		<Container>
			<Typography variant="h5">{controller.state ? "Minhas Tarefas":"Atividades recentes"}</Typography>
			
			{controller.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<Box sx={{ width: '100%' }}>
					<ComplexTable
						data={controller.todoList}
						schema={controller.schema}
						
						onRowClick={(row) => navigate('/task/view/' + row.id)}
						onEdit={(row) => navigate('/task/edit/' + row._id)}
						onDelete={(row) => {
							DeleteDialog({
								showDialog: sysLayoutContext.showDialog,
								closeDialog: sysLayoutContext.closeDialog,
								title: `Excluir dado ${row.title}`,
								message: `Tem certeza que deseja excluir o arquivo ${row.title}?`,
								onDeleteConfirm: () => {
									controller.onDeleteButtonClick(row);
									sysLayoutContext.showNotification({
										message: 'Excluído com sucesso!'
									});
								}
							});
						}}
					/>
				</Box>
			)}

			<SysFab
				variant="extended"
				text={controller.state? "Adicionar tarefa" :"Minhas tarefas"}
				startIcon={<SysIcon name={'attachFile'} />}
				fixed={true}
				onClick={controller.state? controller.onAddButtonClick:controller.onTaskButtonClick}
			/>
		</Container>
	);
};

export default TaskListView;
