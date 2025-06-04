import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { UserProvider } from '@repo/ui/userProvider';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
});

export const metadata: Metadata = {
	title: 'Betfinal',
	description: 'cosmo win',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <UserProvider>{children}</UserProvider>;
}
