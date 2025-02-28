document.addEventListener("DOMContentLoaded", function () {
    
    console.log("Hello, World!");

    const name = "J. Aragonez";
    let hasDownloadedResume = false;

    let currentDate = new Date();

    const currentHour = currentDate.getHours();

    let archProject = new Date("05/08/2025");
    let AIProject = new Date("06/28/2025");
    let lampProject = new Date("01/20/2023");

    let archProjectDateDifference = archProject.getTime() - currentDate.getTime();
    let AIProjectDateDifference = AIProject.getTime() - currentDate.getTime();
    let lampProjectDateDifference = currentDate.getTime() - lampProject.getTime();

    let archProjectDayDifference = Math.round(archProjectDateDifference / (86400000));
    let AIProjectDayDifference = Math.round(AIProjectDateDifference / (86400000));
    let lampProjectYearDifference = Math.round(lampProjectDateDifference / (31556952000));

    function showArchProjectDeadline(archProjectDayDifference) {
        if (archProjectDayDifference == 1) {
            return `Deadline: May 8th, 2025 (in ${archProjectDayDifference} day)`;
        } else {
            return `Deadline: May 8th, 2025 (in ${archProjectDayDifference} days)`;
        }
    }

    function showAIProjectDeadline(AIProjectDayDifference) {
        if (AIProjectDayDifference == 1) {
            return `Deadline: June 28th, 2025 (in ${AIProjectDayDifference} day)`;
        } else {
            return `Deadline: June 28th, 2025 (in ${AIProjectDayDifference} days)`;
        }

        
    }

    function showLampProjectDeadline(lampProjectYearDifference) {
        return `Completed January 20th, 2023 (${lampProjectYearDifference} years ago)`;
    }

    const archProjectDeadline = document.getElementById("arch");
    const AIProjectDeadline = document.getElementById("ai");
    const lampProjectDeadline = document.getElementById("lamp");

    if (archProjectDeadline) {
        archProjectDeadline.textContent = showArchProjectDeadline(archProjectDayDifference);
    }

    if (AIProjectDeadline) {
        AIProjectDeadline.textContent = showAIProjectDeadline(AIProjectDayDifference);
    }

    if (lampProjectDeadline) {
        lampProjectDeadline.textContent = showLampProjectDeadline(lampProjectYearDifference);
    }

    function showGreeting(name, currentHour) {
        // Morning: midnight to 12pm
        // Afternoon: 12pm to 6pm
        // Evening: 6pm to midnight
        if (currentHour >= 0 && currentHour < 12) {
            return `Good morning, my name is ${name}! Welcome to my portfolio!`;
        } else if (currentHour >= 12 && currentHour < 18) {
            return `Good afternoon, my name is ${name}! Welcome to my portfolio!`;
        } else {
            return `Good evening, my name is ${name}! Welcome to my portfolio!`;
        }
    }

    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        greetingElement.textContent = showGreeting(name, currentHour);
    }

    const downloadButton = document.getElementById("downloadResume");

    if (downloadButton && hasDownloadedResume == false) {
        downloadButton.addEventListener("click", function () {
            if (!hasDownloadedResume) {
                setTimeout(() => { alert("Your resume is downloaded successfully!")}, 2000)
                hasDownloadedResume = true;
            }
        });
    }

});