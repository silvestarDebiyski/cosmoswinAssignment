'use client';
import styles from '../page.module.css';
import { useEffect, useState } from 'react';
import { IUser, useUser } from '@repo/ui/userProvider';
import Header from '@repo/ui/header';
import { useTranslation } from '@repo/ui/useTranslation';
import BonusCard, { Bonus } from '@repo/ui/bonusCard';
import { Button } from '@repo/ui/button';
import { useRouter } from 'next/navigation';
import { useUpdateUser } from '@repo/ui/updateUser';
import { useFetcBonus } from '@repo/ui/useFetchBonus';
import { filterBonuses } from '@repo/ui/filterBonuses';
import config from '../../config';

export default function BonusShopPage() {
	const router = useRouter();
	const updateUser = useUpdateUser({ url: config.path });
	const fetchBonuses = useFetcBonus({ url: config.path });
	const { user, setUser } = useUser();
	const [bonuses, setBonuses] = useState<Bonus[]>([]);
	const [lastCollectedBonus, setLastCollectedBonus] = useState<
		string | undefined
	>(undefined);

	const t = useTranslation();

	useEffect(() => {
		let data = sessionStorage.getItem('user');
		if (user) {
			getBonuses(user);
		}
		if (!user && data && data !== '') {
			setUser(JSON.parse(data));
		} else if (!user) {
			router.push('/');
		}
	}, []);
	useEffect(() => {
		if (!bonuses.length && user) {
			getBonuses(user);
		}
	}, [user]);

	const getBonuses = async (selectedUser: IUser) => {
		const res = await fetchBonuses();
		const bonusesArray = await res;

		setBonuses(
			filterBonuses(
				bonusesArray,
				selectedUser,
				config.requiresKYCForBonuses,
				'betfinal'
			)
		);
	};

	const navigateDeposit = () => {
		router.push('/deposit');
	};
	const applyBonus = async (bonus: Bonus) => {
		let selectedUser: any = { ...user };
		if (selectedUser.collectedBonuses) {
			selectedUser.collectedBonuses.push(bonus.id);
		} else {
			selectedUser.collectedBonuses = [bonus.id];
		}
		const result = await updateUser(selectedUser);
		await setUser(result);
		setUser(result);
		let bonusName = bonus.name[(result.language ?? 'en') as 'en' | 'ar'];
		setLastCollectedBonus(bonusName);
	};
	if (!user) {
		return <></>;
	}
	// TO DO: add loading so user cannot spam click
	return (
		<div className={styles.page}>
			<Header
				user={user}
				styles={styles}
				path={config.path}
			/>
			<div className={styles.bodyWraper}>
				<h1>Bonus shop</h1>
				{lastCollectedBonus && (
					<h2>
						{' '}
						{t.claimed} {lastCollectedBonus}
					</h2>
				)}

				{bonuses && (
					<div className={styles.bonusShopWrapper}>
						{bonuses.map((bonus: Bonus, index: number) => {
							const isClaimed = user.collectedBonuses
								? user.collectedBonuses.some(
										(collectedBonuses: string) => bonus.id === collectedBonuses
									)
								: false;
							return (
								<div
									key={index}
									className={styles.bonusElement}
								>
									<BonusCard
										styles={styles}
										bonus={bonus}
										language={user.language ?? 'en'}
										applyBonus={applyBonus}
										isClaimed={isClaimed}
									/>
								</div>
							);
						})}
						{(!bonuses || !bonuses.length) && (
							<>
								<h1>{t.notEligible}</h1>
								<Button
									className={styles.small}
									onClick={navigateDeposit}
								>
									{t.deposit}
								</Button>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
