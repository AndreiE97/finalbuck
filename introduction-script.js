// Image cycling for Introduction page

const portraitImage = document.getElementById('portraitImage');
let currentImageIndex = 1;
const totalImages = 14;
const imageInterval = 5000; // 5 seconds in milliseconds
const fadeDuration = 1000; // 1 second fade duration

// Function to change image with fade effect
function changeImage() {
    // Fade out current image
    portraitImage.classList.add('fade-out');
    
    setTimeout(() => {
        // Change image source
        currentImageIndex = (currentImageIndex % totalImages) + 1;
        portraitImage.src = `Images/buck${currentImageIndex}.jpg`;
        
        // Fade in new image
        portraitImage.classList.remove('fade-out');
        portraitImage.classList.add('fade-in');
        
        // Remove fade-in class after animation completes
        setTimeout(() => {
            portraitImage.classList.remove('fade-in');
        }, fadeDuration);
    }, fadeDuration);
}

// Start cycling images
// Initial delay to show first image for 5 seconds
setTimeout(() => {
    // Set up interval to change images every 5 seconds
    setInterval(changeImage, imageInterval);
}, imageInterval);

