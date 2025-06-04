import { Button } from '@repo/ui/button';
import { useState } from 'react';
import { useTranslation } from './useTranslation';
import Input from './input';

const LoginForm = (props: any) => {
	const className = props.styles.loginPage;
	const [username, setUsername] = useState('');
	const t = useTranslation();

	function login() {
		props.login(username);
	}
	const handleChangeUsername = (e: any) => {
		setUsername(e.target.value);
	};

	return (
		<div className={className}>
			<label>
				<h1>Log In</h1>
			</label>
			<Input
				type={'text'}
				onChange={handleChangeUsername}
				styles={props.styles}
				label="User Name"
				value={username || ''}
			/>

			<Button
				onClick={() => {
					login();
				}}
				className={props.styles.smallSecondary}
			>
				{t.login}
			</Button>
			{props.errors && <p>{props.errors}</p>}
		</div>
	);
};

export default LoginForm;
