'use client';

import { useRouter } from 'next/navigation';
import styles from '../page.module.css';
import { useEffect } from 'react';
import { useUser } from '@repo/ui/userProvider';
import Header from '@repo/ui/header';
import { useTranslation } from '@repo/ui/useTranslation';
import { UserProfileCard } from '@repo/ui/userProfileCard';
import config from '../../config';

export default function DashboardPage() {
	const router = useRouter();
	const { user, setUser } = useUser();
	const t = useTranslation();

	useEffect(() => {
		let data = sessionStorage.getItem('user');
		if (!user && data && data !== '') {
			setUser(JSON.parse(data));
		} else if (!user) {
			router.push('/');
		}
	}, []);

	if (!user) {
		return <></>;
	}

	return (
		<div className={styles.page}>
			<Header
				user={user}
				styles={styles}
				path={config.path}
			/>

			<div className={styles.bodyWraper}>
				<h1>
					{t.welcome} {user?.username}
				</h1>
				<UserProfileCard
					user={user}
					styles={styles}
				/>
			</div>
		</div>
	);
}
