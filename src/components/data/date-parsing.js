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