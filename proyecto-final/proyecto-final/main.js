import { renderCalendar, /*attachDayListeners,*/ calendarMonthButtons, /*displayTrainingData*/ } from "./src/components/calendar/calendar";
import { button, selectButton } from "./src/components/buttons/button";
import { parseDate } from "./src/components/data/date-parsing";
import { fetchData, fetchFromCalendar, renderTrainingData } from "./src/components/data/fetch";

fetchData();
renderCalendar();
/* attachDayListeners(); */
calendarMonthButtons();
fetchFromCalendar();


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

// Event listener for the calendar buttons to display the training data of the day:

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

async function fetchSessionData(date) {
    const response = await fetch(APIURL);
    const data = await response.json();
  
    // Find the session matching the given date
    const session = data.find(item => {
    const sessionDate = new Date(item.startTime);
    const formattedSessionDate = sessionDate.toISOString().split('T')[0];
    return formattedSessionDate === date;
    });
  
    if (session) {
      console.log('Session data:', session); // Display session data
    } else {
      console.log('No session data found for this date.');
    }
  }
  
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
