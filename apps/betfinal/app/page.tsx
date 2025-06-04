'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';
import LoginForm from '@repo/ui/loginForm';
import { useUser } from '@repo/ui/userProvider';
import Header from '@repo/ui/header';
import { useFetchUser } from '@repo/ui/useFetchUser';
import config from '../config';

export default function Home() {
	const { setUser } = useUser();
	const userFetcher = useFetchUser({ url: config.path });

	const [loggedInError, setLogInError] = useState('');
	const router = useRouter();

	const handleLogin = async (userName: string) => {
		if (userName === '') {
			setLogInError('Please enter a username');
			return;
		}
		const data = await userFetcher(userName);
		if (data) {
			setUser(data);
			router.push('/dashboard');
		} else {
			setLogInError('Invalid User');
		}
	};
	return (
		<div className={styles.page}>
			<Header
				styles={styles}
				path={config.path}
			/>
			<div className={styles.bodyWraper}>
				<LoginForm
					login={(e: any) => {
						handleLogin(e);
					}}
					styles={styles}
					errors={loggedInError}
				/>
			</div>
		</div>
	);
}
