const startDate = new Date("2026-01-30T00:00:00");

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    const months = Math.floor(totalDays / 30.44);
    const daysRemainder = Math.floor(totalDays % 30.44);

    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = daysRemainder;

    document.getElementById("hours").textContent = now.getHours().toString().padStart(2, "0");
    document.getElementById("minutes").textContent = now.getMinutes().toString().padStart(2, "0");
    document.getElementById("seconds").textContent = now.getSeconds().toString().padStart(2, "0");


    document.getElementById("totalDays").textContent = totalDays;
}

setInterval(updateCounter, 1000);

updateCounter();
setInterval(updateCounter, 1000);
updateCounter();


function playMusic() {
    const music = document.getElementById("music");
    const btn = document.querySelector(".music-btn");

    if (music.paused) {
        music.play();
        btn.textContent = "⏸ Pausar Música";
        btn.style.background = "#ff4d8d";
    } else {
        music.pause();
        btn.textContent = "▶ Clique para ouvir";
        btn.style.background = "rgba(255, 255, 255, 0.05)";
    }
}



let currentStep = 0;

function showSlide(n) {
    const slides = document.querySelectorAll(".slide");
    const thumbs = document.querySelectorAll(".thumb");
    const counter = document.querySelector(".counter");

    if (slides.length === 0) return;

    // Remove a classe ativa e pausa TODOS os vídeos
    slides.forEach(s => {
        s.classList.remove("active");
        if (s.tagName === "VIDEO") {
            s.pause();
            s.currentTime = 0; // Opcional: reseta o vídeo para o início
        }
    });
    
    thumbs.forEach(t => t.classList.remove("active"));
    
    currentStep = (n + slides.length) % slides.length;
    
    const activeSlide = slides[currentStep];
    activeSlide.classList.add("active");
    
    if (thumbs[currentStep]) {
        thumbs[currentStep].classList.add("active");
    }

    // Lógica para o vídeo rodar
    if (activeSlide.tagName === "VIDEO") {
        activeSlide.muted = true; // Garante que está mudo para o autoplay funcionar
        
        // Usamos um pequeno atraso ou o retorno da Promise do play()
        activeSlide.play().catch(error => {
            console.log("Autoplay bloqueado pelo navegador. O usuário precisa interagir primeiro.");
        });
    }

    if (counter) {
        counter.textContent = `${currentStep + 1} / ${slides.length}`;
    }
}

function changeSlide(n) { showSlide(currentStep + n); }
function currentSlide(n) { showSlide(n); }

function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.innerHTML = '❤'; s

    
    heart.style.left = Math.random() * 100 + "vw";
    
    
    const size = Math.random() * 20 + 10 + "px";
    heart.style.fontSize = size;

    
    const duration = Math.random() * 5 + 3 + "s";
    heart.style.animationDuration = duration;


    heart.style.opacity = Math.random() * 0.5 + 0.5;

    container.appendChild(heart);

    
    setTimeout(() => {
        heart.remove();
    }, parseFloat(duration) * 1000);
}


setInterval(createHeart, 300);