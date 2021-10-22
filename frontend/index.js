let activeCalendar = null;
let plans = [];
const calendarDiv = document.getElementById("calendarContainer") 
const planContainer = document.getElementById("planContainer") 


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
            activeCalendar.draw(calendarDiv)
        })
})

document.getElementById("createPlan").addEventListener("click", () => {
    const planData = {
        name: document.getElementById("planName").value,
        planDate: document.getElementById("planDate").value,
        startTime: document.getElementById("planStartTime").value,
        duration: document.getElementById("planDuration").value,
        notes: document.getElementById("planNotes").value,
        calendarId: activeCalendar.id,
    }
    fetch("http://localhost:3000/plans", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(planData)
    })
    .then((res) => res.json())
    .then((data) => {
        const tempPlan = new Plan(data);
        plans.push(tempPlan);
        activeCalendar.addPlan(tempPlan);
        document.getElementById("planName").value = "";
        document.getElementById("planDate").value = "";
        document.getElementById("planStartTime").value = "";
        document.getElementById("planDuration").value = "";
        document.getElementById("planNotes").value = "";
    })

})
