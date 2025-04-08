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
            stars += '<span class="star filled">★</span>';
        } else {
            stars += '<span class="star">☆</span>';
        }
    }
    return stars;
}

// Load reviews when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    
    if (reviewsContainer) {
        // Clear any existing content
        reviewsContainer.innerHTML = '';
        
        // Add each review to the container
        customerReviews.forEach((review) => {
            const reviewBox = document.createElement('div');
            reviewBox.className = 'review-box';
            
            reviewBox.innerHTML = `
                <h3 class="reviewer-name">${review.name}</h3>
                <div class="star-rating">${getStarsHtml(review.rating)}</div>
                <p class="review-text">${review.text}</p>
            `;
            
            reviewsContainer.appendChild(reviewBox);
        });
    }
});
