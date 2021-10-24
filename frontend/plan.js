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
        const planName = document.createElement("p");
        planName.textContent = `Plan: ${this.name}`;
        planName.classList.add("planHeaderStyle");
        const planDateTime = document.createElement("p");
        planDateTime.textContent = `This is happening on ${this.date.toLocaleDateString()} at ${this.startTime}`;
        const planDuration = document.createElement("p");
        planDuration.textContent = `Duration (in hours): ${this.duration}`;
        const planNotes = document.createElement("p");
        planNotes.textContent = `Notes: ${this.notes}`;

        planContainer.appendChild(planName);
        planContainer.appendChild(planDateTime);
        planContainer.appendChild(planDuration);
        planContainer.appendChild(planNotes);

        element.appendChild(planContainer);
    }
}
