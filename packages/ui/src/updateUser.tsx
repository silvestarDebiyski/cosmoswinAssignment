import { useCallback } from 'react';
import { IUser } from './userProvider';

type UseUpdateUserOptions = {
	url: string;
};

export function useUpdateUser({ url }: UseUpdateUserOptions) {
	const updateUser = useCallback(
		async (updatedUser: IUser) => {
			try {
				const response = await fetch(`${url}/user`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedUser),
				});

				if (!response.ok) {
					throw new Error('Failed to update user');
				}
				const resp = await response.json();
				sessionStorage.setItem('user', JSON.stringify(resp.updatedUser));
				return resp.updatedUser;
			} catch (error) {
				console.error(error);
			}
		},
		[url]
	);

	return updateUser;
}
