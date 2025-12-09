// Haiku generation for "Hoppin' Haiku" page

const generateBtn = document.getElementById('generateHaikuBtn');
const haikuText = document.getElementById('haikuText');
const haikuImage = document.getElementById('haikuImage');

// Collection of haikus about rabbits, carrots, easter, hopping, bunnies
const haikus = [
    "A fluffy white tail\nHops through the morning garden\nCarrots wait below",
    "Easter bunny comes\nBringing colorful baskets\nSpring has arrived now",
    "Long ears twitch and turn\nListening to the soft breeze\nRabbit sits so still",
    "Orange carrot waits\nIn the cool dark earth below\nBunny finds it soon",
    "Hop hop hop he goes\nThrough the green grass he travels\nFinding his way home",
    "Fluffy cotton tail\nBouncing through the meadow bright\nRabbit in the sun",
    "Easter morning breaks\nBaskets filled with chocolate\nBunny brings them all",
    "Carrot in the ground\nWaiting for the gentle bite\nRabbit's favorite treat",
    "Soft fur in the sun\nEars perked up and listening\nRabbit watches all",
    "Hop across the lawn\nLeaving tiny paw prints there\nRabbit on the move",
    "Easter eggs are hidden\nBunny knows where they all are\nChildren search and find",
    "Orange root so sweet\nPulled from garden soil below\nRabbit's happy meal",
    "Fluffy bunny hops\nThrough the dewy morning grass\nSpring has come again",
    "Long ears hear the world\nEvery sound and whisper soft\nRabbit stays alert",
    "Carrot top so green\nOrange body underground\nPerfect rabbit food",
    "Easter celebration\nBunny brings the joy and fun\nSpringtime happiness",
    "Hop skip and a jump\nRabbit moves so gracefully\nThrough the garden path",
    "Soft white cotton tail\nBouncing as he hops along\nRabbit in motion",
    "Carrot garden grows\nWaiting for the hungry one\nRabbit will arrive",
    "Easter morning light\nBunny visits every home\nLeaving treats behind",
    "Fluffy bunny friend\nHops around the garden green\nFinding carrots sweet",
    "Long ears catch the sounds\nOf the world around him now\nRabbit stays aware",
    "Orange carrot waits\nIn the cool and dark below\nRabbit digs it up",
    "Hop hop hop away\nThrough the meadow he travels\nRabbit finds his way",
    "Easter bunny comes\nWith basket full of goodies\nSpring has arrived here",
    "Soft fur in the breeze\nEars twitching in the sunlight\nRabbit sits so calm",
    "Carrot in the hand\nOr waiting in the garden\nRabbit loves them both",
    "Fluffy tail so white\nBouncing as he moves along\nRabbit hops with joy",
    "Easter eggs so bright\nHidden in the garden green\nBunny knows them all",
    "Hop through morning dew\nLeaving tracks across the lawn\nRabbit on his way",
    "Orange root so fresh\nPulled from earth so carefully\nRabbit's perfect snack",
    "Long ears hear it all\nEvery whisper in the wind\nRabbit stays alert",
    "Easter celebration\nBunny brings the springtime cheer\nHappiness for all",
    "Soft bunny hops by\nThrough the green and growing grass\nFinding his way home",
    "Carrot top above\nOrange body down below\nRabbit's favorite food",
    "Fluffy cotton tail\nBouncing in the morning light\nRabbit moves with grace",
    "Easter morning comes\nBunny visits every door\nLeaving joy behind",
    "Hop across the yard\nThrough the flowers and the grass\nRabbit travels on",
    "Orange carrot sweet\nWaiting in the garden soil\nRabbit finds it soon",
    "Long ears turn and twitch\nCatching sounds from all around\nRabbit listens well",
    "Soft fur in the sun\nEars perked up and watching\nRabbit sits so still",
    "Easter bunny hops\nBringing baskets full of treats\nSpring has come again",
    "Carrot in the ground\nWaiting for the gentle pull\nRabbit's happy meal",
    "Fluffy bunny friend\nHops through dewy morning grass\nFinding carrots there",
    "Hop skip jump away\nThrough the meadow he travels\nRabbit finds his path",
    "Orange root so fresh\nPulled from cool and dark below\nRabbit loves it so",
    "Easter eggs are hidden\nBunny knows where each one is\nChildren search with joy",
    "Soft white cotton tail\nBouncing as he moves along\nRabbit in the sun",
    "Long ears hear the world\nEvery sound and gentle breeze\nRabbit stays aware",
    "Carrot garden grows\nWaiting for the hungry one\nRabbit will arrive soon",
    "Fluffy bunny hops\nThrough the green and growing grass\nSpring has come again",
    "Easter morning light\nBunny visits every home\nLeaving treats behind",
    "Hop hop hop he goes\nThrough the garden he travels\nFinding carrots sweet",
    "Orange carrot waits\nIn the cool dark earth below\nRabbit digs it up",
    "Soft fur in the breeze\nEars twitching in sunlight\nRabbit sits so calm",
    "Easter celebration\nBunny brings the springtime cheer\nHappiness for all",
    "Fluffy tail so white\nBouncing as he moves along\nRabbit hops with joy",
    "Long ears catch the sounds\nOf the world around him now\nRabbit stays alert",
    "Carrot in the hand\nOr waiting in the garden\nRabbit loves them both",
    "Easter bunny comes\nWith basket full of goodies\nSpring has arrived here",
    "Hop through morning dew\nLeaving tracks across the lawn\nRabbit on his way",
    "Orange root so sweet\nPulled from earth so carefully\nRabbit's perfect snack",
    "Soft bunny hops by\nThrough the green and growing grass\nFinding his way home",
    "Easter eggs so bright\nHidden in the garden green\nBunny knows them all",
    "Fluffy cotton tail\nBouncing in the morning light\nRabbit moves with grace",
    "Carrot top so green\nOrange body underground\nPerfect rabbit food",
    "Long ears turn and twitch\nCatching sounds from all around\nRabbit listens well",
    "Easter morning comes\nBunny visits every door\nLeaving joy behind",
    "Hop across the yard\nThrough the flowers and the grass\nRabbit travels on",
    "Orange carrot sweet\nWaiting in the garden soil\nRabbit finds it soon",
    "Soft fur in the sun\nEars perked up and watching\nRabbit sits so still",
    "Easter bunny hops\nBringing baskets full of treats\nSpring has come again",
    "Fluffy bunny friend\nHops through dewy morning grass\nFinding carrots there",
    "Carrot in the ground\nWaiting for the gentle pull\nRabbit's happy meal",
    "Hop skip jump away\nThrough the meadow he travels\nRabbit finds his path",
    "Long ears hear it all\nEvery whisper in the wind\nRabbit stays alert",
    "Easter eggs are hidden\nBunny knows where each one is\nChildren search with joy",
    "Orange root so fresh\nPulled from cool and dark below\nRabbit loves it so",
    "Soft white cotton tail\nBouncing as he moves along\nRabbit in the sun",
    "Fluffy bunny hops\nThrough the green and growing grass\nSpring has come again",
    "Carrot garden grows\nWaiting for the hungry one\nRabbit will arrive soon",
    "Easter morning light\nBunny visits every home\nLeaving treats behind",
    "Hop hop hop he goes\nThrough the garden he travels\nFinding carrots sweet"
];

