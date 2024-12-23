const APIURL = "http://localhost:3000/training-sessions";

const totalCalories = document.querySelector(".total-calories");
const maxSpeed = document.querySelector(".max-speed");
const avgTimePerKm = document.querySelector(".avg-km");

export const fetchTrainingData = () => {
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
};