// Cheerio Easter Egg Mini-Game

// Track cheerio clicks across pages using localStorage
const CHEERIO_COUNT_KEY = 'cheerioClickCount';
const CURRENT_PAGE_KEY = 'currentPage';

// Store current page
const currentPage = window.location.pathname.split('/').pop() || window.location.href.split('/').pop();
localStorage.setItem(CURRENT_PAGE_KEY, currentPage);

// Initialize click count if not exists
if (!localStorage.getItem(CHEERIO_COUNT_KEY)) {
    localStorage.setItem(CHEERIO_COUNT_KEY, '0');
}

// Get all hidden cheerios on this page
const hiddenCheerios = document.querySelectorAll('.hidden-cheerio');

// Add click handlers to cheerios
hiddenCheerios.forEach(cheerio => {
    cheerio.addEventListener('click', () => {
        // Fade out cheerio
        cheerio.style.transition = 'opacity 0.5s ease';
        cheerio.style.opacity = '0';
        
        setTimeout(() => {
            cheerio.style.display = 'none';
        }, 500);
        
        // Increment count
        let count = parseInt(localStorage.getItem(CHEERIO_COUNT_KEY)) || 0;
        count++;
        localStorage.setItem(CHEERIO_COUNT_KEY, count.toString());
        
        // If 3 cheerios clicked, start mini-game
        if (count >= 3) {
            setTimeout(() => {
                startMiniGame();
            }, 600);
        }
    });
});

// Mini-Game Functions
let gameActive = false;
let cheeriosCollected = 0;
let gameTimer = null;
let cheerioSpawnInterval = null;
let activeCheerios = [];

