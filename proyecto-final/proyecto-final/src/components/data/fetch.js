import { parseDate } from "./date-parsing";
import { renderTrainingData } from "../render/render.js";

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

                    renderTrainingData(sessionBySport, "render-as-list", parseDate(sessionBySport.startTime), laps);
                } else if(sessionBySport.sportType === "TRAINING") {
                    renderTrainingData(sessionBySport, "render-as-list", parseDate(sessionBySport.startTime));
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

                    renderTrainingData(session, "render-as-list", parseDate(session.startTime), laps);
                });
            }
        })
        .catch((error) => console.error("Error fetching data: ", error));
};

// Fetch from the calendar

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

                const session = matchingSessions[0];

                if(session.sportType !== "TRAINING") {
                    const laps = matchingSessions[0].laps
                    // Can't make certain lap lists show even with this:
                    /* .filter(lap => lap.lapTime !== "00:00:00" || lap.lapTime !== "00:00:01") */
                    .map((lap, index) => `<li>Lap ${index + 1}: Time = ${lap.lapTime}, Distance = ${lap.lapDistance}</li>`)
                    .join('');

                    renderTrainingData(session, "render-as-cards", parseDate(matchingSessions[0].startTime, laps));
                } else {
                    renderTrainingData(session, "render-as-cards", parseDate(session.startTime));
                }
            } else if (matchingSessions.length > 1) {
                matchingSessions.forEach((matchingSession) => {
                    if(matchingSession.sportType !== "TRAINING") {
                        const laps = matchingSession.laps
                        // Can't make certain lap lists show even with this:
                        /* .filter(lap => lap.lapTime !== "00:00:00" || lap.lapTime !== "00:00:01") */
                        .map((lap, index) => `<li>Lap ${index + 1}: Time = ${lap.lapTime}, Distance = ${lap.lapDistance}</li>`)
                        .join('');

                        renderTrainingData(matchingSession, "render-as-cards", parseDate(matchingSession.startTime), laps);
                    } else {
                        renderTrainingData(matchingSession, "render-as-cards", parseDate(matchingSession.startTime));
                    } 
                });
            } else {
                dataContainer.innerHTML = `<p>No training sessions on this date.</p>`;
            }
        });
    } catch(error) {
        console.log("Error fetching data: " + error);
    }
};