import "./calendar.css";
import { parseDate } from "../data/date-parsing";
import { fetchFromCalendar } from "../data/fetch";

const header = document.querySelector("h3");
const dates = document.querySelector(".dates");
const buttons = document.querySelectorAll("#prev, #next");
const dataContainer = document.querySelector("#training-data");


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();


export const renderCalendar = () => {

    const start = (new Date(year, month, 1).getDay() + 6) % 7;
    const endDate = new Date(year, month + 1, 0).getDate();
    const endDatePrev = new Date(year, month, 0).getDate();
    const endDay = new Date(year, month, endDate).getDay();

    let datesHTML = '';

    for (let i = start; i > 0; i--) {
        datesHTML += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }

    for (let i = 1; i <= endDate; i++) {
        const dateString = new Date(year, month, i).toLocaleDateString("en-CA"); // es-ES locale doesn't seem to work
        let className =
            i === date.getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
                ? 'class="today"'
                : '';
        datesHTML += `<li ${className}><button class="daybutton" data-date="${dateString}">${i}</button></li>`;
    }

    const totalDays = start + endDate;
    const remainingDays = 7 - (totalDays % 7);
    if (remainingDays < 7) {
        for (let i = 1; i <= remainingDays; i++) {
            datesHTML += `<li class="inactive">${i}</li>`;
        }
    }

    dates.innerHTML = datesHTML;
    header.textContent = `${months[month]} ${year}`;
    attachDayListeners();
};

export const calendarMonthButtons = () => {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const btnId = e.target.id;

            if (btnId === "prev" && month === 0) {
                year--;
                month = 11;
            } else if (btnId === "next" && month === 11) {
                year++;
                month = 0;
            } else {
                month = btnId === "next" ? month + 1 : month - 1;
            }

            date = new Date(year, month, new Date().getDate());
            renderCalendar();
        });
    });
};

const attachDayListeners = () => {
    const dayButtons = document.querySelectorAll(".daybutton");
    dayButtons.forEach((dayButton) => {
        dayButton.addEventListener("click", (e) => {
            const selectedDate = e.target.getAttribute("data-date");
            fetchFromCalendar(selectedDate);
        });
    });
};


