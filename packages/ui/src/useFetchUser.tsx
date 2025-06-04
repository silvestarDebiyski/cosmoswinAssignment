import { useCallback } from 'react';
import { IUser } from './userProvider';

type UseFetchUserOptions = {
	url: string;
};

export function useFetchUser({ url }: UseFetchUserOptions) {
	const fetchUser = useCallback(
		async (userName: string): Promise<IUser | null> => {
			try {
				const response = await fetch(`${url}/user/${userName}`);
				if (!response.ok) {
					throw new Error('Failed to fetch user');
				}
				const resp = await response.json();
				sessionStorage.setItem('user', JSON.stringify(resp));
				return resp;
			} catch (error) {
				console.error(error);
				return null;
			}
		},
		[url]
	);

	return fetchUser;
}
