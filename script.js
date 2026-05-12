import { supabase } from "./supabaseClient.js";

const fallbackBooks = [
    { id: "book-1", title: "Haunting Adeline", author: "Hayley Dee Carlton", img: "book.jpg", rating: 4.7, votes: 1250, category: "bestseller" },
    { id: "book-2", title: "Crescent City. House of Earth and Blood", author: "Sarah J. Maas", img: "book2.png", rating: 4.5, votes: 980, category: "bestseller" },
    { id: "book-3", title: "From Blood and Ash", author: "Jennifer L. Armentrout", img: "book3.png", rating: 4.6, votes: 1100, category: "bestseller" },
    { id: "book-4", title: "Gild", author: "Raven Kennedy", img: "book4.png", rating: 4.4, votes: 850, category: "bestseller" },
    { id: "book-5", title: "A Touch of Darkness", author: "Scarlett St. Clair", img: "book5.png", rating: 4.8, votes: 1300, category: "bestseller" },
    { id: "book-6", title: "Buttons&Lace", author: "Penelope Sky", img: "book6.png", rating: 4.3, votes: 750, category: "bestseller" },
    { id: "book-7", title: "Kingdom of the Wicked", author: "Kerri Maniscalco", img: "book7.jpeg", rating: 4.6, votes: 1000, category: "bestseller" },
    { id: "book-8", title: "Fourth Wing", author: "Rebecca Yarros", img: "book8.png", rating: 4.7, votes: 1200, category: "bestseller" },
    { id: "book-9", title: "Shatter Me", author: "Tahereh Mafi", img: "book9.png", rating: 4.5, votes: 900, category: "bestseller" },
    { id: "book-10", title: "A Good Girl's Guide to Murder", author: "Holly Jackson", img: "book10.png", rating: 4.6, votes: 1100, category: "bestseller" },
    { id: "book-11", title: "The Surgeon", author: "Tess Gerritsen", img: "book11.jpg", rating: 4.4, votes: 800, category: "bestseller" },
    { id: "book-12", title: "My Dark Romeo", author: "Parker S. Huntington, L.J.Shen", img: "book12.png", rating: 4.7, votes: 1250, category: "bestseller" },
    { id: "book-13", title: "Five Survive", author: "Holly Jackson", img: "book13.png", rating: 4.5, votes: 950, category: "bestseller" },
    { id: "book-14", title: "Punk 57", author: "Penelope Douglas", img: "book14.png", rating: 4.3, votes: 700, category: "bestseller" },
    { id: "book-15", title: "If had been with me", author: "Laura Nowlin", img: "book15.png", rating: 4.6, votes: 1050, category: "bestseller" },
    { id: "book-16", title: "Murder on the Orient Express", author: "Agatha Christie", img: "book16.png", rating: 4.8, votes: 1350, category: "bestseller" },
    { id: "book-17", title: "Bound by Honor", author: "Cora Reilly", img: "book17.png", rating: 4.5, votes: 900, category: "bestseller" },
    { id: "book-18", title: "Gothikana", author: "RuNyx", img: "book18.png", rating: 4.4, votes: 800, category: "bestseller" },
    { id: "book-19", title: "The Chemistry of Death", author: "Simon Beckett", img: "book19.png", rating: 4.3, votes: 700, category: "bestseller" },
    { id: "book-20", title: "Pet Sematary", author: "Stephen King", img: "book20.jpg", rating: 4.6, votes: 1100, category: "bestseller" }
];

const fallbackNoveltyBooks = [
    { id: "novelty-1", title: "New Book 1", author: "Author 1", img: "img1.jpg", category: "novelty" },
    { id: "novelty-2", title: "New Book 2", author: "Author 2", img: "img2.jpg", category: "novelty" }
];

const fallbackFictionBooks = [
    { id: "fiction-1", title: "Fiction Book 1", author: "Author A", img: "book1.jpg", rating: 4.5, votes: 500, category: "fiction" }
];

const fallbackAnnouncementsBooks = [
    { id: "announcements-1", title: "Announcement 1", author: "Author B", img: "book2.jpg", rating: 4.2, votes: 300, category: "announcements" }
];

const fallbackEducationalBooks = [
    { id: "educational-1", title: "Educational 1", author: "Author C", img: "book3.jpg", rating: 4.8, votes: 800, category: "educational" }
];

const fallbackOtherBooks = [
    { id: "other-1", title: "Other 1", author: "Author D", img: "book4.jpg", rating: 4.0, votes: 200, category: "other" }
];

const fallbackAllBooks = [
    ...fallbackBooks,
    ...fallbackNoveltyBooks,
    ...fallbackFictionBooks,
    ...fallbackAnnouncementsBooks,
    ...fallbackEducationalBooks,
    ...fallbackOtherBooks
];

let currentUser = null;
let favoriteBookIds = [];
let books = [];
let categories = {
    novelty: [],
    fiction: [],
    announcements: [],
    educational: [],
    other: []
};

function generateStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i += 1) {
        stars += rating >= i ? "★" : "☆";
    }
    return stars;
}

function renderBooks(list, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = "";

    list.forEach((book) => {
        const isFavorite = favoriteBookIds.includes(book.id);
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <div class="book-image">
                <img src="${book.img}" alt="${book.title}">
                <button class="heart-btn ${isFavorite ? "active" : ""}"
                    onclick="event.stopPropagation(); toggleFavorite(this, '${book.id}')">
                    <svg viewBox="0 0 24 24">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
                    </svg>
                </button>
            </div>
            <div class="rating">
                <div class="stars">
                    ${generateStars(book.rating || 0)}
                    <span>${book.rating || 0}</span>
                </div>
                <div class="rating-text">
                    ${(book.votes || 0)} ratings
                </div>
            </div>
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
        `;
        card.onclick = () => openModal(book);
        container.appendChild(card);
    });
}

function categorizeBooks(bookArray) {
    books = bookArray.filter((book) => book.category === "bestseller");
    categories = {
        novelty: [],
        fiction: [],
        announcements: [],
        educational: [],
        other: []
    };

    bookArray.forEach((book) => {
        switch ((book.category || "").toLowerCase()) {
            case "novelty":
                categories.novelty.push(book);
                break;
            case "fiction":
                categories.fiction.push(book);
                break;
            case "announcements":
                categories.announcements.push(book);
                break;
            case "educational":
                categories.educational.push(book);
                break;
            default:
                if (book.category !== "bestseller") {
                    categories.other.push(book);
                }
                break;
        }
    });
}

function getAllBooks() {
    return [
        ...books,
        ...categories.novelty,
        ...categories.fiction,
        ...categories.announcements,
        ...categories.educational,
        ...categories.other
    ];
}

async function loadBooks() {
    const { data, error } = await supabase.from("books").select("*").order("votes", { ascending: false });
    if (error || !data || !data.length) {
        console.warn("Supabase books load error, using fallback data:", error);
        categorizeBooks(fallbackAllBooks);
        return;
    }
    categorizeBooks(data);
}

async function loadFavorites() {
    if (!currentUser) {
        favoriteBookIds = [];
        return;
    }

    const { data, error } = await supabase
        .from("favorites")
        .select("book_id")
        .eq("user_id", currentUser.id);

    if (error) {
        console.warn("Supabase favorites load error:", error);
        favoriteBookIds = [];
        return;
    }

    favoriteBookIds = data.map((item) => item.book_id);
}

function renderAll() {
    renderBooks(books, ".books-row");
    renderBooks(categories.novelty, ".novelty-row");
    renderBooks(categories.fiction, ".fiction-row");
    renderBooks(categories.announcements, ".announcements-row");
    renderBooks(categories.educational, ".educational-row");
    renderBooks(categories.other, ".other-row");
}

function openModal(book) {
    const modal = document.getElementById("modal");
    const modalImage = document.querySelector(".modal-left img");
    const title = document.querySelector(".modal-title");
    const author = document.querySelector(".modal-author");
    const rating = document.querySelector(".modal-rating");

    if (!modal || !modalImage || !title || !author || !rating) return;

    modalImage.src = book.img;
    title.textContent = book.title;
    author.textContent = `by ${book.author}`;
    rating.textContent = `Rating: ${book.rating || 0} (${book.votes || 0} votes)`;
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
}

function openAuth(message = "") {
    const modal = document.getElementById("authModal");
    const msg = document.getElementById("authMessage");
    if (msg) msg.textContent = message;
    if (modal) modal.style.display = "flex";
}

function closeAuth() {
    const modal = document.getElementById("authModal");
    if (modal) modal.style.display = "none";
}

async function toggleFavorite(btn, bookId) {
    if (!currentUser) {
        openAuth("Login required");
        return;
    }

    const isFavorite = favoriteBookIds.includes(bookId);
    if (isFavorite) {
        const { error } = await supabase
            .from("favorites")
            .delete()
            .match({ user_id: currentUser.id, book_id: bookId });
        if (error) {
            console.warn("Unable to remove favorite:", error);
        }
    } else {
        const { error } = await supabase.from("favorites").insert({
            user_id: currentUser.id,
            book_id: bookId
        });
        if (error) {
            console.warn("Unable to save favorite:", error);
        }
    }

    await loadFavorites();
    renderAll();
}

function showFavoritesModal() {
    if (!currentUser) {
        openAuth("To view favorites, login required");
        return;
    }

    const modal = document.getElementById("modal");
    const container = document.querySelector(".modal-books-row");
    if (!modal || !container) return;

    const favoriteBooks = getAllBooks().filter((book) => favoriteBookIds.includes(book.id));
    container.innerHTML = "";
    modal.style.display = "block";

    if (favoriteBooks.length === 0) {
        container.innerHTML = "<p>No favorites yet</p>";
        return;
    }

    favoriteBooks.forEach((book) => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <div class="book-image">
                <img src="${book.img}" alt="${book.title}">
            </div>
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
        `;
        container.appendChild(card);
    });
}

