import spanishCalendar from './translate/spanish-calendar.json';

const isToday = (date) => {
	date = createDateFromString(date);
	const today = new Date();

	return date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear();
};

const createDateFromString = (dateString) => {
	let parts = dateString.split('-');
	return new Date(parts[0], parts[1] - 1, parts[2]);
};

const translateDate = (dateParts) => {
	return [
		spanishCalendar.days[dateParts[0]],
		dateParts[2],
		spanishCalendar.months[dateParts[1]],
		dateParts[3]
	];
};

const getHeaderDescriptionFrom = (date) => {
	let translate = translateDate(date.toString().split(' '));
	return `desde el ${translate[0]}, ${translate[1]} de ${translate[2]} del ${translate[3]}`;
};

const getHeaderDescriptionTo = (date) => {
	let translate = translateDate(date.toString().split(' '));
	return `hasta el ${translate[0]}, ${translate[1]} de ${translate[2]} del ${translate[3]}`;
};

export {
	isToday,
	createDateFromString,
	getHeaderDescriptionFrom,
	getHeaderDescriptionTo
};

