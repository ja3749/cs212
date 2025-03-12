document.addEventListener("DOMContentLoaded", function () {
    // Homework 7
    console.log("Hello, World!");
    const name = "J. Aragonez";
    let hasDownloadedResume = false;
    let currentDate = new Date();
    const currentHour = currentDate.getHours();
    let darkMode = false; // Hwk8 bonus

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

    

    // Homework 8: Step 1 - Adding skills from user input

    function addSkill() {
        let input = document.forms["skillsForm"]["skill"].value;
        const parent = document.getElementById("skillsList");

        if (input == "") {
            alert("Skill must be filled out!");
            return false;
        } else {
            const child = document.createElement("div");
            child.setAttribute("class", "col");

            const grandchild = document.createElement("div");

            if (darkMode) {
                grandchild.setAttribute("class", "card p-3 dark");
            } else {
                grandchild.setAttribute("class", "card p-3");
            }
            
            const grandchildNode = document.createTextNode(input);
            grandchild.appendChild(grandchildNode);
            
            child.appendChild(grandchild);

            parent.appendChild(child);
            input.value = '';
        }
    }

    document.getElementById("submitSkill").addEventListener('click', addSkill);

    // Homework 8: Step 2 - Listing projects using a loop + Step 3 - Showing the state of the project based on its deadline

    var projectName = ["Arch Linux Installation Script", "LAMP Server Lab Setup", "AI-based Programming Language Translator"];
    var projectDescription = ["Automates Arch Linux installation with a terminal UI. Hosted on GitHub.", "Configured and deployed LAMP servers across 24 machines.", "A Python program that converts code from one programming language to another using AI."];
    var projectDeadline = ["05/08/2025", "01/20/2023", "06/28/2025"]

    for (let i = 0; i < projectName.length; i++) {
        
        // Define the parent <div> and create the cell for the Bootstrap grid
        const parent = document.getElementById("projectsList");
        const newCell = document.createElement("div");
        newCell.setAttribute("class", "col");

        // Create the card itself
        const cellCard = document.createElement("div");
        if (darkMode) {
            cellCard.setAttribute("class", "card p-3 dark");
        } else {
            cellCard.setAttribute("class", "card p-3");
        }
        
        // Create the project name

        cardName = document.createElement("h4");
        const projectHeader = document.createTextNode(projectName[i]);
        cardName.appendChild(projectHeader);

        // Create the project description
 
        cardDescription = document.createElement("p");
        const projectDesc = document.createTextNode(projectDescription[i]);
        cardDescription.appendChild(projectDesc);

        // Create the project deadline

        cardDate = document.createElement('p');
        // Step 3 code:
        function deadlineDisplay(date) {
            let deadline = new Date(date);
            if (deadline > currentDate) {
                return "Ongoing";
            } else if (deadline <= currentDate) {
                return "Completed";
            }
        }

        const projectDate = document.createTextNode(`Deadline: ${projectDeadline[i]} (${deadlineDisplay(projectDeadline[i])})`);
        cardDate.appendChild(projectDate);

        // Append the project information to the card

        cellCard.appendChild(cardName);
        cellCard.appendChild(cardDescription);
        cellCard.appendChild(cardDate);

        // Append the card to the Bootstrap grid
        newCell.append(cellCard);
        parent.appendChild(newCell);
    }
    
    // Homework 8: Step 4 - Tracking resume downloads
    let timesDownloadedResume = 0;

    if (downloadButton) {
        downloadButton.addEventListener("click", function () {
            timesDownloadedResume++;
            downloadButton.innerHTML = `Download Resume (${timesDownloadedResume})`;
        });
    }

    // Homework 8: Step 5 - Experience & education dynamic tables

    var eduHeader = ["Institution", "Degree", "Duration"];
    var eduInst = ["Northern Arizona University", "Phoenix Coding Academy"];
    var eduDegree = ["Cybersecurity (Bachelor of Science)", "High school diploma"];
    var eduDates = ["Aug. 2024 - present", "Aug. 2020 - May 2024"];

    var jobHeader = ["Company", "Position", "Duration"];
    var jobComp = ["Kudelski Security", "Costco Wholesale"];
    var jobPos = ["Security Operations Officer", "Sales Assistant"];
    var jobDates = ["Jan. 2025 - present", "May 2024 - August 2024"];

    const eduTable = document.getElementById("eduTable");
    const eduHeading = document.createElement("thead");
    const eduHeadingRow = document.createElement("tr");
    const eduBody = document.createElement("tbody");

    const jobTable = document.getElementById("jobTable");
    const jobHeading = document.createElement("thead");
    const jobHeadingRow = document.createElement("tr");
    const jobBody = document.createElement("tbody");

    for (let i = 0; i < eduHeader.length; i++) {
        
        const headingCell = document.createElement("th");
        const cellText = document.createTextNode(eduHeader[i]);
        headingCell.appendChild(cellText);
        eduHeadingRow.appendChild(headingCell);
        eduHeading.appendChild(eduHeadingRow);
        eduTable.appendChild(eduHeading);
    }

    for (let i = 0; i < eduInst.length; i++) {
        const newRow = document.createElement("tr");

        const instCell = document.createElement("td");
        const instText = document.createTextNode(eduInst[i]);
        instCell.appendChild(instText);

        const degreeCell = document.createElement("td");
        const degreeText = document.createTextNode(eduDegree[i]);
        degreeCell.appendChild(degreeText);

        const datesCell = document.createElement("td");
        const datesText = document.createTextNode(eduDates[i]);
        datesCell.appendChild(datesText);

        newRow.appendChild(instCell);
        newRow.appendChild(degreeCell);
        newRow.appendChild(datesCell);
        
        eduBody.appendChild(newRow);
        eduTable.appendChild(eduBody);

    }

    for (let i = 0; i < jobHeader.length; i++) {
        
        const headingCell = document.createElement("th");
        const cellText = document.createTextNode(jobHeader[i]);
        headingCell.appendChild(cellText);
        jobHeadingRow.appendChild(headingCell);
        jobHeading.appendChild(jobHeadingRow);
        jobTable.appendChild(jobHeading);
    }

    for (let i = 0; i < jobComp.length; i++) {
        const newJobRow = document.createElement("tr");

        const compCell = document.createElement("td");
        const compText = document.createTextNode(jobComp[i]);
        compCell.appendChild(compText);

        const posCell = document.createElement("td");
        const posText = document.createTextNode(jobPos[i]);
        posCell.appendChild(posText);

        const jobDatesCell = document.createElement("td");
        const datesText = document.createTextNode(jobDates[i]);
        jobDatesCell.appendChild(datesText);

        newJobRow.appendChild(compCell);
        newJobRow.appendChild(posCell);
        newJobRow.appendChild(jobDatesCell);
        
        jobBody.appendChild(newJobRow);
        jobTable.appendChild(jobBody);

    }

    // Homework 8: Bonus
    const appearanceButton = document.getElementById("appearancemode");

    function enableDarkMode() {
        console.log("Dark mode on");

        document.querySelector("body").classList.toggle("dark");
        document.querySelector("header").classList.toggle("dark");
        document.querySelector("footer").classList.toggle("dark");
        document.querySelector('nav').classList.toggle("dark");
        document.querySelector('nav').classList.toggle("navbar-dark");

        let navLinks = document.getElementsByClassName("nav-link");
        for (let link of navLinks) {
            link.classList.toggle("dark");
        }

        let cards = document.getElementsByClassName("card");
        for (let card of cards) {
            card.classList.toggle("dark");
        }

        let inputBoxes = document.getElementsByTagName("input");
        for (let inputBox of inputBoxes) {
            inputBox.classList.toggle("dark");
        }

        document.getElementById("resetButton").setAttribute("class", "btn btn-dark");
        document.getElementById("cssNameButton").setAttribute("class", "btn btn-dark"); 
        document.getElementById("hexColorButton").setAttribute("class", "btn btn-dark");
        document.getElementById("submitSkill").setAttribute("class", "btn btn-dark");

        let tables = document.getElementsByTagName("table");
        for (let table of tables) {
            table.setAttribute("class", "table table-dark table-striped");
        }

        document.getElementById("appearancemode").setAttribute("class", "btn btn-dark");
        document.getElementById("appearancemode").innerHTML = "Turn off dark mode";
    }

    function disableDarkMode() {
        console.log("Dark mode off");
        
        document.querySelector("body").classList.toggle("dark");
        document.querySelector("header").classList.toggle("dark");
        document.querySelector("footer").classList.toggle("dark");
        document.querySelector('nav').classList.toggle("dark");
        document.querySelector('nav').classList.toggle("navbar-dark");
        
        let navLinks = document.getElementsByClassName("nav-link");
        for (let link of navLinks) {
            link.classList.toggle("dark");
        }

        let cards = document.getElementsByClassName("card");
        for (let card of cards) {
            card.classList.toggle("dark");
        }

        let inputBoxes = document.getElementsByTagName("input");
        for (let inputBox of inputBoxes) {
            inputBox.classList.toggle("dark");
        }

        document.getElementById("resetButton").setAttribute("class", "btn btn-light");
        document.getElementById("cssNameButton").setAttribute("class", "btn btn-light");
        document.getElementById("hexColorButton").setAttribute("class", "btn btn-light");
        document.getElementById("submitSkill").setAttribute("class", "btn btn-light");

        let tables = document.getElementsByTagName("table");
        let links = document.getElementsByTagName("a");
        for (let table of tables) {
            table.setAttribute("class", "table table-light table-striped");
        }

        document.getElementById("appearancemode").setAttribute("class", "btn btn-light");
        document.getElementById("appearancemode").innerHTML = "Turn on dark mode";
    }

    if (appearanceButton) {
        appearanceButton.addEventListener("click", function () {
            if (!darkMode) {
                enableDarkMode();
                darkMode = true;
            }  else if (darkMode) {
                disableDarkMode();
                darkMode = false;
            }

        })
    }

    const fontSizeInput = document.getElementById("fontSizeInput");
    fontSizeInput.addEventListener('input', function() {
        document.body.style.fontSize = fontSizeInput.value + 'px';
    });

    const sizeReset = document.getElementById("resetButton");
    if (sizeReset) {
        sizeReset.addEventListener('click', function () {
            document.body.style.fontSize = "16px";
            fontSizeInput.value = 16;
        })
    }

    const colorInput = document.getElementById("colorInput");
    colorInput.addEventListener('input', function () {
        document.body.style.background = colorInput.value;
    })


});