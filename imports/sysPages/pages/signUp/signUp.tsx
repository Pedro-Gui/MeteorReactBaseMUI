// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import Button from '@mui/material/Button';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';
import { useNavigate } from 'react-router-dom';
import SignUpStyles from './signUpStyle';
import Box from '@mui/material/Box';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import Typography from '@mui/material/Typography';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

interface ISignUp {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	const { showNotification } = props;
	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper } = SignUpStyles;

	const handleSubmit = (doc: { email: string; username: string; password: string }) => {
		const { email, username, password } = doc;
		// console.log(doc, email, username, password); // ta recebendo certo, o problema está na api.
		userprofileApi.insertNewUser({username: username,email: email,password: password }, (err, r) => {
			if (err) {
				console.log('Login err', err);
				showNotification &&
					showNotification({
						type: 'warning',
						title: 'Problema na criação do usuário!',
						description: 'Erro ao fazer registro em nossa base de dados!'
					});
			} else {
				showNotification &&
					showNotification({
						type: 'sucess',
						title: 'Cadastrado com sucesso!',
						description: 'Registro de usuário realizado em nossa base de dados!'
						
					});
				navigate('/signin');
			}
		});
	};

	return (
		<Container >
			<Content>
				<Typography variant="h1" display={'inline-flex'} gap={1}>
					<Typography variant="inherit" color={(theme) => theme.palette.sysText?.tertiary}>
						{'{'}
					</Typography>
					Boilerplate <br /> To-Do List
					<Typography variant="inherit" color="sysText.tertiary">
						<br />{'}'}
					</Typography>
				</Typography>

				<FormContainer>
					<Typography variant="h5">Cadastrar no sistema</Typography>

					<SysForm schema={{
						username: {
							type: String,
							label: 'Username',
							optional: false
						},
						email: {
							type: String,
							label: 'Email',
							optional: false
						},
						password: {
							type: String,
							label: 'Senha',
							optional: false
						}
					}}
						onSubmit={handleSubmit} debugAlerts={false}>
						<FormWrapper>
							<SysTextField label="Username" fullWidth name="username" placeholder="Digite um nome de usuário" type='text' />
							<SysTextField label="Email" fullWidth name="email" placeholder="Digite seu email" />
							<SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />

							<Box />

							<SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
								Cadastrar
							</SysFormButton>
						</FormWrapper>

					</SysForm>

					<Box >
					Já tem uma conta? Faça login clicando{' '}
					<Link to="/signin" color={'primary'}>
						aqui
					</Link>
				</Box>
				</FormContainer>
				
			</Content>
		</Container>
	);
};
