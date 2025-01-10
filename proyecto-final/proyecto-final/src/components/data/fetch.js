import { parseDate } from "./date-parsing";
import { renderCalendar, calendarMonthButtons } from "../calendar/calendar";
import { parse } from "date-fns";

const APIURL = "http://localhost:3000/training-sessions";
const dataContainer = document.querySelector("#training-data");

export const fetchData = () => {
    try {
        fetch(APIURL)
        .then((res) => res.json())
        .then((trainingSessions) => {
            trainingSessions.forEach((session) => {
                const formattedSessionDate = parseDate(session.startTime);
                renderTrainingData(session, formattedSessionDate);
            });
        })
    } catch(error) {
        console.log("Error fetching data " + error);
    }
};

export const fetchFromCalendar = (selectedDate) => {
    try {
    fetch(APIURL)
        .then((res) => res.json())
        .then((trainingSessions) => {
            const matchingSessions = trainingSessions.filter((session) =>
                parseDate(session.startTime).split("T")[0] === selectedDate
            );
            if (matchingSessions) {
                renderTrainingData(matchingSessions[0], parseDate(matchingSessions[0].startTime));
            } else {
                dataContainer.innerHTML = `<p>No training sessions on this date.</p>`;
            }
        })
    } catch(error) {
        console.log("Error fetching data: " + error);
    }
};

export const renderTrainingData = (session, formattedSessionDate) => {
    let data = '';

    switch (session.sportType) {
        case "SWIMMING":
            data = `
                <div id="session">
                    <div class="sport-type">
                        <p>Sport: ${session.sportType}</p>
                    </div>
                    <div class="start-time">
                        <p>Start time: ${formattedSessionDate.split("T")[0]}</p>
                    </div>
                    <div class="total-distance">
                        <p>Distance: ${session.totalDistance}</p>
                    </div>
                    <div class="total-time">
                        <p>Time: ${session.totalTime}</p>
                    </div>
                    <div class="avg-time-per-100m">
                        <p>Avg. time per 100m: ${session.avgTimePer100m}</p>
                    </div>
                    <div class="avg-heart-rate">
                        <p>Avg. heart rate: ${session.averageHeartRate}</p>
                    </div>
                    <div class="max-heart-rate">
                        <p>Max. heart rate: ${session.maxHeartRate}</p>
                    </div>
                    <div class="total-calories">
                        <p>Total Calories: ${session.totalCalories}</p>
                    </div>
                    <div class="lap-list">
                        <p>Laps: ${session.laps}</p> 
                    </div>
                </div>`;
            break;

        case "CYCLING":
            data = `
                <div id="session">
                    <div class="sport-type">
                        <p>Sport: ${session.sportType}</p>
                    </div>
                    <div class="start-time">
                        <p>Start time: ${formattedSessionDate.split("T")[0]}</p>
                    </div>
                    <div class="total-distance">
                        <p>Distance: ${session.totalDistance}</p>
                    </div>
                    <div class="total-time">
                        <p>Time: ${session.totalTime}</p>
                    </div>
                    <div class="max-speed">
                        <p>Max. speed: ${session.maxSpeed}</p>
                    </div>
                    <div class="avg-speed">
                        <p>Avg. speed: ${session.avgSpeed}</p>
                    </div>
                    <div class="avg-watts">
                        <p>Avg. watts: ${session.avgWatts}</p>
                    </div>
                    <div class="watts-20-min">
                        <p>Watts/20min: ${session.watts20min}</p>
                    </div>
                    <div class="avg-heart-rate">
                        <p>Avg. heart rate: ${session.averageHeartRate}</p>
                    </div>
                    <div class="max-heart-rate">
                        <p>Max. heart rate: ${session.maxHeartRate}</p>
                    </div>
                    <div class="total-calories">
                        <p>Total Calories: ${session.totalCalories}</p>
                    </div>
                    <div class="lap-list">
                        <p>Laps: ${session.laps}</p> 
                    </div>
                </div>`;
            break;

        case "RUNNING":
            data = `
                <div id="session">
                    <div class="sport-type">
                        <p>Sport: ${session.sportType}</p>
                    </div>
                    <div class="start-time">
                        <p>Start time: ${formattedSessionDate.split("T")[0]}</p>
                    </div>
                    <div class="total-distance">
                        <p>Distance: ${session.totalDistance}</p>
                    </div>
                    <div class="total-time">
                        <p>Time: ${session.totalTime}</p>
                    </div>
                    <div class="avg-time-per-km">
                        <p>Avg. time per km: ${session.avgTimePerKm}</p>
                    </div>
                    <div class="avg-watts">
                        <p>Avg. watts: ${session.avgWatts}</p>
                    </div>
                    <div class="avg-heart-rate">
                        <p>Avg. heart rate: ${session.averageHeartRate}</p>
                    </div>
                    <div class="max-heart-rate">
                        <p>Max. heart rate: ${session.maxHeartRate}</p>
                    </div>
                    <div class="total-calories">
                        <p>Total Calories: ${session.totalCalories}</p>
                    </div>
                    <div class="lap-list">
                        <p>Laps: ${session.laps}</p> 
                    </div>
                </div>`;
            break;

        case "TRAINING":
            data = `
                <div id="session">
                    <div class="sport-type">
                        <p>Sport: ${session.sportType}</p>
                    </div>
                    <div class="start-time">
                        <p>Start time: ${formattedSessionDate.split("T")[0]}</p>
                    </div>
                    <div class="total-time">
                        <p>Time: ${session.totalTime}</p>
                    </div>
                    <div class="avg-heart-rate">
                        <p>Avg. heart rate: ${session.averageHeartRate}</p>
                    </div>
                    <div class="max-heart-rate">
                        <p>Max. heart rate: ${session.maxHeartRate}</p>
                    </div>
                    <div class="total-calories">
                        <p>Total Calories: ${session.totalCalories}</p>
                    </div>
                </div>`;
            break;

        default:
            data = `<p>Unknown sport type: ${session.sportType}</p>`;
    }

    dataContainer.innerHTML = data;
};

/*
        const ISOdate = parseDate()
        const session = trainingSessions.find(
            (trainingSession) => ) */

/* export const fetchTrainingData = () => {
    fetch(APIURL)
        .then((res) => res.json())
        .then((trainingSessions) => {
            const session = trainingSessions.find(
                trainingSession => trainingSession.id === "1868"
            );

            totalCalories.innerHTML = 
            `
            <h3>Total Calories:</h3>
            <p>${session.totalCalories}</p>
            `;
        })
        .catch(err => console.error("Error fetching data:", err));
}; */

