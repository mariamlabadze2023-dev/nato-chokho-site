
// =====================
// 🌙 DARK MODE
// =====================
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("dark", "on");
    } else {
        localStorage.setItem("dark", "off");
    }
}

// load dark mode on every page
window.addEventListener("load", () => {
    if (localStorage.getItem("dark") === "on") {
        document.body.classList.add("dark");
    }
});


// =====================
// 🔍 UNIVERSAL SEARCH (VIDEOS + INTERVIEWS)
// =====================
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");

    // თუ search არ არსებობს ამ გვერდზე → არაფერი გააკეთოს
    if (!input) return;

    const cards = document.querySelectorAll(".video-card, .interview-card");

    input.addEventListener("input", () => {

        const value = input.value.toLowerCase();

        cards.forEach(card => {

            const title = (
                card.dataset.title ||
                card.querySelector("h2")?.innerText ||
                ""
            ).toLowerCase();

            if (title.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});


// =====================
// ❤️ FAVORITES SYSTEM (STABLE)
// =====================
document.addEventListener("DOMContentLoaded", () => {

    const favButtons = document.querySelectorAll(".fav");

    if (!favButtons.length) return;

    let saved = JSON.parse(localStorage.getItem("favorites")) || [];

    // load saved state
    document.querySelectorAll(".video-card").forEach(card => {

        const img = card.querySelector("img");
        const fav = card.querySelector(".fav");

        if (!img || !fav) return;

        if (saved.includes(img.src)) {
            fav.classList.add("active");
        }

        fav.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const id = img.src;

            if (saved.includes(id)) {
                saved = saved.filter(item => item !== id);
                fav.classList.remove("active");
            } else {
                saved.push(id);
                fav.classList.add("active");
            }

            localStorage.setItem("favorites", JSON.stringify(saved));
        });

    });

});

let favMode = false;

function toggleFavFilter(){
    favMode = !favMode;

    let cards = document.querySelectorAll(".video-card");

    cards.forEach(card => {

        let isFav = card.querySelector(".fav").classList.contains("active");

        if(favMode){
            if(isFav){
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        } else {
            card.style.display = "block";
        }

    });
}

document.addEventListener("DOMContentLoaded", () => {

    const favs = JSON.parse(localStorage.getItem("interviewFavs")) || [];

    document.querySelectorAll(".interview-card").forEach((card, index) => {

        const heart = card.querySelector(".fav");

        // load saved
        if(favs.includes(index)){
            heart.classList.add("active");
        }

        heart.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            heart.classList.toggle("active");

            if(heart.classList.contains("active")){
                favs.push(index);
            } else {
                const i = favs.indexOf(index);
                if(i > -1) favs.splice(i, 1);
            }

            localStorage.setItem("interviewFavs", JSON.stringify(favs));
        });

    });

});

// ❤️ FAVORITES (localStorage)
document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".interview-card");

    cards.forEach(card => {

        const fav = card.querySelector(".fav");
        const id = card.getAttribute("data-title");

        // load saved
        if (localStorage.getItem("fav_" + id) === "true") {
            fav.classList.add("active");
        }

        fav.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            fav.classList.toggle("active");

            if (fav.classList.contains("active")) {
                localStorage.setItem("fav_" + id, "true");
            } else {
                localStorage.removeItem("fav_" + id);
            }
        });
    });
});


// 🔍 SEARCH
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", () => {

        let value = searchInput.value.toLowerCase();

        document.querySelectorAll(".interview-card").forEach(card => {

            let title = card.dataset.title.toLowerCase();

            card.style.display = title.includes(value) ? "block" : "none";
        });
    });
}


// ❤️ SHOW ALL / FAVORITES FILTER
function showAll() {
    document.querySelectorAll(".interview-card").forEach(c => {
        c.style.display = "block";
    });
}

function showFavs() {
    document.querySelectorAll(".interview-card").forEach(card => {

        const id = card.dataset.title;

        if (localStorage.getItem("fav_" + id) === "true") {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".interview-card");

    cards.forEach(card => {

        const fav = card.querySelector(".fav");
        const id = card.dataset.title;

        // load state
        if (localStorage.getItem("fav_" + id) === "true") {
            fav.classList.add("active");
        }

        fav.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            fav.classList.toggle("active");

            if (fav.classList.contains("active")) {
                localStorage.setItem("fav_" + id, "true");
            } else {
                localStorage.removeItem("fav_" + id);
            }
        });

    });

});