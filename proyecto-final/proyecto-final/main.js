import { fetchTrainingData } from "./src/components/data/fetch";
import { calendar } from "./src/components/calendar/calendar";

const dataPoints = document.querySelector("#data-points");

fetchTrainingData();

dataPoints.insertAdjacentHTML("afterbegin", calendar());
