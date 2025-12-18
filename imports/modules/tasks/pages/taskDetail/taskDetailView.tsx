import React, { Fragment, useContext } from 'react';
import { TaskDetailControllerContext } from './taskDetailContoller';
import { TaskModuleContext } from '../../taskContainer';
import TaskDetailStyles from './taskDetailStyles';
import SysForm from '../../../../ui/components/sysForm/sysForm';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysRadioButton } from '../../../../ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import SysFormButton from '../../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { SysUploadFile } from '../../../../ui/components/sysFormFields/sysUploadFile/sysUploadFile';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import SysSwitch from '/imports/ui/components/sysFormFields/sysSwitch/sysSwitch';
import Box from '@mui/material/Box';

const TaskDetailView = () => {
	const controller = useContext(TaskDetailControllerContext);
	const { userId } = useContext(TaskDetailControllerContext);
	const { state } = useContext(TaskModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
	const { Container, Body, Header, Footer, FormColumn, FormRow } = TaskDetailStyles;
	console.log(state)
	return (
		<Container>
			<Header>
				{isView && (
					<IconButton onClick={controller.closePage}>
						<SysIcon name={'arrowBack'} />
					</IconButton>
				)}
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					{isCreate ? 'Adicionar Item' : isEdit ? 'Editar Item' : controller.document.title}
				</Typography>
				<IconButton
					onClick={!isView ? controller.closePage : () => controller.changeToEdit(controller.document._id || '')}>
					{!isView ? <SysIcon name={'close'} /> : <SysIcon name={'edit'} />}
				</IconButton>
				{isView && (
					<IconButton
						disabled={userId !== controller.document.ownerId}
						onClick={() => controller.onDeleteButtonClick(controller.document._id || '')}
					>
						{<SysIcon name={'delete'} />}
					</IconButton>)}
			</Header>
			<SysForm
				mode={state as 'create' | 'view' | 'edit'}
				schema={controller.schema}
				doc={controller.document}
				onSubmit={controller.onSubmit}
				loading={controller.loading}>
				<Body >
					<FormColumn>
						<SysTextField name="title" placeholder="Ex.: Item XX" />
						<SysSelectField name="type" placeholder="Selecionar" disabled={!isEdit} />
						{!isView &&
							(<SysTextField
								name="description"
								placeholder="Acrescente informações sobre o item (3 linhas)"
								multiline
								rows={3}
								showNumberCharactersTyped
								max={200}
							/>
							)}
						<FormRow>
							<Box sx={{ flex: 1, maxWidth: '305px', width: 'auto' }}>
								<SysRadioButton name="typeMulti" childrenAlignment="row" size="small" />
							</Box>
							<Box sx={{ width: 'auto' }}>
								<SysSwitch name='isPrivate'
									valueLabelTrue={controller.schema.isPrivate.valueLabelTrue} // porque está propriedade precisa ser passada assim ? mas o label vem direto do schema
									valueLabelFalse={controller.schema.isPrivate.valueLabelFalse}
								/>

							</Box>

						</FormRow>

						{!isView && (<SysUploadFile name="files" />)}
					</FormColumn>
					{isView && (<FormColumn>
						<SysTextField
							name="description"
							inputMode='text'
							placeholder="Acrescente informações sobre o item (3 linhas)"
							multiline
							minRows={3}
							maxRows={8}
							showNumberCharactersTyped
							max={200}
						/>

						<SysUploadFile name="files" />
					</FormColumn>)}
				</Body>
				<Footer>
					{!isView && (
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={controller.closePage}>
							Cancelar
						</Button>
					)}
					<SysFormButton disabled={(controller.document.ownerId !== userId) && state !== 'create'}>Salvar</SysFormButton>
				</Footer>
			</SysForm>
		</Container>
	);
};

export default TaskDetailView;
