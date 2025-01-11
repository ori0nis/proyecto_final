import { renderCalendar, calendarMonthButtons } from "./src/components/calendar/calendar";
import { button, selectButton } from "./src/components/buttons/button";
import { nav } from "./src/components/nav/nav";
import { fetchFromCalendar, fetchBySport } from "./src/components/data/fetch";

nav()

/* fetchData(); */
renderCalendar();

calendarMonthButtons();
fetchFromCalendar();
fetchBySport();

//! IDEA: 
//! If calendar is clicked, data-training acquires a class (calendar-data) which formats the data in cards. 
//! If buttons are clicked and data-training includes the calendar-data class, it is removed and another class (sport-data) is added to format data as a list.

//! ADD A RESET BUTTON TO CLEAR training-data

// Nav and buttons:

/* const buttons = document.querySelector("#nav");

buttons.innerHTML = 
`
<ul>
    <li onclick="">${button("swim-button", "./src/public/icons/swim-big.png", 'swim icon')}</li>
    <li>${button("bike-button", "./src/public/icons/bike.png", 'bike icon')}</li>
    <li>${button("run-button", "./src/public/icons/run.png", 'run icon')}</li>
    <li>${button("strength-button", "./src/public/icons/strength.png", 'strength icon')}</li>
    <li>${selectButton()}</li>
</ul>`; */


// Functionality of nav buttons:

