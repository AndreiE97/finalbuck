// Gallery image pop-up functionality

const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeImageModal = document.getElementById('closeImageModal');
const galleryItems = document.querySelectorAll('.gallery-item');

// Open image modal with fade-in
function openImageModal(imageSrc) {
    modalImage.src = imageSrc;
    imageModal.style.display = 'block';
    setTimeout(() => {
        imageModal.classList.add('show');
    }, 10);
}

// Close image modal with fade-out
function closeImageModalFunc() {
    imageModal.classList.remove('show');
    setTimeout(() => {
        imageModal.style.display = 'none';
    }, 300);
}

// Add click handlers to gallery items
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imageSrc = item.getAttribute('data-image');
        openImageModal(imageSrc);
    });
});

// Close modal when clicking the X button
closeImageModal.addEventListener('click', closeImageModalFunc);

// Close modal when clicking outside the image
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeImageModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('show')) {
        closeImageModalFunc();
    }
});

