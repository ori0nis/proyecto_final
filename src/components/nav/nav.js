import "./nav.css";

import { button, selectButton } from "../buttons/button.js";
import { fetchBySport, fetchByMonth } from "../data/fetch.js";

export const nav = () => {
    const buttons = document.querySelector("#nav");

    buttons.innerHTML = 
    `
    <ul>
        <li class="swim-button">${button("swim-button", "/icons/swim-big.png", 'swim icon')}</li>
        <li class="bike-button">${button("bike-button", "/icons/bike.png", 'bike icon')}</li>
        <li class="run-button">${button("run-button", "/icons/run.png", 'run icon')}</li>
        <li class="strength-button">${button("strength-button", "/icons/strength.png", 'strength icon')}</li>
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
                const monthYearSelector = document.querySelector("#month-year-selector");
                const monthYearSelectorButton = document.querySelector(".month-year-selector-button");
                const yearSelector = document.querySelector("#year");
                const monthSelector = document.querySelector("#month");

                monthYearSelector.style.display = "block";

                monthYearSelectorButton.addEventListener("click", (e) => {
                    e.preventDefault();

                    const selectedYear = yearSelector.value;
                    const selectedMonthName = monthSelector.value;

                    const months = {
                        january: "01",
                        february: "02",
                        march: "03",
                        april: "04",
                        may: "05",
                        june: "06",
                        july: "07",
                        august: "08",
                        september: "09",
                        october: "10",
                        november: "11",
                        december: "12",
                    }

                    const selectedMonth = months[selectedMonthName.toLowerCase()];

                    fetchByMonth(selectedYear, selectedMonth);
                })
            }
        }
    });
};

