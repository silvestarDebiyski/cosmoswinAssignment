import { useCallback } from 'react';

type UseFetchBonusOptions = {
	url: string;
};

export function useFetcBonus({ url }: UseFetchBonusOptions) {
	const fetchBonus = useCallback(async (): Promise<any> => {
		try {
			const response = await fetch(`${url}/bonuses`);
			if (!response.ok) {
				throw new Error('Failed to fetch user');
			}
			const resp = await response.json();
			return resp;
		} catch (error) {
			console.error(error);
			return null;
		}
	}, [url]);

	return fetchBonus;
}
