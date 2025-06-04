import React from 'react';
import Image from 'next/image';
import { Button } from './button';
import { useTranslation } from './useTranslation';
import { useRouter } from 'next/navigation';

export const UserProfileCard = (props: any) => {
	const t = useTranslation();
	const router = useRouter();
	const navigateBonus = () => {
		router.push('/bonusShop');
	};
	const navigateDeposit = () => {
		router.push('/deposit');
	};
	return (
		<div className={props.styles.profileFrame}>
			<div className={props.styles.profileCardCenter}>
				<div className={props.styles.profile}>
					<div className={props.styles.profileImage}>
						<div className={props.styles.profileCircle1}></div>
						<div className={props.styles.profileCircle12}></div>
						<Image
							alt=""
							width={70}
							height={70}
							src={'profile-default.svg'}
							className="logo"
						/>
					</div>

					<div className={props.styles.profileName}>{props.user.username}</div>
					<div className={props.styles.profileActions}>
						<Button
							className={props.styles.small}
							onClick={navigateBonus}
						>
							{t.bonusShop}
						</Button>
						<Button
							className={props.styles.small}
							onClick={navigateDeposit}
						>
							{t.deposit}
						</Button>
					</div>
				</div>
				<div className={props.styles.profileStats}>
					<div className={props.styles.profileBox}>
						<span className={props.styles.profileValue}>
							{props.user.currentBalance}
						</span>
						<span className={props.styles.profileParameter}>
							{t.currentBalance}
						</span>
					</div>
					<div className={props.styles.profileBox}>
						<span className={props.styles.profileValue}>
							{props.user.depositCount}
						</span>
						<span className={props.styles.profileParameter}>
							{t.depositCount}
						</span>
					</div>
					<div className={props.styles.profileBox}>
						<span className={props.styles.profileValue}>
							{props.user.isKYCApproved ? '✓' : 'X'}
						</span>
						<span className={props.styles.profileParameter}>
							{t.isKYCApproved}
						</span>
					</div>
					<div className={props.styles.profileBox}>
						<span className={props.styles.profileParameter}>
							{t.memberSince}
						</span>
						<span className={props.styles.profileValue}>
							{props.user.registrationDate}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
