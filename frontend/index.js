let activeCalendar = null;
const calendarConfirmation = document.getElementById("calendarConfirmation") 

document.getElementById("createCalendar").addEventListener("click", () => {
    const calendarData = {
        name: document.getElementById("calendarName").value,
        startDate: document.getElementById("calendarStart").value,
        endDate: document.getElementById("calendarEnd").value,
    }
    fetch("http://localhost:3000/calendars", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(calendarData)
    })
        .then((res) => res.json())
        .then((data) => {
            activeCalendar = new Calendar(data);
            activeCalendar.draw(calendarConfirmation)
        })
})

document.getElementById("createPlan").addEventListener("click", () => {
    const planData = {
        name: document.getElementById("planName").value,
        duration: document.getElementById("planDuration").value,
        notes: document.getElementById("planNotes").value,
    }
    console.log(JSON.stringify(planData))
})


/**
 * Determine calendar size and assign it a name. The date difference would update the calendar size on the page. When we hit 'GO', this would save the calendar to the database.
 * This would be a POST request to the Calendar controller - create method. 
 * Will need to save Calendar ID in JS file, for use within L17.
 * 
 * 
 * 
 * On completing the fields for a Plan, we click 'Add'. On doing, it saves to the database (and produces a drop'n'drag tile)/
 * This would be a POST request to the Plan controller - create method. But, we would also need to add in the Calendar ID to ensure it ties in correctly. 
 * Will need to save Plan ID in JS file, for use // for when we give it a Start Time by 'dropping' it into the calendar.   
 */