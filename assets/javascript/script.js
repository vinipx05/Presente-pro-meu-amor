// ─── Contador de tempo juntos ───────────────────────────────────────────────

const startDate = new Date("2026-01-30T00:00:00");

function updateCounter() {
    const now  = new Date();
    const diff = now - startDate;

    const totalDays    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months       = Math.floor(totalDays / 30.44);
    const daysRemainder = Math.floor(totalDays % 30.44);

    document.getElementById("months").textContent   = months;
    document.getElementById("days").textContent     = daysRemainder;
    document.getElementById("hours").textContent    = now.getHours().toString().padStart(2, "0");
    document.getElementById("minutes").textContent  = now.getMinutes().toString().padStart(2, "0");
    document.getElementById("seconds").textContent  = now.getSeconds().toString().padStart(2, "0");
    document.getElementById("totalDays").textContent = totalDays;
}

updateCounter();
setInterval(updateCounter, 1000);


// ─── Player de música ────────────────────────────────────────────────────────

function playMusic() {
    const music = document.getElementById("music");
    const btn   = document.querySelector(".music-btn");

    if (music.paused) {
        music.play();
        btn.textContent      = "⏸ Pausar Música";
        btn.style.background = "#ff4d8d";
    } else {
        music.pause();
        btn.textContent      = "▶ Clique para ouvir";
        btn.style.background = "#ff6fa5";
    }
}


// ─── Carrossel de fotos/vídeo ────────────────────────────────────────────────

let currentStep = 0;

function showSlide(n) {
    const slides  = document.querySelectorAll(".slide");
    const thumbs  = document.querySelectorAll(".thumb");
    const counter = document.querySelector(".counter");

    if (slides.length === 0) return;

    // Desativa todos e pausa vídeos
    slides.forEach(s => {
        s.classList.remove("active");
        if (s.tagName === "VIDEO") {
            s.pause();
            s.currentTime = 0;
        }
    });

    thumbs.forEach(t => t.classList.remove("active"));

    // Navega de forma circular
    currentStep = (n + slides.length) % slides.length;

    const activeSlide = slides[currentStep];
    activeSlide.classList.add("active");

    if (thumbs[currentStep]) {
        thumbs[currentStep].classList.add("active");
    }

    // Reproduz automaticamente se for vídeo
    if (activeSlide.tagName === "VIDEO") {
        activeSlide.play().catch(() => {
            console.log("Autoplay bloqueado — aguardando interação do usuário.");
        });
    }

    if (counter) {
        counter.textContent = `${currentStep + 1} / ${slides.length}`;
    }
}

function changeSlide(n) { showSlide(currentStep + n); }
function currentSlide(n) { showSlide(n); }

// Inicializa o carrossel no primeiro slide
showSlide(0);


// ─── Chuva de corações ───────────────────────────────────────────────────────

function createHeart() {
    const container = document.getElementById("hearts-container");
    if (!container) return;

    const heart = document.createElement("div");
    heart.classList.add("falling-heart");
    heart.innerHTML = "❤";

    heart.style.left          = Math.random() * 100 + "vw";
    heart.style.fontSize      = (Math.random() * 20 + 10) + "px";
    heart.style.opacity       = (Math.random() * 0.5 + 0.5).toString();

    const duration            = Math.random() * 5 + 3;
    heart.style.animationDuration = duration + "s";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createHeart, 300);
