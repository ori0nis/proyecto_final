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
        </section>
    </div>
`;

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const renderCalendar = () => {
    
}





// TODO: Code calendar tomorrow (24/12)