
import { SignUp } from '../../sysPages/pages/signUp/signUp';
import { EmailVerify } from '../../sysPages/pages/emailVerify/emailVerify';
import { ResetPassword } from '../../sysPages/pages/resetPassword/resetPassword';
import { PasswordRecovery } from '../../sysPages/pages/recoveryPassword/passwordRecovery';
import { IRoute } from '../../modules/modulesTypings';
import { NoPermission } from '../../sysPages/pages/noPermission/noPermission';
import SignInPage from '../pages/signIn/signIn';


export const pagesRouterList: (IRoute | null)[] = [
	
	{
		path: '/signin',
		component: SignInPage,
		isProtected: false,
		templateVariant: 'None'
	},
	{
		path: '/signup',
		component: SignUp,
		isProtected: false,
		templateVariant: 'None'
	},
	{
		path: '/no-permission',
		component: NoPermission,
		isProtected: true
	},
	{
		path: '/password-recovery',
		component: PasswordRecovery,
		templateVariant: 'None'
	},
	{
		path: '/reset-password/:token',
		component: ResetPassword,
		templateVariant: 'None'
	},
	{
		path: '/enroll-account/:token',
		component: ResetPassword,
		templateVariant: 'None'
	},
	{
		path: '/verify-email/:token',
		component: EmailVerify,
		templateVariant: 'None'
	}
];
