// array to set our times to show on calendar
const dayTimes = [
    "12am",
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
    "12pm",
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
]

// array to set our days to show on calendar
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
    // below is Object destructuring to get values from object parameter
    constructor({ id, name, start_date: startDate, end_date: endDate }, fetched) { // as set in our backend, this is passed in to create new Calendar instance
        this.id = id; 
        this.name = name;
        this.startDate = new Date(startDate); // specified this is a Date Object
        this.endDate = new Date (endDate); // specified this is a Date Object
        this.cellsPlans = {}; // not passed in - set an empty object for the specific calendar's plans to be added to. Key is Cell ID and value is plans associated
        this.fetched = fetched; // passed in, but not from backend - refers to whether we have had to retrieve these plans from the backend already for a user
    }


    draw(element) { // method to create the element visually 
        element.innerHTML = ""; // clear anything previously drawn 

        const calendar = document.createElement("table"); // create table element and hold reference to it as calendar
        calendar.setAttribute('id', 'calendar') // set its ID as calendar
        const calendarHeader = calendar.createTHead(); // create table header element and hold reference to it 
        const calendarBody = calendar.createTBody(); // create table body element and hold reference to it 
        this.populateHeader(calendarHeader); // call on populateHeader method as below 

        for (let i = 0; i < this.getCalendarLength(); i++) { // loop as many times as length of our calendar
            const tempDate = new Date(this.startDate) // create date, starting from Start date
            tempDate.setDate(tempDate.getDate() + i); // as we loop through, we are adding onto Start Date as many as we need and overwriting data through .set
            const dayNo = tempDate.getDay(); // tells us what day of week, assuming Sunday is 0
            this.createRow(calendarBody, i, weekdays[dayNo]); // create a row, calling on the below method
        }

        element.appendChild(calendar); // adds our calendar onto HTML
    }


    drawCells() {
        for (const [cellID, plans] of Object.entries(this.cellsPlans)) { // key = CellID, value = plans
            const cellElement = document.getElementById(cellID)
            if (plans.length === 1) { // logic to colour in cells, based on how many plans they contain
                cellElement.style.backgroundColor = "#c7826b"
            } else if (plans.length > 1) {
                cellElement.style.backgroundColor = "#802F1F"
            } else {
                cellElement.style.backgroundColor = "none"
            }
        }
    }


    populateHeader(header) {
        const row = header.insertRow(0); // insert row into header
        const cell1 = row.insertCell(0); // give the first cell of that row a reference
        cell1.innerHTML = "Day"; // state the text of that first cell


        dayTimes.forEach((text, index) => { // array as above
            const cell = row.insertCell(index + 1); // loops through cells created on header. We +1 onto header as our "Day" takes the 0 position
            cell.innerHTML = text; // using reference set above, we state text of cell which is the info in array
        })
    }


    createRow(body, rowIndex, dayName) {
        const row = body.insertRow(rowIndex); // start to build rows within table body, using index we have passed in
        row.setAttribute('id', `row-${rowIndex}`); // set id to reference later
        const cell1 = row.insertCell(0); // give the first cell of that row a reference
        cell1.innerHTML = dayName; // state the text of that first cell, which is the day name we have passed in 

        for (let i = 0; i < dayTimes.length; i++) {
            // looping through length of our day, we are creating blank cells and giving them each an ID 
            const cell = row.insertCell(i+1);
            const cellID = `row-${rowIndex}-cell-${i}`;
            cell.setAttribute('id', cellID);
            if (!(cellID in this.cellsPlans)) { // check if there a cell already created with this ID. If not...
                this.cellsPlans[cellID] = []; // ...setting this cell to 'no plans'
            }

            cell.addEventListener("click", () => { // listening for clicks within cell
                document.getElementById("planContainer").innerHTML = ""; // clears plans shown
                this.cellsPlans[cellID].forEach((plan) => { // for each of plans found in cell's array....
                    plan.draw(document.getElementById("planContainer")); // ...draw view
                })
            })
        }
    }


    getCalendarLength() { // returns integer to inform how many rows we need to display date range in calendar
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        return Math.floor((this.endDate - this.startDate) / MS_PER_DAY ) + 1;
    }


    addPlan(plan) { // takes in instance of plan object
        const MS_PER_DAY = 1000 * 60 * 60 * 24; 
        const startRow = Math.floor((plan.date - this.startDate) / MS_PER_DAY ); // identifying row of calendar to place plan

        const hourString = plan.startTime.split(":")[0]; // identifying hour that plan started
        const startHour = parseInt(hourString, 10); // converts string to integer

        for (let i = 0; i < plan.duration; i++) { // duration refers to number of hours i.e. 2
            const cellIndex = startHour + i;
            const row = startRow + Math.floor(cellIndex / dayTimes.length); // logic to wrap rows (that need to be included) onto next days if needed
            const cell = cellIndex % dayTimes.length; // logic to wrap cells (that need to be included) onto next days if needed
            const cellID = `row-${row}-cell-${cell}`; // holding a reference ID of cell
            this.cellsPlans[cellID].push(plan); // adding this plan into our array related to specific cell
        }
        this.drawCells();
    }


    fetchPlans() {
        if (this.fetched === false) { // if this is condition is satisifed, then run
            fetch(`http://localhost:3000/calendars/${this.id}/plans`, { // we retrieve all plans of a specified calendar from backend
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => { // array of objects
                    data.forEach((planData) => {
                        const fetchedPlan = new Plan(planData); // loop through array and create new plan instance for each retrieved plan
                        this.addPlan(fetchedPlan); // method to highlight plan on calendar
                    })
                    this.fetched = true; // updates booelan
                })
        }
    }

}
