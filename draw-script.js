// Drawing functionality for "Draw for Buck" feature

const drawModal = document.getElementById('drawModal');
const drawTab = document.getElementById('drawTab');
const closeModal = document.getElementById('closeModal');
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const brushSizeDisplay = document.getElementById('brushSizeDisplay');
const eraserBtn = document.getElementById('eraserBtn');
const giveToBuckBtn = document.getElementById('giveToBuckBtn');
const drawAgainBtn = document.getElementById('drawAgainBtn');
const drawingSection = document.getElementById('drawingSection');
const resultSection = document.getElementById('resultSection');
const buckAction = document.getElementById('buckAction');
const buckMessageText = document.getElementById('buckMessageText');

let isDrawing = false;
let currentColor = '#000000';
let currentBrushSize = 5;
let isEraser = false;

// Buck's random messages
const buckMessages = [
    "sniffs your drawing",
    "thumps his foot",
    "gently nibbles your drawing",
    "lays on top of your drawing",
    "licks your drawing",
    "tilts his head at your drawing",
    "eats his lettuce while sitting on your drawing",
    "thinks your drawing is a hat and lays under it",
    "takes your drawing to use as bedding",
    "ignores the drawing and sniffs your hand",
    "is too busy eating cheerios to notice your drawing",
    "thinks your drawing is a threat and rips it",
    "does the loaf sit",
    "stares at you",
    "hops around your drawing"
];

// Open modal when Draw for Buck is clicked
drawTab.addEventListener('click', () => {
    drawModal.style.display = 'block';
    setTimeout(() => {
        drawModal.classList.add('show');
    }, 10);
    resetCanvas();
});

// Close modal with fade out
function closeModalWithFade() {
    drawModal.classList.remove('show');
    setTimeout(() => {
        drawModal.style.display = 'none';
        resetCanvas();
        drawingSection.style.display = 'block';
        resultSection.style.display = 'none';
    }, 300);
}

// Close modal
closeModal.addEventListener('click', closeModalWithFade);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === drawModal) {
        closeModalWithFade();
    }
});

// Color picker
colorPicker.addEventListener('change', (e) => {
    currentColor = e.target.value;
    isEraser = false;
    eraserBtn.classList.remove('active');
});

// Color swatches
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        const color = swatch.getAttribute('data-color');
        currentColor = color;
        colorPicker.value = color;
        isEraser = false;
        eraserBtn.classList.remove('active');
    });
});

// Brush size
brushSize.addEventListener('input', (e) => {
    currentBrushSize = parseInt(e.target.value);
    brushSizeDisplay.textContent = currentBrushSize;
});

// Eraser
eraserBtn.addEventListener('click', () => {
    isEraser = !isEraser;
    if (isEraser) {
        eraserBtn.classList.add('active');
    } else {
        eraserBtn.classList.remove('active');
    }
});

// Canvas drawing
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
    } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = currentColor;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
});

// Reset canvas
function resetCanvas() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    isEraser = false;
    eraserBtn.classList.remove('active');
    currentColor = '#000000';
    colorPicker.value = '#000000';
    currentBrushSize = 5;
    brushSize.value = 5;
    brushSizeDisplay.textContent = '5';
}

// Initialize canvas with white background when page loads
window.addEventListener('load', () => {
    resetCanvas();
});

// Give to Buck button
giveToBuckBtn.addEventListener('click', () => {
    // Save the drawing as an image
    const drawingDataUrl = canvas.toDataURL('image/png');
    const submittedDrawing = document.getElementById('submittedDrawing');
    submittedDrawing.src = drawingDataUrl;
    
    // Get random message
    const randomMessage = buckMessages[Math.floor(Math.random() * buckMessages.length)];
    buckAction.textContent = randomMessage;
    
    // Fade out drawing section and fade in result section
    drawingSection.style.opacity = '0';
    setTimeout(() => {
        drawingSection.style.display = 'none';
        resultSection.style.display = 'block';
        resultSection.style.opacity = '0';
        setTimeout(() => {
            resultSection.style.opacity = '1';
        }, 10);
    }, 300);
});

// Draw again button
drawAgainBtn.addEventListener('click', () => {
    resultSection.style.opacity = '0';
    setTimeout(() => {
        resetCanvas();
        resultSection.style.display = 'none';
        drawingSection.style.display = 'block';
        drawingSection.style.opacity = '0';
        setTimeout(() => {
            drawingSection.style.opacity = '1';
        }, 10);
    }, 300);
});
