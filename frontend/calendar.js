const dayTimes = [
    "Day",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "Midday",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
    "Midnight",
]

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

class Calendar {
    constructor({ id, name, start_date: startDate, end_date: endDate }) {
        this.id = id; 
        this.name = name;
        this.startDate = new Date(startDate);
        this.endDate = new Date (endDate);
    }

    draw(element) {
        const calendar = document.createElement("table");
        calendar.setAttribute('id', 'calendar')
        const calendarHeader = calendar.createTHead();
        const calendarBody = calendar.createTBody();
        this.populateHeader(calendarHeader); 

        for (let i = 0; i < this.getCalendarLength(); i++) {
            const tempDate = new Date(this.startDate)
            tempDate.setDate(tempDate.getDate() + i); 
            const dayNo = tempDate.getDay(); 
            this.createRow(calendarBody, i, weekdays[dayNo]);
        }

        element.appendChild(calendar);
    }

    populateHeader(header) {
        const row = header.insertRow(0);

        dayTimes.forEach((text, index) => {
            const cell = row.insertCell(index);
            cell.innerHTML = text;
        })
    }

    createRow(body, rowIndex, dayName) {
        const row = body.insertRow(rowIndex);
        row.setAttribute('id', `row-${rowIndex}`);
        const cell1 = row.insertCell(0);
        cell1.innerHTML = dayName;

        for (let i = 1; i < dayTimes.length; i++) {
            const cell = row.insertCell(i);
            cell.setAttribute('id', `row-${rowIndex}-cell-${i}`);
        }
    }

    getCalendarLength() {
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        return Math.floor((this.endDate - this.startDate) / MS_PER_DAY ) + 1;
    }

    addPlan(plan) {
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        const calendarRow = Math.floor((plan.date - this.startDate) / MS_PER_DAY );

        const hourString = plan.startTime.split(":")[0];
        const hourNumber = parseInt(hourString, 10);

        for (let i = 0; i < plan.duration; i++) {
            const cellIndex = hourNumber + i;
            document.getElementById(`row-${calendarRow}-cell-${cellIndex}`).style.backgroundColor = "red"
            document.getElementById(`row-${calendarRow}-cell-${cellIndex}`).addEventListener("click", () => {
                console.log(plan.name);
                plan.draw(document.getElementById("planContainer"));
            })
        }
    }

}