function startMiniGame() {
    if (gameActive) return;
    
    gameActive = true;
    cheeriosCollected = 0;
    
    // Reset cheerio count
    localStorage.setItem(CHEERIO_COUNT_KEY, '0');
    
    // Create game modal
    createGameModal();
    
    // Replace cursor
    document.body.classList.add('game-cursor');
    
    // Start timer
    let timeLeft = 10;
    updateTimer(timeLeft);
    updateCheerioCount();
    
    gameTimer = setInterval(() => {
        timeLeft--;
        updateTimer(timeLeft);
        
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
    
    // Spawn cheerios
    spawnCheerio();
    cheerioSpawnInterval = setInterval(() => {
        if (gameActive) {
            spawnCheerio();
        }
    }, 800); // Spawn every 0.8 seconds
}

function createGameModal() {
    // Remove existing modal if any
    const existing = document.getElementById('cheerioGameModal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'cheerioGameModal';
    modal.className = 'cheerio-game-modal';
    
    modal.innerHTML = `
        <div class="game-ui">
            <div class="game-stats">
                <div class="cheerio-counter">Cheerios eaten: <span id="cheerioCount">0</span></div>
                <div class="game-timer">Time: <span id="gameTimer">10</span>s</div>
            </div>
        </div>
        <div id="gameArea" class="game-area"></div>
        <div id="gameResult" class="game-result" style="display: none;">
            <h2 id="resultMessage"></h2>
            <button id="rewardButton" class="reward-button" style="display: none;">Your Reward...</button>
            <video id="rewardVideo" class="reward-video" style="display: none;" controls>
                <source src="Videos/redbuck.mp4" type="video/mp4">
            </video>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fade in modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function spawnCheerio() {
    if (!gameActive) return;
    
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    
    const cheerio = document.createElement('img');
    cheerio.src = 'Images/cheerio1.png';
    cheerio.className = 'game-cheerio';
    
    // Random position
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    
    cheerio.style.left = x + 'px';
    cheerio.style.top = y + 'px';
    cheerio.style.opacity = '0';
    
    gameArea.appendChild(cheerio);
    activeCheerios.push(cheerio);
    
    // Fade in
    setTimeout(() => {
        cheerio.style.transition = 'opacity 0.3s ease';
        cheerio.style.opacity = '1';
    }, 10);
    
    // Fade out after 1.5 seconds
    setTimeout(() => {
        if (cheerio.parentNode) {
            cheerio.style.opacity = '0';
            setTimeout(() => {
                if (cheerio.parentNode) {
                    cheerio.remove();
                    const index = activeCheerios.indexOf(cheerio);
                    if (index > -1) activeCheerios.splice(index, 1);
                }
            }, 300);
        }
    }, 1500);
    
    // Track if this cheerio has been collected
    cheerio.collected = false;
    
    // Hover handler (collect on hover)
    cheerio.addEventListener('mouseenter', () => {
        if (!cheerio.collected && gameActive) {
            cheerio.collected = true;
            cheeriosCollected++;
            updateCheerioCount();
            
            // Remove cheerio
            cheerio.style.opacity = '0';
            cheerio.style.transform = 'scale(0)';
            setTimeout(() => {
                if (cheerio.parentNode) {
                    cheerio.remove();
                    const index = activeCheerios.indexOf(cheerio);
                    if (index > -1) activeCheerios.splice(index, 1);
                }
            }, 200);
            
            // Check win condition
            if (cheeriosCollected >= 10) {
                endGame(true);
            }
        }
    });
}

function updateTimer(time) {
    const timerEl = document.getElementById('gameTimer');
    if (timerEl) timerEl.textContent = time;
}

function updateCheerioCount() {
    const countEl = document.getElementById('cheerioCount');
    if (countEl) countEl.textContent = cheeriosCollected;
}

function endGame(won) {
    gameActive = false;
    
    // Clear intervals
    if (gameTimer) clearInterval(gameTimer);
    if (cheerioSpawnInterval) clearInterval(cheerioSpawnInterval);
    
    // Remove all active cheerios
    activeCheerios.forEach(cheerio => {
        if (cheerio.parentNode) cheerio.remove();
    });
    activeCheerios = [];
    
    const resultDiv = document.getElementById('gameResult');
    const messageEl = document.getElementById('resultMessage');
    const rewardBtn = document.getElementById('rewardButton');
    const videoEl = document.getElementById('rewardVideo');
    
    if (won) {
        messageEl.textContent = 'Congratulations!';
        rewardBtn.style.display = 'block';
        
        rewardBtn.addEventListener('click', () => {
            rewardBtn.style.display = 'none';
            videoEl.style.display = 'block';
            videoEl.style.opacity = '0';
            videoEl.classList.add('show');
            setTimeout(() => {
                videoEl.style.opacity = '1';
                videoEl.play().catch(e => console.log('Video play error:', e));
                
                // Add click handler to close video when clicking outside
                setupVideoCloseHandler();
            }, 10);
        });
    } else {
        messageEl.textContent = 'No More Snack Time';
        rewardBtn.style.display = 'none';
        
        // Fade back to previous page after 2 seconds
        setTimeout(() => {
            fadeBackToPage();
        }, 2000);
    }
    
    resultDiv.style.display = 'block';
    resultDiv.style.opacity = '0';
    setTimeout(() => {
        resultDiv.style.opacity = '1';
    }, 10);
}

function setupVideoCloseHandler() {
    const gameModal = document.getElementById('cheerioGameModal');
    const videoEl = document.getElementById('rewardVideo');
    
    if (!gameModal || !videoEl) return;
    
    // Remove any existing handler first
    if (gameModal.videoCloseHandler) {
        gameModal.removeEventListener('click', gameModal.videoCloseHandler);
    }
    
    // Create new handler
    gameModal.videoCloseHandler = (e) => {
        // Only close if video is showing and click is not on the video itself or its controls
        if (videoEl.style.display === 'block' && 
            e.target !== videoEl && 
            !videoEl.contains(e.target)) {
            videoEl.pause();
            // Return to original page
            fadeBackToPage();
        }
    };
    
    // Add listener
    gameModal.addEventListener('click', gameModal.videoCloseHandler);
}

function fadeBackToPage() {
    const modal = document.getElementById('cheerioGameModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            // Reset cursor
            document.body.classList.remove('game-cursor');
            
            // Remove modal
            if (modal.parentNode) modal.remove();
            
            // Reset cheerio count
            localStorage.setItem(CHEERIO_COUNT_KEY, '0');
            
            // Reload page to reset hidden cheerios
            window.location.reload();
        }, 500);
    }
}

