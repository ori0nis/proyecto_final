import "./render.css";

const dataContainer = document.querySelector("#training-data");

export const renderTrainingData = (session, className, formattedSessionDate, laps) => {
    let data = '';

    switch (session.sportType) {
        case "SWIMMING":
            data = `
                <div id="session" class="${className} swim">
                    <div class="sport-type">
                        <img src="./src/public/icons/swim-big.png">
                    </div>
                    <div class="start-time">
                        <p><span>Start time:</span> ${formattedSessionDate.split("T")[0]}</p>
                    </div>
                    <div class="total-distance">
                        <p><span>Distance:</span> ${session.totalDistance}</p>
                    </div>
                    <div class="total-time">
                        <p><span>Time:</span> ${session.totalTime}</p>
                    </div>
                    <div class="avg-time-per-100m">
                        <p><span>Avg. time per 100m:</span> ${session.avgTimePer100m}</p>
                    </div>
                    <div class="avg-heart-rate">
                        <p><span>Avg. heart rate:</span> ${session.averageHeartRate}</p>
                    </div>
                    <div class="max-heart-rate">
                        <p><span>Max. heart rate:</span> ${session.maxHeartRate}</p>
                    </div>
                    <div class="total-calories">
                        <p><span>Total Calories:</span> ${session.totalCalories}</p>
                    </div>
                </div>`;
            break;

        case "CYCLING":
            data = `
                <div id="session" class="${className} bike">
                    <div class="sport-type">
                        <img src="./src/public/icons/bike.png">
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
                <div id="session" class="${className} run">
                    <div class="sport-type">
                        <img src="./src/public/icons/run.png">
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
                <div id="session" class="${className} strength">
                    <div class="sport-type">
                        <img src="./src/public/icons/strength.png">
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