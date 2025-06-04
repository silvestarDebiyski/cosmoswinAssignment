import React from 'react';
import Image from 'next/image';
import { useTranslation } from './useTranslation';

type LocalizedText = {
	en: string;
	ar: string;
};

export type Bonus = {
	id: string;
	brand: string;
	name: LocalizedText;
	description: LocalizedText;
	requiresKYC: boolean;
	depositCountMin?: number;
	depositCountMax?: number;
	registrationWithinLastDays?: number;
	balanceMustBeZero?: boolean;
	availableCountries?: string[];
};

type BonusCardProps = {
	bonus: Bonus;
	language: 'en' | 'ar';
	styles: any;
	isClaimed?: boolean;
	applyBonus: (bonus: Bonus) => void;
};

export default function BonusCard(props: BonusCardProps) {
	const t = useTranslation();
	return (
		<div
			onClick={() => {
				!props.isClaimed ? props.applyBonus(props.bonus) : () => {};
			}}
			className={
				!props.isClaimed
					? props.styles.bonusCard
					: props.styles.bonusCardClaimed
			}
		>
			<Image
				alt=""
				width={70}
				height={70}
				src={'bonus.svg'}
				className={props.styles.bonusCardImage}
			/>
			<h3>{props.bonus.name[props.language]}</h3>
			<p>{props.bonus.description[props.language]}</p>
			{props.isClaimed && (
				<div className={props.styles.isClaimed}>{t.isClaimed}</div>
			)}
		</div>
	);
}
