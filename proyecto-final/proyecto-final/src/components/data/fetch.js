import { parseDate } from "./date-parsing";
import { button, selectButton } from "../buttons/button.js";

const APIURL = "http://localhost:3000/training-sessions";
const dataContainer = document.querySelector("#training-data");

// Regular fetch

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

// Fetch by sport

export const fetchBySport = (sportType) => {

    const currentDate = new Date();

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    try {
        fetch(APIURL)
        .then((res) => res.json())
        .then((trainingSessions) => {
            const sessionsBySport = trainingSessions.filter(session => {
                const sessionDate = parseDate(session.startTime);
                const trainingDate = new Date(sessionDate);
                return session.sportType === sportType && trainingDate >= sixMonthsAgo;
            });

            dataContainer.innerHTML = '';

            sessionsBySport.forEach((sessionBySport) => {
                if(sessionBySport.sportType === "SWIMMING" || sessionBySport.sportType === "CYCLING" || sessionBySport.sportType === "RUNNING") {
                    const laps = sessionBySport.laps
                    .map((lap, index) => `<li>Lap ${index + 1}: Time = ${lap.lapTime}, Distance = ${lap.lapDistance}</li>`)
                    .join('');

                    renderTrainingData(sessionBySport, parseDate(sessionBySport.startTime), laps);
                } else if(sessionBySport.sportType === "TRAINING") {
                    renderTrainingData(sessionBySport, parseDate(sessionBySport.startTime));
                }
            })
        })
    } catch (error) {
        console.log("Error fetching data: " + error);
    }
};

// Fetch everything by month

export const fetchByMonth = (selectedYear, selectedMonth) => {
    /* const currentDate = new Date();

    const oneMonthAgo = new Date();
    oneMonthAgo.setDay(currentDate.getDay() - 31); */

    fetch(APIURL)
        .then((res) => res.json())
        .then((trainingSessions) => {
            const sessionsByMonth = trainingSessions.filter((session) => {
                const sessionDate = parseDate(session.startTime);
                const partsOfDate = sessionDate.split("-");
                const yearOfSession = partsOfDate[0];
                const monthOfSession = partsOfDate[1];

                return yearOfSession === selectedYear && monthOfSession === selectedMonth;
            });

            if (sessionsByMonth) {
                sessionsByMonth.forEach((session) => {
                    const laps = session.laps
                        // Can't make certain lap lists show even with this:
                        /* .filter(lap => lap.lapTime !== "00:00:00" || lap.lapTime !== "00:00:01") */
                        .map(
                            (lap, index) =>
                                `<li>Lap ${index + 1}: Time = ${lap.lapTime}, Distance = ${lap.lapDistance}</li>`
                        )
                        .join("");

                    renderTrainingData(session, parseDate(session.startTime), laps);
                });
            }
        })
        .catch((error) => console.error("Error fetching data: ", error));
};

export const fetchFromCalendar = (selectedDate) => {
    if(!selectedDate) return;

    try {
    fetch(APIURL)
        .then((res) => res.json())
        .then((trainingSessions) => {
            const matchingSessions = trainingSessions.filter((session) =>
                parseDate(session.startTime).split("T")[0] === selectedDate
            );

            dataContainer.innerHTML = '';

            if (matchingSessions.length === 1) {
                const laps = matchingSessions[0].laps
                    // Can't make certain lap lists show even with this:
                    /* .filter(lap => lap.lapTime !== "00:00:00" || lap.lapTime !== "00:00:01") */
                    .map((lap, index) => `<li>Lap ${index + 1}: Time = ${lap.lapTime}, Distance = ${lap.lapDistance}</li>`)
                    .join('');
                
                    renderTrainingData(matchingSessions[0], parseDate(matchingSessions[0].startTime, laps));
            } else if (matchingSessions.length > 1) {
                matchingSessions.forEach((matchingSession) => {
                    const laps = matchingSession.laps
                        // Can't make certain lap lists show even with this:
                        /* .filter(lap => lap.lapTime !== "00:00:00" || lap.lapTime !== "00:00:01") */
                        .map((lap, index) => `<li>Lap ${index + 1}: Time = ${lap.lapTime}, Distance = ${lap.lapDistance}</li>`)
                        .join('');

                    renderTrainingData(matchingSession, parseDate(matchingSession.startTime), laps);
                });
            } else {
                dataContainer.innerHTML = `<p>No training sessions on this date.</p>`;
            }
        });
    } catch(error) {
        console.log("Error fetching data: " + error);
    }
};

//! Might have to refactor this to create session cards later

export const renderTrainingData = (session, formattedSessionDate, laps) => {
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
                        <p>Laps:</p>
                        <ul>
                            ${laps}
                        </ul>
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

    dataContainer.innerHTML += data;
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

