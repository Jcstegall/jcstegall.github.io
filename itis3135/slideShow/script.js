
let slideIndex = 1;

// Define an array of image data
const imageData = [
    { src: "images/image1.jpeg", alt: "The Woods" },
    { src: "images/image2.jpeg", alt: "Cinque Terre" },
    { src: "images/image3.jpeg", alt: "Mountains and fjords" },
    { src: "images/image4.jpeg", alt: "Northern Lights" }
];

const container = document.querySelector('.container');
const thumbnailRow = document.getElementById('thumbnail-row');

const showSlides = (n) => {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");

    // Ensure n is within valid range
    if (n > slides.length) { 
        slideIndex = 1;
    }
    if (n < 1) { 
        slideIndex = slides.length;
    }

    // Hide all slides first
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove active class from all thumbnails
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and activate corresponding thumbnail
    let currentIndex = slideIndex - 1;
    if (slides[currentIndex]) {
        slides[currentIndex].style.display = "block";
        dots[currentIndex].className += " active";
        // Update caption with the alt text from the current image
        captionText.innerHTML = imageData[currentIndex].alt;
    }
};

const plusSlides = (n) => {
    slideIndex += n;
    showSlides(slideIndex);
};

const currentSlide = (n) => {
    slideIndex = n;
    showSlides(slideIndex);
};
// Create slides and thumbnails dynamically
imageData.forEach((data, index) => {
    // Create slides
    const slideDiv = document.createElement('div');
    slideDiv.className = "mySlides";
    
    const numberText = document.createElement('div');
    numberText.className = "numbertext";
    numberText.innerText = `${index + 1} / ${imageData.length}`;

    const imgElement = document.createElement('img');
    imgElement.src = data.src;
    imgElement.style.width = "100%";
    imgElement.alt = data.alt;  // Add alt text to main slide images

    slideDiv.appendChild(numberText);
    slideDiv.appendChild(imgElement);
    container.insertBefore(slideDiv, container.firstChild);

    // Create thumbnails
    const columnDiv = document.createElement('div');
    columnDiv.className = "column";

    const thumbImg = document.createElement('img');
    thumbImg.className = "demo cursor";
    thumbImg.src = data.src;
    thumbImg.style.width = "100%";
    thumbImg.onclick = () => currentSlide(index + 1);
    thumbImg.alt = data.alt;

    columnDiv.appendChild(thumbImg);
    thumbnailRow.appendChild(columnDiv);
});







// Initialize slideshow when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
});
// Update slide counter display
