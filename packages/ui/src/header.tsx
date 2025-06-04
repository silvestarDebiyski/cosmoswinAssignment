'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IUser, useUser } from '@repo/ui/userProvider';
import { useTranslation } from '@repo/ui/useTranslation';
import { useState } from 'react';
import { useUpdateUser } from './updateUser';

export default function Header(props: {
	user?: IUser;
	styles: any;
	path: string;
}) {
	const router = useRouter();
	const { user, setUser } = useUser();
	const [svgColor, setSVGColor] = useState<'white' | 'black'>('white');
	const t = useTranslation();
	const updateUser = useUpdateUser({ url: props.path });

	const handleLogout = () => {
		setUser(null);
		sessionStorage.setItem('user', '');
		router.push('/');
	};
	const navigateBonus = () => {
		router.push('/bonusShop');
	};
	const navigateDeposit = () => {
		router.push('/deposit');
	};
	const navigateDashboard = () => {
		router.push('/dashboard');
	};
	const handleLanguageChange = async (e: string) => {
		const selectedLang = e as 'en' | 'ar';
		if (user) {
			await updateUserSelectedLanguage(user, selectedLang);
		}
	};
	// TO DO: move this outside common component or make url dynamic
	const updateUserSelectedLanguage = async (
		selectedUser: IUser,
		lang: IUser['language']
	) => {
		selectedUser.language = lang;
		const result = await updateUser(selectedUser);
		await setUser(result);
	};

	return (
		<header>
			<Image
				alt=""
				width={180}
				height={38}
				src={'logo-main.svg'}
				className="logo"
			/>
			{props.user && (
				<div className={props.styles.options}>
					<div className={props.styles.logout}>
						<div //TO DO fix svg logic
							onClick={navigateDashboard}
							className={props.styles.homeImageContainer}
							onPointerEnter={() => setSVGColor('black')}
							onPointerLeave={() => setSVGColor('white')}
						>
							<svg
								className={props.styles.homeIcon}
								fill={svgColor}
								// xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width="40"
								height="35"
								viewBox="0 0 50 50"
							>
								<path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
							</svg>
						</div>
						<div className={props.styles.dropdown}>
							<button className={props.styles.dropbtn}>
								{user?.language ?? 'en'}
							</button>
							<div className={props.styles.dropdownContent}>
								<a
									onClick={() => {
										handleLanguageChange('en');
									}}
								>
									English
								</a>
								<a
									onClick={() => {
										handleLanguageChange('ar');
									}}
								>
									العربية
								</a>
							</div>
						</div>
						<div className={props.styles.dropdown}>
							<button className={props.styles.dropbtn}>
								{props.user.username}
							</button>
							<div className={props.styles.dropdownContent}>
								<a onClick={navigateDeposit}>{t.deposit}</a>
								<a onClick={navigateBonus}>{t.bonusShop}</a>
								<a onClick={handleLogout}>{t.logout}</a>
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
