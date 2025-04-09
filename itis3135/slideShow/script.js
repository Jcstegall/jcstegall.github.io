let slideIndex = 0;
let playing = false;
let timer;

// Define an array of image URLs
const imagePaths = [
    "images/image1.jpeg",
    "images/image2.jpeg",
    "images/image3.jpeg",
    "images/image4.jpeg"
];

const slidesContainer = document.querySelector('.slides');
const thumbnailsContainer = document.getElementById('thumbnails');

// Create slides and thumbnails dynamically based on image paths
imagePaths.forEach((path, index) => {
    // Create slides
    let slideDiv = document.createElement('div');
    slideDiv.classList.add('slide');
    
    let imgElement = document.createElement('img');
    imgElement.src = path;
    imgElement.alt = `Image ${index + 1}`;
    
    slideDiv.appendChild(imgElement);
    slidesContainer.appendChild(slideDiv);

    // Create thumbnails
    let thumbDiv = document.createElement('div');
    thumbDiv.classList.add('column');
    
    let thumbImg = document.createElement('img');
    thumbImg.className = "demo cursor";
    thumbImg.src = path;
    thumbImg.style.width = "100%";
    thumbImg.onclick = () => currentSlide(index + 1);
    
    thumbDiv.appendChild(thumbImg);
    thumbnailsContainer.appendChild(thumbDiv);
});

let slides = document.getElementsByClassName("slide");

// Update slide counter
function updateCounter() {
    const counter = document.getElementById('slide-counter');
    counter.innerText = `${slideIndex + 1} / ${slides.length}`;
}

// Show slides and update counter
const showSlides = (n) => {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].style.display = "block";
    updateCounter();
};

// Navigate to a specific slide
const currentSlide = (n) => {
    clearTimeout(timer);
    showSlides(n - 1);
    if (playing) {
        playSlides();
    }
};

const plusSlides = (n) => {
    clearTimeout(timer);
    showSlides(slideIndex + n);
    if (playing) {
        playSlides();
    }
};

const playSlides = () => {
    playing = true;
    document.querySelector('.play-pause').innerText = "Pause";
    timer = setTimeout(() => {
        plusSlides(1);
    }, 5000);
};

const pauseSlides = () => {
    clearTimeout(timer);
    playing = false;
    document.querySelector('.play-pause').innerText = "Play";
};

const toggleSlideshow = () => {
    if (playing) {
        pauseSlides();
    } else {
        playSlides();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
});
