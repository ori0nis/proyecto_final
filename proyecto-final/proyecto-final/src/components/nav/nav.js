import "./nav.css";

import { button, selectButton } from "../buttons/button.js";
import { fetchBySport } from "../data/fetch.js";

export const nav = () => {
    const buttons = document.querySelector("#nav");

    buttons.innerHTML = 
    `
    <ul>
        <li class="swim-button">${button("swim-button", "./src/public/icons/swim-big.png", 'swim icon')}</li>
        <li class="bike-button">${button("bike-button", "./src/public/icons/bike.png", 'bike icon')}</li>
        <li class="run-button">${button("run-button", "./src/public/icons/run.png", 'run icon')}</li>
        <li class="strength-button">${button("strength-button", "./src/public/icons/strength.png", 'strength icon')}</li>
        <li class="month-button">${selectButton()}</li>
    </ul>`;

    buttons.addEventListener("click", (event) => {
        const clickedButton = event.target.closest("li");
        if (clickedButton) {
            if (clickedButton.classList.contains("swim-button")) {
                fetchBySport("SWIMMING");
            } else if (clickedButton.classList.contains("bike-button")) {
                fetchBySport("CYCLING");
            } else if (clickedButton.classList.contains("run-button")) {
                fetchBySport("RUNNING");
            } else if (clickedButton.classList.contains("strength-button")) {
                fetchBySport("TRAINING");
            } else if (clickedButton.classList.contains("month-button")) {
                //
            }
        }
    });
};

