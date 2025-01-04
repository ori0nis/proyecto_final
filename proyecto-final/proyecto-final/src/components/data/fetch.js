const APIURL = "http://localhost:3000/training-sessions";

/* export const fetchByDate = () => {
    fetch(APIURL)
    .then((res) => res.json())
    .then((trainingSessions) => {
        const session = trainingSessions.find(
            trainingSession => trainingSession.startTime === 
        )
    })
} */   


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

