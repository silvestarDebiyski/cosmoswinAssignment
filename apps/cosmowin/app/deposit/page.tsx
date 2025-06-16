'use client';

import { useRouter } from 'next/navigation';
import styles from '../page.module.css';
import { useEffect, useState } from 'react';
import { useUser } from '@repo/ui/userProvider';
import Header from '@repo/ui/header';
import { useTranslation } from '@repo/ui/useTranslation';
import config from '../../config';
import { Button } from '@repo/ui/button';
import Input from '@repo/ui/input';
import { useUpdateUser } from '@repo/ui/updateUser';

export default function DepositPage() {
	const router = useRouter();
	const [depositAmount, setDepositAmount] = useState(0);
	const [successDeposit, setSuccessDeposit] = useState<string | undefined>();
	const { user, setUser } = useUser();
	const t = useTranslation();
	const updateUser = useUpdateUser({ url: config.path });

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

	const addToBalance = async () => {
		let selectedUser: any = { ...user };
		selectedUser.currentBalance = selectedUser.currentBalance + depositAmount;
		selectedUser.depositCount = selectedUser.depositCount + 1;
		// const result = await updateUser(selectedUser);
		const res = await fetch('/api/update-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(selectedUser),
		});

		const result2 = await res.json();
		await setUser(result2.updatedUser);
		setUser(result2.updatedUser);
		const depositMSG =
			t.depositMessage1 + ' ' + depositAmount + ' ' + t.depositMessage2;
		setSuccessDeposit(depositMSG);
	};

	return (
		<div className={styles.page}>
			<Header
				user={user}
				styles={styles}
				path={config.path}
			/>

			<div className={styles.bodyWraper}>
				<h1>{t.deposit}</h1>
				<div className={styles.depositBox}>
					{successDeposit}
					<Input
						type={'number'}
						onChange={(e: any) => {
							setDepositAmount(+e.target.value);
						}}
						styles={styles}
						label={t.deposit}
					/>
					<Button
						className={styles.small}
						onClick={depositAmount ? addToBalance : () => {}}
					>
						{t.deposit}
					</Button>
				</div>
			</div>
		</div>
	);
}
