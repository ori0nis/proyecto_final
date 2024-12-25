import "./calendar.css";

export const calendar = () => 
    `
    <div id="calendar">
        <header>
            <h3></h3>
            <nav>
                <button id="prev"></button>
                <button id="next"></button>
            </nav>
        </header>
        <section>
            <ul class="days">
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
                <li>Sun</li>
            </ul>
            <ul class="dates"></ul>
        </section>
    </div>
`;

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

export const renderCalendar = (calendarElement) => {
    const header = calendarElement.querySelector("h3");
    const dates = calendarElement.querySelector(".dates");

    const start = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month + 1, 0).getDate();
    const endDatePrev = new Date(year, month, 0).getDate();
    const endDay = new Date(year, month, endDate).getDay();

    let datesHTML = '';

    for (let i = start; i > 0; i--) {
        datesHTML += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }

    for (let i = 1; i <= endDate; i++) {
        let className =
            i === date.getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
                ? 'class="today"'
                : '';
        datesHTML += `<li ${className}>${i}</li>`;
    }

    for (let i = endDay + 1; i <= 6; i++) {
        datesHTML += `<li class="inactive">${i - endDay}</li>`;
    }

    dates.innerHTML = datesHTML;
    header.textContent = `${months[month]} ${year}`;
};

export const calendarListeners = (calendarElement) => {
    const buttons = calendarElement.querySelectorAll("#prev, #next");

    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const btnId = e.target.id;

            if (btnId === "prev" && month === 0) {
                year--;
                month = 11;
            } else if (btnId === "next" && month === 11) {
                year++;
                month = 0;
            } else {
                month = btnId === "next" ? month + 1 : month - 1;
            }

            date = new Date(year, month, new Date().getDate());
            renderCalendar(calendarElement);
        });
    });
};
