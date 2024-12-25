import { fetchTrainingData } from "./src/components/data/fetch";
import { calendar, renderCalendar, calendarListeners } from "./src/components/calendar/calendar";

const dataPoints = document.querySelector("#data-points");

fetchTrainingData();

dataPoints.insertAdjacentHTML("afterbegin", calendar());

const calendarElement = dataPoints.querySelector("#calendar");
renderCalendar(calendarElement);
calendarListeners(calendarElement);
