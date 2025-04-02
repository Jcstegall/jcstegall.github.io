
// Course management functions
function addCourse(courseID = "", courseNumber = "", courseReason = "") {
    const courseContainer = document.getElementById('coursesContainer');
    const courseEntry = document.createElement('div');
    courseEntry.classList.add('courseEntry');
    courseEntry.innerHTML = `<div class="courseRow">
        <input type="text" class="courseID" placeholder="Course ID" value="${courseID}" required>
        <input type="text" class="courseNumber" placeholder="Course Number" value="${courseNumber}" required>
        <button type="button" class="removeCourseButton" onclick="removeCourse(this)">Delete</button>
    </div>
    <input type="text" class="courseReason" placeholder="Course Reason" value="${courseReason}" required>`;
    courseContainer.appendChild(courseEntry);
}

function removeCourse(button) {
    const courseEntry = button.parentElement.parentElement;
    courseEntry.remove();
}

function initializeCourses() {
    const defaultCourses = [
        { courseID: "ITCS", courseNumber: "4114", courseReason: "Real World Algorithms: Technical elective for concentration and wanted to continue learning algorithms." },
        { courseID: "ITSC", courseNumber: "3155", courseReason: "Required for major, and am concentrating in software engineering so I want to learn more about it" },
        { courseID: "ITSC", courseNumber: "3135", courseReason: "This class teaches me essential skills for programming website by using html, css, and javascript" },
        { courseID: "ITSC", courseNumber: "3688", courseReason: "Required Course" },
        { courseID: "ITIS", courseNumber: "4180", courseReason: "Mobile Application Development: I have always been intersted in developing apps for phones so this course fits perfectly" }
    ];

    defaultCourses.forEach((course) => addCourse(course.courseID, course.courseNumber, course.courseReason));
}

function previewImage(event) {
    const imageDisplay = document.getElementById('imageDisplay');
    const files = event.target.files;
    if (files.length) {
        imageDisplay.src = URL.createObjectURL(files[0]);
    } else {
        imageDisplay.src = "images/PicOfMe.jpg";
    }
}

function resetForm() {
    location.reload();
}

// Form validation function
function validateForm() {
    const form = document.getElementById('introForm');
    const requiredFields = form.querySelectorAll('input[required]');
    for (let field of requiredFields) {
        if (!field.value) {
            alert('Please fill all required fields.');
            return false;
        }
    }

    const checkbox = document.getElementById('agreement');
    if (!checkbox.checked) {
        alert('Please agree to the terms.');
        return false;
    }

    const imageDisplay = document.getElementById('imageDisplay');
    if (imageDisplay.src.endsWith("images/PicOfMe.jpg")) {
        alert('Using default image as no image was uploaded.');
    }

    return true;
}

// Form submission handler
function processFormSubmission(event) {
    event.preventDefault();

    if (!validateForm()) {
        return false;
    }

    const formData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        imageCaption: document.getElementById('imageCaption').value,
        personalBackground: document.getElementById('personalBackground').value,
        professionalBackground: document.getElementById('professionalBackground').value,
        academicBackground: document.getElementById('academicBackground').value,
        webDevelopmentBackground: document.getElementById('webDevelopmentBackground').value,
        primaryComputerPlatform: document.getElementById('primaryComputerPlatform').value,
        funnyThing: document.getElementById('funnyThing').value,
        anythingElse: document.getElementById('anythingElse').value
    };

    const outputDiv = document.getElementById('output');
    const courseData = Array.from(document.querySelectorAll('.courseEntry')).map((course) => {
        const courseID = course.querySelector('.courseID').value;
        const courseNumber = course.querySelector('.courseNumber').value;
        const courseReason = course.querySelector('.courseReason').value;
        return `<li><b>${courseID} ${courseNumber}</b> - ${courseReason}</li>`;
    }).join('');

    outputDiv.innerHTML = `
        <h2>${formData.firstname} ${formData.lastname} || Jolly Sparrow</h2>
        <figure>
            <img class="profile" src="${document.getElementById('imageDisplay').src}" alt="${formData.imageCaption}">
            <figcaption><i>${formData.imageCaption}</i></figcaption>
        </figure>
        <ul>
            <li><b>Personal Background: </b>${formData.personalBackground}</li>
            <li><b>Professional Background: </b>${formData.professionalBackground}</li>
            <li><b>Academic Background: </b>${formData.academicBackground}</li>
            <li><b>Background in the subject: </b>${formData.webDevelopmentBackground}</li>
            <li><b>Primary Computer Background: </b>${formData.primaryComputerPlatform}</li>
            <li><b>Courses I'm taking and why: </b></li>
        </ul>
        <ul class="class_list">${courseData}</ul>
        <ul>
            <li><b>Funny/Interesting Item to Remember me by: </b>${formData.funnyThing}</li>
            <li><b>I'd also like to Share: </b>${formData.anythingElse}</li>
        </ul>
        <div class="form-buttons" style="margin-top: 20px;">
            <input type="button" value="Reset Form" onclick="resetForm()" style="padding: 10px 20px; background-color: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
        </div>
    `;
    
    document.getElementById('introForm').style.display = 'none';
    outputDiv.style.display = 'block';
    return true;
}


document.addEventListener('DOMContentLoaded', initializeCourses);
