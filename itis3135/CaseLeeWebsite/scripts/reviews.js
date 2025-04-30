// Sample customer reviews
const customerReviews = [
    {
        name: "John Smith",
        rating: 5,
        text: "Case Lee did an amazing job fixing the dent on my F-150! You can't even tell there was damage. Fast service and reasonable prices."
    },
    {
        name: "Sarah Johnson",
        rating: 5,
        text: "I was quoted over $1,000 by a body shop for a door dent. Case fixed it perfectly for a fraction of the cost. Highly recommend!"
    },
    {
        name: "Michael Rodriguez",
        rating: 4,
        text: "Professional service and great communication throughout the process. My car looks brand new again. Would use their service again."
    },
    {
        name: "Emily Chen",
        rating: 5,
        text: "I had a large dent in my Honda's quarter panel after a parking lot incident. Case Lee worked magic and completely removed it. Couldn't be happier!"
    },
    {
        name: "David Wilson",
        rating: 5,
        text: "Exceptional PDR work! Fast turnaround and the results exceeded my expectations. My BMW looks perfect again."
    }
];

// Generate stars HTML based on rating
function getStarsHtml(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star-filled">★</span>';
        } else {
            stars += '<span class="star">☆</span>';
        }
    }
    return stars;
}

// Display all reviews
function displayAllReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    
    // Clear existing reviews
    container.innerHTML = '';
    
    // Add each review to the container
    customerReviews.forEach((review) => {
        const reviewBox = document.createElement('div');
        reviewBox.className = 'review-box';
        
        reviewBox.innerHTML = `
            <h3 class="reviewer-name">${review.name}</h3>
            <div class="star-rating">${getStarsHtml(review.rating)}</div>
            <p class="review-text">${review.text}</p>
        `;
        
        container.appendChild(reviewBox);
    });
}

// Add a new review
function addReview(review) {
    // Add new review to the beginning of the array
    customerReviews.unshift(review);
    
    // Debug: Log the updated array
    console.log("Updated Reviews Array:", customerReviews);
    
    // Refresh the display
    displayAllReviews();
}

// Toggle review form visibility
function toggleReviewForm() {
    const reviewForm = document.getElementById('reviewFormContainer');
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    
    if (reviewForm.style.display === 'none' || reviewForm.style.display === '') {
        reviewForm.style.display = 'block';
        writeReviewBtn.textContent = 'Cancel Review';
    } else {
        reviewForm.style.display = 'none';
        writeReviewBtn.textContent = 'Write a Review';
        document.getElementById('reviewForm').reset();
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    const reviewForm = document.getElementById('reviewForm');
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    
    // Initialize the reviews display
    if (reviewsContainer) {
        displayAllReviews();
    }
    
    // Set up the write review button
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', toggleReviewForm);
        
        // Initially hide the form
        const formContainer = document.getElementById('reviewFormContainer');
        if (formContainer) {
            formContainer.style.display = 'none';
        }
    }
    
    // Set up the review form submission handler
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('reviewerName').value;
            const rating = parseInt(document.getElementById('reviewerRating').value, 10);
            const text = document.getElementById('reviewerText').value;
        
            // Validate input
            if (!name || !text || isNaN(rating)) {
                alert('Please fill out all fields');
                return;
            }
        
            // Create new review object
            const newReview = {
                name: name,
                rating: rating,
                text: text
            };
        
            // Debug: Log the new review
            console.log("New Review Submitted:", newReview);
        
            // Add to list and refresh display
            addReview(newReview);
        
            // Reset form and hide it
            reviewForm.reset();
            toggleReviewForm();
        
            // Scroll to top to see the new review
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
    }
    
    // Set up star rating interactive selection
    const ratingSelect = document.getElementById('reviewerRating');
    const ratingDisplay = document.getElementById('ratingStarsDisplay');
    
    if (ratingSelect && ratingDisplay) {
        // Initial display
        ratingDisplay.innerHTML = getStarsHtml(ratingSelect.value);
        
        // Update stars when rating changes
        ratingSelect.addEventListener('change', function() {
            ratingDisplay.innerHTML = getStarsHtml(this.value);
        });
    }
});