let isTyping = false;

// Type out haiku with animation
function typeHaiku(text, element, speed = 50) {
    return new Promise((resolve) => {
        element.textContent = '';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed);
            } else {
                // Add blinking cursor at the end
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                element.appendChild(cursor);
                resolve();
            }
        }
        
        type();
    });
}

// Get random haiku
function getRandomHaiku() {
    return haikus[Math.floor(Math.random() * haikus.length)];
}

// Get random image
function getRandomImage() {
    const imageNum = Math.floor(Math.random() * 14) + 1;
    return `Images/buck${imageNum}.jpg`;
}

// Generate haiku
generateBtn.addEventListener('click', async () => {
    if (isTyping) return;
    
    isTyping = true;
    generateBtn.disabled = true;
    
    // Clear previous content
    haikuText.textContent = '';
    haikuImage.style.display = 'none';
    haikuImage.classList.remove('show');
    
    // Get random haiku and image
    const haiku = getRandomHaiku();
    const imageSrc = getRandomImage();
    
    // Set image source
    haikuImage.src = imageSrc;
    
    // Start typing animation
    await typeHaiku(haiku, haikuText, 40);
    
    // Fade in image slowly
    haikuImage.style.display = 'block';
    setTimeout(() => {
        haikuImage.classList.add('show');
    }, 100);
    
    isTyping = false;
    generateBtn.disabled = false;
});

