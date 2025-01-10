import { renderCalendar, /*attachDayListeners,*/ calendarMonthButtons, /*displayTrainingData*/ } from "./src/components/calendar/calendar";
import { button, selectButton } from "./src/components/buttons/button";
import { parseDate } from "./src/components/data/date-parsing";
import { fetchData, fetchFromCalendar, renderTrainingData } from "./src/components/data/fetch";

/* fetchData(); */
renderCalendar();
/* attachDayListeners(); */
calendarMonthButtons();
/* fetchFromCalendar(); */

//! IDEA: 
//! If calendar is clicked, data-training acquires a class (calendar-data) which formats the data in cards. 
//! If buttons are clicked and data-training includes the calendar-data class, it is removed and another class (sport-data) is added to format data as a list.

// Nav and buttons:

const buttons = document.querySelector("#nav");

buttons.innerHTML = 
`
<ul>
    <li>${button("swim-button", "./src/public/icons/swim-big.png", 'swim icon')}</li>
    <li>${button("bike-button", "./src/public/icons/bike.png", 'bike icon')}</li>
    <li>${button("run-button", "./src/public/icons/run.png", 'run icon')}</li>
    <li>${button("strength-button", "./src/public/icons/strength.png", 'strength icon')}</li>
    <li>${selectButton()}</li>
</ul>`;

//! FIX

/* const attachDayListeners = () => {
  const dayButtons = document.querySelectorAll(".daybutton");

  dayButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
          const selectedDate = e.target.getAttribute("data-date");

          fetchData();

          fetch(APIURL)
              .then((res) => res.json())
              .then((trainingSessions) => {
                  const matchingSessions = trainingSessions.filter(
                      (session) =>
                          parseDate(session.startTime).split("T")[0] === selectedDate
                  );
                  console.log(matchingSessions);

                  dataContainer.innerHTML = "";

                  if (matchingSessions.length > 0) {
                      matchingSessions.forEach((session) => {
                          const formattedSessionDate = parseDate(session.startTime);
                          renderTrainingData(session, formattedSessionDate);
                      });
                  } else {
                      dataContainer.innerHTML = `<p>No training sessions found for ${selectedDate}</p>`;
                  }
              })
              .catch((error) => {
                  console.log(`Error fetching sessions: ${error}`);
                  dataContainer.innerHTML = `<p>Error fetching data for ${selectedDate}</p>`;
              });
      });
  });
};
 */

// Functionality of the calendar button:

/* const calendarButton = document.querySelector("#nav > ul > li .calendar-button");
const calendarContainer = document.querySelector("#calendar-container"); 

calendarButton.addEventListener("click", () => {
    if (calendarContainer.innerHTML === "") {
        calendarContainer.innerHTML = calendar();
        const calendarElement = calendarContainer.querySelector("#calendar");
        if (calendarElement) {
            renderCalendar(calendarElement);
            calendarListeners(calendarElement);
            attachDayListeners(calendarElement); // Now attaching listeners
        }
    } else {
        calendarContainer.innerHTML = "";
    }
}); */
  
 /*  const calendarElement = calendarContainer.querySelector("#calendar");
  // Attach event listeners to each calendar button
  calendarElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('date-button')) {
      const selectedDate = event.target.getAttribute('data-date');
      fetchSessionData(selectedDate);
    }
  }); */
/* const dataPoints = document.querySelector("#data-points"); */

/* fetchTrainingData(); */

/* dataPoints.insertAdjacentHTML("afterbegin", calendar()); */

/* const calendarElement = document.querySelector("#calendar");*/
/* renderCalendar(calendarElement);
calendarListeners(calendarElement); */
