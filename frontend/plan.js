class Plan {
    constructor({ id, name, date, start_time: startTime, duration, notes }) {
        this.id = id; 
        this.name = name;
        this.date = new Date(date);
        this.startTime = startTime;
        this.duration = duration;
        this.notes = notes;
    }

    draw (element) {
        const planContainer = document.createElement("div");
        const planName = document.createTextNode(`${this.name}: `);
        const planDateTime = document.createTextNode(`This is happening on ${this.date.toLocaleDateString()} at ${this.startTime}`);
        const planDuration = document.createTextNode(`This will last for ${this.duration} hours. `);
        const planNotes = document.createTextNode(`Notes = ${this.notes}`);

        planContainer.appendChild(planName);
        planContainer.appendChild(planDateTime);
        planContainer.appendChild(planDuration);
        planContainer.appendChild(planNotes);

        element.appendChild(planContainer);
    }
}
