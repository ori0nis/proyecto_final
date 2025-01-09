import { parseDate } from "./date-parsing";

const APIURL = "http://localhost:3000/training-sessions";
const dataContainer = document.querySelector("#training-data");

export const fetchByDate = () => {
    try {
        fetch(APIURL)
        .then((res) => res.json())
        .then((trainingSessions) => {
            trainingSessions.forEach((session) => {
                const formattedSessionDate = parseDate(session.startTime);
                
                if (session.sportType === "SWIMMING") {
                    dataContainer.innerHTML = `
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
                            <p>Laps: ${session.laps}</p> // Improve this
                        </div>
                    </div>
                `
                } else if (session.sportType === "CYCLING") {
                    dataContainer.innerHTML = `
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
                            <p>Laps: ${session.laps}</p> // Improve this
                        </div>
                    </div>
                `
                } else if (session.sportType === "RUNNING") {
                    dataContainer.innerHTML = `
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
                            <p>Laps: ${session.laps}</p> // Improve this
                        </div>
                    </div>
                `
                } else if (session.sportType === "TRAINING") {
                    dataContainer.innerHTML = `
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
                    </div>
                `
                }
                
            });
            /* trainingSessions.forEach((session, index) => {
                console.log(`Session ${index + 1}:`);
                console.log(`Sport Type: ${session.sportType}`);
                console.log(`Total Time: ${session.totalTime}`);
                console.log(`Total Distance: ${(session.totalDistance / 1000).toFixed(2)} km`);
                console.log(`Start Time: ${session.startTime}`);
                console.log(`Total Calories: ${session.totalCalories}`);
                console.log(`Average Speed: ${session.avgSpeed} km/h`);
                console.log('-------------');
            }); */


       /*  for (trainingSession of trainingSessions) {
            const ISOdate = parseDate(trainingSession)
        }

        const ISOdate = parseDate()
        const session = trainingSessions.find(
            (trainingSession) => ) */
        })
    } catch (error) {
        console.log("Error fetching session" + error);
    }
} 


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

