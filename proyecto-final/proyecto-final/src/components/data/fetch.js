import { parseDate } from "./date-parsing";

const APIURL = "http://localhost:3000/training-sessions";

export const fetchByDate = () => {
    try {
        fetch(APIURL)
        .then((res) => res.json())
        .then((trainingSessions) => {
            trainingSessions.forEach((session) => {
                const formattedSessionDate = parseDate(session.startTime);
                console.log(formattedSessionDate);
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

