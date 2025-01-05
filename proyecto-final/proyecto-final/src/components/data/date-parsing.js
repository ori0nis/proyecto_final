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

//! REMEMBER TO INPUT THIS IN MAIN

import { parse } from "date-fns";

const dateString = "Thu Jan 13 12:25:28 CET 2022";
const parsedDate = parse(dateString, "EEE MMM dd HH:mm:ss 'CET' yyyy", new Date());
console.log(parsedDate.toISOString());