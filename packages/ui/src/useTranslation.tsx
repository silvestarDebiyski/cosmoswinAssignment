import { translations } from './i18n';
import { useUser } from './userProvider';

export const useTranslation = () => {
	const { user } = useUser();
	const lang = user?.language ?? 'en';
	const translation = translations;
	return translation[lang];
};
