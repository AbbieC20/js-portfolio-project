let itineraries = {}; // object in which we store all itineraries, ready to show
let activeCalendar = null; // holds reference to current instance of Calendar
let plans = []; // currently stores all plans created through 'Add Your Plan'

// created variables based on specified elements of the html
const calendarDiv = document.getElementById("calendarContainer") // div
const planContainer = document.getElementById("planContainer") // div
const calendarInitialiser = document.getElementById("calendarInitialiser"); // div
const newPlan = document.getElementById("newPlan") // div
const createNewCalendar = document.getElementById("newCalendar") // div
const calendarSelector = document.getElementById("calendarSelector") // drop down

const updatePlanDates = () => {
    const planDateElement = document.getElementById("planDate"); 
    planDateElement.setAttribute("min", activeCalendar.startDate.toISOString().slice(0, 10)); // once we have Start & End date of a calendar, we update entry parameters for our plans
    planDateElement.setAttribute("max", activeCalendar.endDate.toISOString().slice(0, 10));
}


// method to retrieve all our calendars from the backend. We can see this through HTTP verb & URL
fetch("http://localhost:3000/calendars", {
    method: 'GET'
})
    .then((response) => response.json()) // gets response from backend and converts to JS Object format
    .then((data) => { // array of objects, which are the Calendars the backend has stored
        data.forEach((itinerary) => {
            itineraries[itinerary.id] = new Calendar(itinerary, false); // storing itineraries object. The key is the ID of each Itinerary, with the value being a Calendar instance with all itinerary data
            const opt = document.createElement('option'); // for each calendar, we are creating a drop-down option element
            opt.value = itinerary.id; // value that codes see, when user selects option
            opt.innerHTML = itinerary.name; // text that users see as option
            calendarSelector.appendChild(opt); // add the option onto the drop-down element
        })
    })


calendarSelector.addEventListener("change", () => {
    const value = calendarSelector.value; 
    if (value !== "-1") {
        activeCalendar = itineraries[value]; // accessing the itineraries object and passing in the key to tell it which specific calendar we are calling
        activeCalendar.draw(calendarDiv); // created on calendar.JS, but designed to draw the calendar within specified element on page
        activeCalendar.fetchPlans(); // created on calendar.JS, but designed to pull plans linked to calendar
        activeCalendar.drawCells(); // this ensures when we click on dropdown option, the cells show correctly
        updatePlanDates(); 
        document.getElementById("planContainer").innerHTML = ""; // clears plans shown
        newPlan.style.display = "block"; // shows html to create a plan
        calendarInitialiser.style.display = "none"; // within this flow, after calendar retrieved, hide 'Create Calendar' hidden
        createNewCalendar.style.display = "block"; // shows html to create a new Calendar
    }
})


document.getElementById("createCalendar").addEventListener("click", () => { // when user clicks 'Create Calendar' button
    const calendarData = { // take the user input from page and place it in key/value object
        name: document.getElementById("calendarName").value,
        startDate: document.getElementById("calendarStart").value,
        endDate: document.getElementById("calendarEnd").value,
    }

    if (calendarData.name === "" || calendarData.startDate === "" || calendarData.endDate === "") { // checks that calendar inputs are valid
        alert("Error - Please check your Calendar inputs!");
        return 
    }

    fetch("http://localhost:3000/calendars", { // fetch request to create a calendar in our backend
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(calendarData) // calendarData object, as a string
    })
        .then((response) => response.json())
        .then((data) => { // data returned back to us, now with ID (as assigned in database)
            itineraries[data.id] = new Calendar(data, true); // storing this calendar in the itineraries object. Storing in here allows us to access this from dropdown
            activeCalendar = itineraries[data.id]; // setting AC as new instance of calendar, with this data - referring to above line
            updatePlanDates(); 
            // on creating new calendar, we add option to dropdown
            const opt = document.createElement('option'); // for each calendar, we are creating a drop-down option element
            opt.value = activeCalendar.id; // value that codes see, when user selects option
            opt.innerHTML = activeCalendar.name; // text that users see as option
            calendarSelector.appendChild(opt); // add the option onto the drop-down element
            activeCalendar.draw(calendarDiv) // drawing it onto page
            newPlan.style.display = "block"; // shows html to create a plan
            createNewCalendar.style.display = "block"; // shows html to create a new Calendar
        })
        const targetDiv = document.getElementById("calendarInitialiser");
        targetDiv.style.display = "none"; // within this flow, after calendar retrieved, hide 'Create Calendar' hidden
        const div = document.getElementById("newCalendar");
        div.appendChild(targetDiv);
})


document.getElementById("createPlan").addEventListener("click", () => { // when user clicks 'Add Your Plan' button

    const planName = document.getElementById("planName");
    const planDate = document.getElementById("planDate");
    const planStartTime = document.getElementById("planStartTime");
    const planDuration = document.getElementById("planDuration");
    const planNotes = document.getElementById("planNotes");


    const planData = { // take the user input from page and place it in key/value object
        name: planName.value,
        planDate: planDate.value,
        startTime: planStartTime.value,
        duration: planDuration.value,
        notes: planNotes.value,
        calendarId: activeCalendar.id,
    }
    
    if (planData.name === "" || planData.planDate === "" || planData.startTime === "" || planData.duration === "") { // checks that plan inputs are valid
        alert("Error - Please check your Plan inputs!");
        return 
    }

    fetch("http://localhost:3000/plans", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(planData) // planData object, as a string
    })
    .then((response) => response.json())
    .then((data) => { // data returned back to us, now with ID (as assigned in database)
        const tempPlan = new Plan(data); // creating plan instance using our data
        plans.push(tempPlan); // adding this into plan array 
        activeCalendar.addPlan(tempPlan); // created on calendar.js, this funcitonality draws plan onto calendar on page
        // this clears the input fields on the page, for user to re-use
        planName.value = ""; 
        planDate.value = "";
        planStartTime.value = "";
        planDuration.value = "";
        planNotes.value = "";
    })
})

document.getElementById("createNewCalendar").addEventListener("click", () => { // when user clicks 'Create New Calendar' button
    activeCalendar = null; // active calendar is set back to nothing 
    calendarDiv.innerHTML = "";
    calendarInitialiser.style.display = "block"; // calendar div is shown 
    calendarSelector.value = "-1"; // resets dropdown to 'Select Here'

    planContainer.innerHTML = ""; // plans div is hidden
    newPlan.style.display = "none"; // plan form div is hidden
    createNewCalendar.style.display = "none"; // 'Create New Calendar' is hidden
})