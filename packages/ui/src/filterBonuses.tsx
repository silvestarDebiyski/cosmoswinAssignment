import { Bonus } from './bonusCard';
import { IUser } from './userProvider';

const isRegisteredWithinDays = (
	registrationDateStr: string,
	days: number
): boolean => {
	const registrationDate = new Date(registrationDateStr);
	const today = new Date();
	const diffInMs = today.getTime() - registrationDate.getTime();
	const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
	return diffInDays <= days;
};
export const filterBonuses = (
	bonuses: Bonus[],
	user: IUser,
	requiresKYCForBonuses: boolean,
	brand: string
): Bonus[] => {
	const filteredBonuses: Bonus[] = [];
	// TO DO: move this to shared folder
	bonuses.forEach((e: Bonus) => {
		let isNotLimitedByCountry =
			e.availableCountries && e.availableCountries.length
				? e.availableCountries.some((e) => e === user.country)
				: true;
		let isNotLimitedKYCVerification =
			e.requiresKYC && requiresKYCForBonuses ? user.isKYCApproved : true;
		let isNotLimitedByMaxDeposits =
			e.depositCountMax || e.depositCountMax === 0
				? user.depositCount <= e.depositCountMax
				: true;
		let isNotLimitedByMinDeposits =
			e.depositCountMin || e.depositCountMin === 0
				? user.depositCount >= e.depositCountMin
				: true;
		let isNotLimitedByZeroBalance = e.balanceMustBeZero
			? user.currentBalance === 0
			: true;
		let isNotLimitedByRegistrationDate = e.registrationWithinLastDays
			? isRegisteredWithinDays(
					user.registrationDate,
					e.registrationWithinLastDays
				)
			: true;
		if (
			e.brand === brand &&
			isNotLimitedByCountry &&
			isNotLimitedKYCVerification &&
			isNotLimitedByMaxDeposits &&
			isNotLimitedByMinDeposits &&
			isNotLimitedByZeroBalance &&
			isNotLimitedByRegistrationDate
		) {
			filteredBonuses.push(e);
		}
	});
	return filteredBonuses;
};
