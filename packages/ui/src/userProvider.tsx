'use client';
import { createContext, useContext, useState } from 'react';

type UserContextType = {
	user: IUser | null;
	setUser: (user: IUser | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);
export interface IUser {
	username: string;
	depositCount: number;
	registrationDate: string;
	country: string;
	isKYCApproved: boolean;
	currentBalance: number;
	language: 'en' | 'ar' | undefined;
	collectedBonuses?: string[];
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null);

	const lang = user?.language ?? 'en';
	const dir = lang === 'ar' ? 'rtl' : 'ltr';

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<html
				lang={lang}
				dir={dir}
			>
				<body>{children}</body>
			</html>
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used inside UserProvider');
	}
	return context;
};
