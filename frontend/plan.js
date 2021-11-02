class Plan {
     // below is Object destructuring to get values from object parameter
    constructor({ id, name, date, start_time: startTime, duration, notes }) { // as set in our backend, this is passed in to create new Plan instance
        this.id = id; 
        this.name = name;
        this.date = new Date(date); // specified this is a Date Object
        this.startTime = startTime; 
        this.duration = duration;
        this.notes = notes;
    }

    draw (element) { // method to create the element visually 
        const planContainer = document.createElement("div"); // creating div to place this information in
        // writing plan information into elements
        const planName = document.createElement("p"); 
        planName.textContent = `Plan: ${this.name}`; 
        planName.classList.add("planHeaderStyle");
        const planDateTime = document.createElement("p");
        planDateTime.textContent = `This is happening on ${this.date.toLocaleDateString()} at ${this.startTime}`;
        const planDuration = document.createElement("p");
        planDuration.textContent = `Duration (in hours): ${this.duration}`;
        const planNotes = document.createElement("p");
        planNotes.textContent = `Notes: ${this.notes}`;

        // adding all the above elements into the l13 div
        planContainer.appendChild(planName);
        planContainer.appendChild(planDateTime);
        planContainer.appendChild(planDuration);
        planContainer.appendChild(planNotes);

        element.appendChild(planContainer); // adds all this into planContainer in the DOM
    }
}
