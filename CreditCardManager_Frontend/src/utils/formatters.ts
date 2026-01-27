const LOCATION: string = "pt-BR";
const CURRENCY_FORMAT: string = "BRL";

export function formatDateToString(dateValue: Date): string {
	const formattedDate = new Date(dateValue).toLocaleDateString(LOCATION, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	return formattedDate;
}

export function formatCurrencyValue(value: number): string {
	const formattedCurrency = new Intl.NumberFormat(LOCATION, {
		style: "currency",
		currency: CURRENCY_FORMAT,
	}).format(value);

	return formattedCurrency;
}