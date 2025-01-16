import { renderCalendar, calendarMonthButtons } from "./src/components/calendar/calendar";
import { nav } from "./src/components/nav/nav";
import { resetButton } from "./src/components/data/resetbutton";

nav();
const trainingData = document.querySelector("#training-data");
const cleanPage = document.querySelector("#reset-button")
cleanPage.addEventListener("click", () => resetButton(trainingData));

renderCalendar();
calendarMonthButtons();