async function login() {
    const email = document.getElementById("loginEmail")?.value.trim();
    const pass = document.getElementById("loginPassword")?.value.trim();
    const messageNode = document.getElementById("authMessage");

    if (!email || !pass) {
        if (messageNode) messageNode.textContent = "Fill in all fields";
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
    });

    if (error) {
        if (messageNode) messageNode.textContent = error.message;
        return;
    }

    currentUser = data.user;
    await loadFavorites();
    updateUI();
    renderAll();
    closeAuth();
}

async function createProfile(userId, name, username, email) {
    const { error } = await supabase.from("profiles").insert({
        id: userId,
        name,
        username,
        email
    });
    if (error) {
        console.warn("Unable to create profile:", error);
    }
}

async function register() {
    const name = document.getElementById("regName")?.value.trim();
    const username = document.getElementById("regUsername")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim();
    const pass = document.getElementById("regPassword")?.value.trim();
    const messageNode = document.getElementById("authMessage");

    if (!name || !username || !email || !pass) {
        if (messageNode) messageNode.textContent = "Fill in all fields";
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password: pass
    });

    if (error) {
        if (messageNode) messageNode.textContent = error.message;
        return;
    }

    if (data.user) {
        await createProfile(data.user.id, name, username, email);
        currentUser = data.user;
        await loadFavorites();
        updateUI();
        renderAll();
        closeAuth();
    } else {
        if (messageNode) messageNode.textContent = "Check your email to confirm registration.";
    }
}

function switchTab(tab) {
    const loginTab = document.getElementById("tabLogin");
    const registerTab = document.getElementById("tabRegister");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginTab && registerTab) {
        loginTab.classList.toggle("active", tab === "login");
        registerTab.classList.toggle("active", tab === "register");
    }
    if (loginForm && registerForm) {
        loginForm.style.display = tab === "login" ? "block" : "none";
        registerForm.style.display = tab === "register" ? "block" : "none";
    }
}

async function showUsers() {
    if (!currentUser || currentUser.email !== "admin@gmail.com") {
        openAuth("Admin login required");
        return;
    }
    await loadUsersPanel();
}

async function loadUsersPanel() {
    const modal = document.getElementById("usersModal");
    const content = document.getElementById("usersPanelContent");
    if (!modal || !content) return;

    content.innerHTML = "<p>Loading users...</p>";
    modal.style.display = "block";

    const { data: profiles, error } = await supabase.from("profiles").select("id, name, username, email");
    if (error) {
        content.innerHTML = `<p>Unable to load users: ${error.message}</p>`;
        return;
    }

    if (!profiles || profiles.length === 0) {
        content.innerHTML = "<p>No registered users.</p>";
        return;
    }

    content.innerHTML = "";
    profiles.forEach((profile) => {
        const userCard = document.createElement("div");
        userCard.className = "user-card";
        userCard.innerHTML = `
            <div class="user-card-row">
                <div>
                    <strong>${profile.name || "No name"}</strong>
                    <p>${profile.username ? `@${profile.username}` : "No username"}</p>
                </div>
                <div>${profile.email || "No email"}</div>
            </div>
        `;
        content.appendChild(userCard);
    });
}

function closeUsersModal() {
    const modal = document.getElementById("usersModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function updateUI() {
    const isLoggedIn = Boolean(currentUser);
    const isAdmin = currentUser?.email === "admin@gmail.com";

    const authBtn = document.getElementById("authBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const adminBtn = document.getElementById("adminPanelBtn");
    const usersBtn = document.getElementById("usersBtn");

    if (authBtn) authBtn.style.display = isLoggedIn ? "none" : "block";
    if (logoutBtn) logoutBtn.style.display = isLoggedIn ? "block" : "none";
    if (adminBtn) adminBtn.style.display = isAdmin ? "block" : "none";
    if (usersBtn) usersBtn.style.display = isAdmin ? "block" : "none";
}

async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.warn("Error signing out:", error);
    }

    currentUser = null;
    favoriteBookIds = [];
    updateUI();
    renderAll();
}

async function init() {
    const { data } = await supabase.auth.getSession();
    currentUser = data?.session?.user ?? null;
    await loadBooks();
    if (currentUser) {
        await loadFavorites();
    }
    renderAll();
    updateUI();

    supabase.auth.onAuthStateChange(async (_event, session) => {
        currentUser = session?.user ?? null;
        if (currentUser) {
            await loadFavorites();
        } else {
            favoriteBookIds = [];
        }
        renderAll();
        updateUI();
    });
}

window.openAuth = openAuth;
window.closeAuth = closeAuth;
window.toggleFavorite = toggleFavorite;
window.toggleFavoritesModal = showFavoritesModal;
window.login = login;
window.register = register;
window.showUsers = showUsers;
window.logout = logout;
window.switchTab = switchTab;
window.openModal = openModal;
window.closeUsersModal = closeUsersModal;

window.addEventListener("DOMContentLoaded", init);
