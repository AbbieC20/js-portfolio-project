class Calendar {
    constructor({ id, name, start_date: startDate, end_date: endDate }) {
        this.id = id; 
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    draw (element) {
        const calendarContainer = document.createElement("div");
        const calendarName = document.createTextNode(this.name);
        const calendarDates = document.createTextNode(`${this.startDate} to ${this.endDate}`);
        calendarContainer.appendChild(calendarName);
        calendarContainer.appendChild(calendarDates);
        element.appendChild(calendarContainer);
    }
}
