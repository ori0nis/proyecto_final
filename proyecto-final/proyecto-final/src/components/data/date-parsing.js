/* export const convertToISO = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
        console.error("Invalid date:", dateString);
        return null;
    }
    return date.toISOString();
};

const isoDate = convertToISO("Thu Jan 13 12:25:28 CET 2022");
console.log(isoDate);
console.log("Hello") */

import { parse } from "date-fns";

export const parseDate = (dateString) => {
    if (dateString) {
        const timeZone = dateString.includes('CET') ? 'CET' : 'CEST';
        const parsedDate = parse(dateString, `EEE MMM dd HH:mm:ss '${timeZone}' yyyy`, new Date());
        return parsedDate.toISOString();
    } else {
        return null;
    }
};