$(document).ready(function () {

    // Initialize variables
    let darkMode = false;
    const name = "J. Aragonez";
    let currentDate = new Date();
    const currentHour = currentDate.getHours();
    let hasDownloadedResume = false;
    let timesDownloadedResume = 0;

    // Render the page's greeting
    function showGreeting(name, currentHour) {
        if (currentHour >= 0 && currentHour < 12) {
            return `Good morning, my name is ${name}! Welcome to my portfolio!`;
        } else if (currentHour >= 12 && currentHour < 18) {
            return `Good afternoon, my name is ${name}! Welcome to my portfolio!`;
        } else {
            return `Good evening, my name is ${name}! Welcome to my portfolio!`;
        }
    }
    $("#greeting").html(showGreeting(name, currentHour));

    // Dynamic skills list with arrays & validation (Hwk9 Step 1)

    var skillsArray = [];

    function renderSkills() {
        $('#skillsList').empty();

        for (let i = 0; i < skillsArray.length; i++) {
            if (darkMode) {
                $('#skillsList').append(`<div class="col" id="skillCard" data-index="${i}"><div class="card p-3 dark">${skillsArray[i]}</div></div>`);
            } else {
                $('#skillsList').append(`<div class="col" id="skillCard" data-index="${i}"><div class="card p-3">${skillsArray[i]}</div></div>`);
            }
        }
    }

    function addSkill(skill) {
        skillsArray.push(skill);
        renderSkills();
    }

    function editSkill(index, newSkill) {
        skillsArray[index] = newSkill;
        renderSkills();
    }

    function delSkill(index) {
        skillsArray.splice(index, 1);
        renderSkills();
    }

    $('#skillsForm').on("submit", function (event) {
        event.preventDefault();

        const newSkill = $('#inputSkill').val().trim();

        if (skillsArray.includes(newSkill)) {
            alert("Skill already exists in the list.");
            $('#inputSkill').val('');
        } else {
            addSkill(newSkill);
        }
        $('#inputSkill').val('');
    });

    $('input').on("keydown", function (event) {
        if (event.key === 'Escape') {
            $('input').val('');
        }
    });

    let clickTimer;

    // Single click to edit skill
    $('#skillsList').on('click', '#skillCard', function () {

        clearTimeout(clickTimer);
        const index = $(this).attr('data-index');

        clickTimer = setTimeout( function() {
            const currentSkill = skillsArray[index];
            const newSkill = prompt(`Edit skill "${skillsArray[index]}:"`);
            editSkill(index, newSkill);
        }, 250);

    });

    // Double click to delete skill
    $('#skillsList').on('dblclick', '#skillCard', function () { 
        clearTimeout(clickTimer);  
        console.log("dblclick")
        $(this).fadeOut(function () {
            const index = $(this).attr('data-index');
            delSkill(index);
        });
    });

    // Render the navigation bar (Hwk9 Step 2)
    const navItems = [{text: "Summary", link: "#summary"}, {text: "Skills", link: "#skills"}, {text: "Projects", link: "#projects"}, {text: "Education & experience", link: "#education"}, {text: "Contact", link: "#contact"}, {text: "Site settings", link: "#settings"}, {text: "Download Resume", link: "./files/resume.pdf", isDownload: true}];

    for (let i = 0; i < navItems.length; i++) {
        let listItem = `<li class="nav-item"><a href="${navItems[i].link}" ${navItems[i].isDownload ? ' class="nav-link btn btn-success" id="downloadResume" download' : ' class="nav-link" ' } >${navItems[i].text}</a></li>`
        $('.navbarItems').append(listItem);
    }

    // Render the projects section and allow for sorting through jQuery (Hwk9 Step 3)

    const projects = [{title: 'Arch Linux installation script', description:"Automates Arch Linux installation with a terminal UI. Hosted on GitHub.", deadline: new Date("05/08/2025"), imageURL: "https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_auto/linuxiac.com/wp-content/uploads/2020/06/archlinux-1024x768.jpg"},{title: 'LAMP Server lab setup', description:"Configured and deployed LAMP servers across 24 machines.", deadline: new Date("01/20/2023"), imageURL: "https://miro.medium.com/v2/resize:fit:800/1*-YNY3KLuXt6HIR7h-eIcow.jpeg"},{title: 'AI-based programming language translator', description:"A Python program that converts code from one programming language to another using AI.", deadline: new Date("06/28/2025"), imageURL: "https://cdn.mos.cms.futurecdn.net/VFLt5vHV7aCoLrLGjP9Qwm.jpg"}];

    projects.sort((a,b) => a.title.localeCompare(b.title));

    function displayDeadline(projectDate) {
        let deadline = projectDate;
        if (deadline > currentDate) {
            return `Deadline: ${deadline.toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'})} (Ongoing)`
        } else {
            return `Deadline: ${deadline.toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'})} (Completed)`
        }
    }

    for (let i = 0; i < projects.length; i++) {
        if (darkMode){
            $('#projectsList').append(
                `<div class="col"><div class="card p-3 dark"><h4>${projects[i].title}</h4><p>${projects[i].description}</p><p>${displayDeadline(projects[i].deadline)}</p><br><img src="${projects[i].imageURL}"></div></div>`
            )
        } else {
            $('#projectsList').append(
                `<div class="col"><div class="card p-3"><h4>${projects[i].title}</h4><p>${projects[i].description}</p><p>${displayDeadline(projects[i].deadline)}</p><br><img src="${projects[i].imageURL}"></div></div>`
            )
        }
    }

    function renderProjects() {
        $('#projectsList').empty();

        for (let i = 0; i < projects.length; i++) {
            if (darkMode){
                $('#projectsList').append(
                    `<div class="col"><div class="card p-3 dark"><h4>${projects[i].title}</h4><p>${projects[i].description}</p><p>${displayDeadline(projects[i].deadline)}</p><br><img src="${projects[i].imageURL}"></div></div>`
                )
            } else {
                $('#projectsList').append(
                    `<div class="col"><div class="card p-3"><h4>${projects[i].title}</h4><p>${projects[i].description}</p><p>${displayDeadline(projects[i].deadline)}</p><br><img src="${projects[i].imageURL}"></div></div>`
                )
            }
        }
    }
    let deadlineSort = false;
    $('#deadlineSort').on('click', function () {
        if (!deadlineSort) {
            projects.sort((a,b) => a.deadline - b.deadline);
            deadlineSort = true;
            $('#deadlineSort').html("Sort by title");
        } else {
            projects.sort((a,b) => a.title.localeCompare(b.title));
            deadlineSort = false;
            $('#deadlineSort').html("Sort by deadline");
        }
       renderProjects();
    });

    // Update the resume's download button every time it gets clicked
    $("#downloadResume").on("click", function () {
        if (!hasDownloadedResume) {
            setTimeout(() => { alert("Your resume is downloaded successfully!")}, 2000);
            hasDownloadedResume = true;
        }
        timesDownloadedResume++;
        $("#downloadResume").html(`Download Resume (${timesDownloadedResume})`)
    });


    // Render the education and professional experience tables

    const eduTableHeaders = ["Institution", "Degree", "Duration"];
    const eduTableCells = [
        {institution: "Northern Arizona University", degree: "Cybersecurity (Bachelor of Science)", duration: "Aug 2024-present"},
        {institution: "Phoenix Coding Academy", degree: "High school diploma", duration: "Aug 2020-May 2024"}
    ];

    const jobTableHeaders = ["Company", "Position", "Duration"];
    const jobTableCells = [
        {company: "Kudelski Security", position: "Security operations officer", duration: "Jan 2025-present"},
        {company: "Costco Wholesale", position: "Sales assistant", duration: "May 2024-August 2024"}
    ];

    $('#eduTable').append('<thead><tr id="eduHeaders"></tr></thead>');
    $('#eduTable').append('<tbody id="eduBody"></tbody>');
    $('#jobTable').append('<thead><tr id="jobHeaders"></tr></thead>');
    $('#jobTable').append('<tbody id="jobBody"></tbody>');

    for (let i = 0; i < eduTableHeaders.length; i++) {
        $('#eduHeaders').append(`<th>${eduTableHeaders[i]}</th>`);
        $('#jobHeaders').append(`<th>${jobTableHeaders[i]}</th>`);
    }

    for (let i = 0; i < eduTableCells.length; i++) {
        $('#eduTable').append(`<tr><td>${eduTableCells[i].institution}</td><td>${eduTableCells[i].degree}</td><td>${eduTableCells[i].duration}</td></tr>`);
    }

    for (let i = 0; i < jobTableCells.length; i++) {
        $('#jobTable').append(`<tr><td>${jobTableCells[i].company}</td><td>${jobTableCells[i].position}</td><td>${jobTableCells[i].duration}</td></tr>`);
    }

    // Altering the appearance based on user input

    function enableDarkMode() {
        console.log("Dark mode on");

        $("body, header, footer, nav").toggleClass("dark");
        $("nav").toggleClass("navbar-dark");
        
        $(".nav-link").toggleClass("dark");
        $(".card").toggleClass("dark");
        $("input").toggleClass("dark");

        $("button").removeClass("btn-light");
        $("button").addClass("btn-dark");

        $("table").removeClass("table-light");
        $("table").addClass("table-dark");

        $("a.btn").removeClass("btn-light");
        $("a.btn").addClass("btn-dark");

        $("a.btn-link").toggleClass("dark");

        $("#appearancemode").html("Turn off dark mode");
    }

    function disableDarkMode() {
        console.log("Dark mode off");
        
        $("body, header, footer, nav").toggleClass("dark");
        $("nav").toggleClass("navbar-dark");

        $(".nav-link").toggleClass("dark");
        $(".card").toggleClass("dark");
        $("input").toggleClass("dark");

        $("button").addClass("btn-light");
        $("button").removeClass("btn-dark");

        $("table").addClass("table-light");
        $("table").removeClass("table-dark");

        $("a.btn").addClass("btn-light");
        $("a.btn").removeClass("btn-dark");

        $("a.btn-link").toggleClass("dark");

        $("#appearancemode").html("Turn on dark mode");
    }

    $("#appearancemode").on("click", function () {
        if (!darkMode) {
            enableDarkMode();
            darkMode = true;
        }  else if (darkMode) {
            disableDarkMode();
            darkMode = false;
        }
    });

    $("#fontSizeInput").on("input", function () {
        $("body").css("font-size", $("#fontSizeInput").val() + "px");
    });

    $("#resetButton").on("click", function () {
        $("body").css("font-size", "16px");
        $("#fontSizeInput").val(16);
    });

    $("#colorInput").on("input", function() {
        $("body").css("background", $("#colorInput").val());
    });
})