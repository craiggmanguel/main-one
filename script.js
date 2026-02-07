// ----------------- DATE & TIME (IST) -----------------
function getISTNow() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 5.5 * 60 * 60 * 1000);
}

// ----------------- DATA -----------------
const data = {
    1: {
        date: new Date("2026-12-04T00:00:00"),
        password: "04122004",
        link: "https://craiggmanguel.github.io/komal-birthday/",
        hint: "✨ Your special date ✨\nA day written softly in destiny 💖",
        message: "For the girl who makes every moment feel magical 💝"
    },
    2: {
        date: new Date("2026-09-21T00:00:00"),
        password: "21092021",
        link: "https://craiggmanguel.github.io/Anni/",
        hint: "💞 Our special date 💞\nThe day hearts chose each other 🥺💕",
        message: "A memory that still feels warm 🌸"
    },
    3: {
        date: null, // no date lock
        password: "food",
        link: "https://craiggmanguel.github.io/my-love-project/",
        hint: "🍕 What you love the most 🍔\n(Trust your cravings 😋)",
        message: "Forever begins with simple joys ♾️"
    }
};

// ----------------- HELPERS -----------------
function daysLeft(date) {
    const now = getISTNow();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const diff = date - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function fadeInMusic(audio) {
    audio.volume = 0;
    audio.play();
    let v = 0;
    const fade = setInterval(() => {
        if (v < 1) {
            v += 0.05;
            audio.volume = v;
        } else {
            clearInterval(fade);
        }
    }, 200);
}

// ----------------- MAIN UNLOCK FUNCTION -----------------
function unlockQR(num) {
    const msg = document.getElementById("msg" + num);
    const pass = document
  .getElementById("pass" + num)
  .value
  .trim()
  .toLowerCase();

    const music = document.getElementById("music");
    const now = getISTNow();
    const qrData = data[num];

    // show hint by default
    msg.innerText = qrData.hint;

    // date check (only if date exists)
    if (qrData.date && now < qrData.date) {
        msg.innerText =
            qrData.hint +
            "\n\nNot yet, baby… please don’t cheat 🥺\n" +
            "You’ll know when the day comes 💞\n" +
            "Wait with patience — I know you don’t have it… and you can’t do anything about it 😂\n\n" +
            "⏳ " + daysLeft(qrData.date) + " days left";
        return;
    }

    // password check
    if (pass !== qrData.password) {
        msg.innerText = qrData.hint + "\n\n😗 That’s not it… try again";
        return;
    }

    // success
    msg.innerText = "Unlocked 💖\n" + qrData.message;
    fadeInMusic(music);

    // open link
    window.open(qrData.link, "_blank");
}

// ----------------- SHOW HINTS ON LOAD -----------------
function showInitialHints() {
    for (let i = 1; i <= 3; i++) {
        const msg = document.getElementById("msg" + i);
        if (data[i] && data[i].hint) {
            msg.innerText = data[i].hint;
        }
    }
}
showInitialHints();

// ----------------- MIDNIGHT AUTO REFRESH (IST) -----------------
setInterval(() => {
    const now = getISTNow();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        location.reload();
    }
}, 30000);

// ----------------- FLOATING HEARTS -----------------
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";
    document.querySelector(".hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 500);
