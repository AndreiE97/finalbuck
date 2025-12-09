// Typing animation for "Dear Buck" page

const dearBuckText = document.getElementById('dearBuckText');

// The letter text - edit this to change what appears
const letterText = `I can't express how much I miss you every day. I'm not ashamed to admit that at first, I didn't want a pet rabbit. You were here by chance, a pet my brother was 'taking care of' for a friend. I didn't expect you to stay with us for a few months, let alone over a decade. But there you stayed, and I tried to convince myself that you weren't going to be here for long so that I wouldn't get attached. But life had other plans. The longer you stayed, the more I cared for you. You were my best friend, always there at my zenith and down to my lowest. I practiced some of my interviews with you, speeches for assignments, baby talked you like an idiot... and I don't regret a single moment of it. When I first saw you slowing down, I felt my heart sink and my world pause. You were always so lively, but when your own mortality started to make itself more apparent, I wasn't prepared. Every day since then, I dreaded the day you would leave us. Slowly, time took your legs, your vision, and eventually, your breath. I held you in my arms one last time as I broke the news to my brother. I couldn't even say goodbye, I didn't want to let go. But you already had. In ashes you rest, and every now and then, I would look over at the spots you would nap on and wished you were still there. I love you, Mr. Buck, and I miss you every day.\n-Andrei`;

// Type out text with fade-in effect
function typeTextWithFade(text, element, speed = 30) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            const char = text[index];
            
            // Handle newlines
            if (char === '\n') {
                element.innerHTML += '<br>';
            } else {
                // Create a span for each character with fade-in
                const span = document.createElement('span');
                span.textContent = char;
                span.style.opacity = '0';
                span.style.transition = 'opacity 0.2s ease';
                element.appendChild(span);
                
                // Fade in the character
                setTimeout(() => {
                    span.style.opacity = '1';
                }, 10);
            }
            
            index++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            element.appendChild(cursor);
        }
    }
    
    type();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    typeTextWithFade(letterText, dearBuckText, 30);
});

