import { supabase } from "./supabaseClient.js";

const fallbackBooks = [
    { id: "book-1", title: "Haunting Adeline", author: "Hayley Dee Carlton", img: "images/book1.jpg", category: "bestseller", price: 13.50 },
    { id: "book-2", title: "Crescent City. House of Earth and Blood", author: "Sarah J. Maas", img: "images/book2.png", category: "bestseller", price: 15.50 },
    { id: "book-3", title: "From Blood and Ash", author: "Jennifer L. Armentrout", img: "images/book3.png", category: "bestseller", price: 14.50 },
    { id: "book-4", title: "Gild", author: "Raven Kennedy", img: "images/book4.png", category: "bestseller", price: 12.25 },
    { id: "book-5", title: "A Touch of Darkness", author: "Scarlett St. Clair", img: "images/book5.png", category: "bestseller", price: 11.25 },
    { id: "book-6", title: "Buttons&Lace", author: "Penelope Sky", img: "images/book6.png", category: "bestseller", price: 12.75 },
    { id: "book-7", title: "Kingdom of the Wicked", author: "Kerri Maniscalco", img: "images/book7.jpeg", category: "bestseller", price: 12.00 },
    { id: "book-8", title: "Fourth Wing", author: "Rebecca Yarros", img: "images/book8.png", category: "bestseller", price: 16.25 },
    { id: "book-9", title: "Shatter Me", author: "Tahereh Mafi", img: "images/book9.png", category: "bestseller", price: 10.50 },
    { id: "book-10", title: "A Good Girl's Guide to Murder", author: "Holly Jackson", img: "images/book10.png", category: "bestseller", price: 11.50 },
    { id: "book-11", title: "The Surgeon", author: "Tess Gerritsen", img: "images/book11.jpg", category: "bestseller", price: 9.75 },
    { id: "book-12", title: "My Dark Romeo", author: "Parker S. Huntington, L.J.Shen", img: "images/book12.png", category: "bestseller", price: 13.25 },
    { id: "book-13", title: "Five Survive", author: "Holly Jackson", img: "images/book13.png", category: "bestseller", price: 11.75 },
    { id: "book-14", title: "Punk 57", author: "Penelope Douglas", img: "images/book14.png", category: "bestseller", price: 13.00 },
    { id: "book-15", title: "If had been with me", author: "Laura Nowlin", img: "images/book15.png", category: "bestseller", price: 10.25 },
    { id: "book-16", title: "Murder on the Orient Express", author: "Agatha Christie", img: "images/book16.png", category: "bestseller", price: 8.75 },
    { id: "book-17", title: "Bound by Honor", author: "Cora Reilly", img: "images/book17.png", category: "bestseller", price: 11.00 },
    { id: "book-18", title: "Gothikana", author: "RuNyx", img: "images/book18.png", category: "bestseller", price: 14.00 },
    { id: "book-19", title: "The Chemistry of Death", author: "Simon Beckett", img: "images/book19.png", category: "bestseller", price: 9.50 },
    { id: "book-20", title: "Pet Sematary", author: "Stephen King", img: "images/book20.jpg", category: "bestseller", price: 10.75 }
];

const fallbackNoveltyBooks = [
    { id: "novelty-1", title: "Starside", author: "Alex Aster", img: "images/novelty1.jpg", category: "novelty", price: 14.75 },
    { id: "novelty-2", title: "Forbidden Alchemy", author: "Stacey McEwan", img: "images/novelty2.jpg", category: "novelty", price: 14.40 },
    { id: "novelty-3", title: "A Forsaken Prophecy", author: "Stacey McEwan", img: "images/novelty3.jpg", category: "novelty", price: 14.40 },
    { id: "novelty-4", title: "Daggermouth", author: "H.M.Wolfe", img: "images/novelty4.webp", category: "novelty", price: 12.40 },
    { id: "novelty-5", title: "With Hearts of Flame", author: "Briar Boleyn", img: "images/novelty5.jpg", category: "novelty", price: 12.75 },
    { id: "novelty-6", title: "Dire Bound", author: "Sable Sorensen", img: "images/novelty6.jpg", category: "novelty", price: 12.15 },
    { id: "novelty-7", title: "Eldritch", author: "Keri Lake", img: "images/novelty7.webp", category: "novelty", price: 15.50 },
    { id: "novelty-8", title: "Vine of Hearts", author: "Julie Soto", img: "images/novelty8.webp", category: "novelty", price: 11.50 },
    { id: "novelty-9", title: "Cursed City", author: "Kate Golden", img: "images/novelty9.jpg", category: "novelty", price: 13.40 },
    { id: "novelty-10", title: "The Wrath Gods Reap", author: "Abigall Owen", img: "images/novelty10.jpg", category: "novelty", price: 13.75 }
];

const fallbackFictionBooks = [
    { id: "fiction-1", title: "Kirill", author: "Lilian Harris", img: "images/fiction1.jpg", category: "fiction", price: 10.25 },
    { id: "fiction-2", title: "Fury Bound", author: "Sable Sorensen", img: "images/fiction2.webp", category: "fiction", price: 9.50 },
    { id: "fiction-3", title: "My Dreadeul Darling", author: "H.D.Carlton", img: "images/fiction3.jpg", category: "fiction", price: 11.25 },
    { id: "fiction-4", title: "Between Tides&Thunder", author: "Leena Kazak", img: "images/fiction4.jpg", category: "fiction", price: 9.90 },
    { id: "fiction-5", title: "Black House", author: "Stephen King and Peter Straub", img: "images/fiction5.jpg", category: "fiction", price: 13.00 },
    { id: "fiction-6", title: "If Walls Could Talk", author: "Jean Grainger", img: "images/fiction6.jpg", category: "fiction", price: 8.50 },
    { id: "fiction-7", title: "You'll Miss Me When I'm Gone", author: "A.R.Torre", img: "images/fiction7.webp", category: "fiction", price: 10.75 },
    { id: "fiction-8", title: "Possessive Enemy", author: "Michelle Heard", img: "images/fiction8.jpg", category: "fiction", price: 10.40 },
    { id: "fiction-9",  title: "The Dinner Party", author: "Freida mcFadden", img: "images/fiction9.webp", category: "fiction", price: 9.75 },
    { id: "fiction-10", title: "Mistborn", author: "Brandon Sanderson", img: "images/fiction10.jpg", category: "fiction", price: 14.50 }
];

const fallbackMysteryThrillerBooks = [
    { id: "mystery-thriller-1", title: "Boardroom Mask", author: "Nicole Fox", img: "images/mystery-thriller1.jpg", category: "mystery-thriller", price: 10.50 },
    { id: "mystery-thriller-2", title: "You Can Tell Me", author: "Melinda Leigh", img: "images/mystery-thriller2.jpg", category: "mystery-thriller", price: 9.90 },
    { id: "mystery-thriller-3", title: "The Final System", author: "Anthony Tardiff", img: "images/mystery-thriller3.jpg", category: "mystery-thriller", price: 11.50 },
    { id: "mystery-thriller-4", title: "The Missing One", author: "A.R.Torre", img: "images/mystery-thriller4.webp", category: "mystery-thriller", price: 11.00 },
    { id: "mystery-thriller-5", title: "The Final Target", author: "Nora Roberts", img: "images/mystery-thriller5.webp", category: "mystery-thriller", price: 12.75 },
    { id: "mystery-thriller-6", title: "The Keeper", author: "Tana French", img: "images/mystery-thriller6.webp", category: "mystery-thriller", price: 12.00 },
    { id: "mystery-thriller-7", title: "Origin", author: "Dan Brown", img: "images/mystery-thriller7.webp", category: "mystery-thriller", price: 13.75 },
    { id: "mystery-thriller-8", title: "God of War", author: "Rina Kent", img: "images/mystery-thriller8.webp", category: "mystery-thriller", price: 12.25 },
    { id: "mystery-thriller-9", title: "Heart of my Monster", author: "Rina Kent", img: "images/mystery-thriller9.jpg", category: "mystery-thriller", price: 12.25 },
    { id: "mystery-thriller-10", title: "Throne of Power", author: "Rina Kent", img: "images/mystery-thriller10.jpg", category: "mystery-thriller", price: 12.25 }
];

const fallbackRomanceBooks = [
    { id: "romance-1", title: "Rites of the Starling", author: "Devney Perry", img: "images/romance1.jpg", category: "romance", price: 9.50 },
    { id: "romance-2", title: "Crown Me Yours", author: "Liv Zander", img: "images/romance2.webp", category: "romance", price: 10.50 },
    { id: "romance-3", title: "Inked in Betrayal", author: "Victoria Paige", img: "images/romance3.jpg", category: "romance", price: 9.00 },
    { id: "romance-4", title: "Trauma Bonded", author: "Jaymin Eve & Tate James", img: "images/romance4.webp", category: "romance", price: 11.25 },
    { id: "romance-5", title: "Beautiful Graves", author: "L.J.Shen", img: "images/romance5.webp", category: "romance", price: 9.75 },
    { id: "romance-6", title: "Law Maker", author: "Susie Tate", img: "images/romance6.webp", category: "romance", price: 9.25 },
    { id: "romance-7", title: "Wicked Sanctuary", author: "Jane Henry", img: "images/romance7.webp", category: "romance", price: 10.25 },
    { id: "romance-8", title: "Love in the Afternoon", author: "Lisa Kleypas", img: "images/romance8.webp", category: "romance", price: 8.00 },
    { id: "romance-9", title: "Variation", author: "Rebecca Yarros", img: "images/romance9.webp", category: "romance", price: 11.00 },
    { id: "romance-10", title: "Keeping 13", author: "Chloe Walsh", img: "images/romance10.webp", category: "romance", price: 12.00 }
];

const fallbackFantasyBooks = [
    { id: "fantasy-1", title: "Fated of the Wolf Maiden", author: "April l.Moon", img: "images/fantasy1.webp", category: "fantasy", price: 12.40 },
    { id: "fantasy-2", title: "King of Gluttony", author: "Ana Huang", img: "images/fantasy2.webp", category: "fantasy", price: 12.75 },
    { id: "fantasy-3", title: "The Nightmare in HIM", author: "Suzanne Wright", img: "images/fantasy3.jpg", category: "fantasy", price: 11.75 },
    { id: "fantasy-4", title: "While the Dark Remains", author: "Joanna Ruth Meyer", img: "images/fantasy4.webp", category: "fantasy", price: 11.00 },
    { id: "fantasy-5", title: "The People's Library", author: "Veronica G.Henry", img: "images/fantasy5.webp", category: "fantasy", price: 13.25 },
    { id: "fantasy-6", title: "The Shattered King", author: "Charlie N.Holmberg", img: "images/fantasy6.webp", category: "fantasy", price: 12.00 },
    { id: "fantasy-7", title: "Rune Breaker", author: "Mila Finch", img: "images/fantasy7.webp", category: "fantasy", price: 14.00 },
    { id: "fantasy-8", title: "Wild Scottish Magic", author: "Tricia O'Malley", img: "images/fantasy8.webp", category: "fantasy", price: 10.50 }
];

const fallbackAllBooks = [ 
    ...fallbackBooks,
    ...fallbackNoveltyBooks,
    ...fallbackFictionBooks,
    ...fallbackMysteryThrillerBooks,
    ...fallbackRomanceBooks,
    ...fallbackFantasyBooks
];

const defaultBookImage = "images/book.jpg"; 

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";
const ADMIN_USER_ID = "admin-local";

let currentUser = null;
let favoriteBookIds = [];
let books = [];
let bookFavoriteCounts = {}; 
let salesChartInstance = null; 

let categories = {
    novelty: [],
    fiction: [],
    mysterythriller: [], 
    romance: [],         
    fantasy: [],          
    announcements: [],
    educational: [],
    other: []
};

function renderBooks(list, containerSelector) {
    const container = document.querySelector(containerSelector);

    if (!container) return;

    container.innerHTML = "";

    list.forEach((book) => {
        const isAdmin = currentUser?.email === ADMIN_EMAIL;
        const isFavorite = favoriteBookIds.includes(String(book.id));
        const favCount = bookFavoriteCounts[String(book.id)] || 0;
        
        const imageUrl = book.img
            ? String(book.img)
            : defaultBookImage;

        const card = document.createElement("div");

        card.className = "book-card";

        card.innerHTML = `
            <div class="book-image">
                <img 
                    src="${imageUrl}" 
                    alt="${book.title}"
                    onerror="this.onerror=null;this.src='${defaultBookImage}';"
                >

                ${isAdmin ? 
                    `<div class="fav-count-badge" title="Total favorites">${favCount}</div>` :
                    `<button 
                        class="heart-btn ${isFavorite ? "active" : ""}"
                        data-book-id="${book.id}"
                        onclick="event.stopPropagation(); toggleFavorite(this)"
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
                        </svg>
                    </button>`
                }
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
        mysterythriller: [],
        romance: [],
        fantasy: [],
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

    case "mystery-thriller":
        categories.mysterythriller.push(book);
        break;

    case "romance":
        categories.romance.push(book);
        break;

    case "fantasy":
        categories.fantasy.push(book);
        break;
}
    });

    console.log("Categorized books:", {
        bestseller: books.length,
        novelty: categories.novelty.length,
        fiction: categories.fiction.length,
        mysterythriller: categories.mysterythriller.length,
        romance: categories.romance.length,
        fantasy: categories.fantasy.length
    });
}

function getAllBooks() {
    return [
        ...books,
        ...categories.novelty,
        ...categories.fiction,
        ...categories.mysterythriller,
        ...categories.romance,
        ...categories.fantasy,
        ...categories.announcements,
        ...categories.educational,
        ...categories.other
    ];
}

async function loadBooks() {
    const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("votes", { ascending: false });

    if (error || !data || !data.length) {
        console.warn("Supabase books load error, using fallback data:", error);

        categorizeBooks(fallbackAllBooks);
        return;
    }

    const normalizedBooks = data.map((book) => ({
        ...book,
        id: book.id != null ? String(book.id) : book.id
    }));

    console.log("Loaded books from Supabase:", normalizedBooks);
    console.log("Novelty books:", normalizedBooks.filter(book => book.category === 'novelty'));
    console.log("Fiction books:", normalizedBooks.filter(book => book.category === 'fiction'));
    console.log("Mystery/Thriller books:", normalizedBooks.filter(book => book.category === 'mystery-thriller'));
    console.log("Romance books:", normalizedBooks.filter(book => book.category === 'romance'));
    console.log("Fantasy books:", normalizedBooks.filter(book => book.category === 'fantasy'));

    categorizeBooks(normalizedBooks);
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

    favoriteBookIds = (data || []).map((item) => String(item.book_id));
}

async function loadAllFavoriteCounts() {
    if (currentUser?.email !== ADMIN_EMAIL) {
        bookFavoriteCounts = {};
        return;
    }
    const { data, error } = await supabase.from("favorites").select("book_id");
    if (error) {
        console.warn("Error loading global favorites count:", error);
        return;
    }
    bookFavoriteCounts = (data || []).reduce((acc, fav) => {
        const bid = String(fav.book_id);
        acc[bid] = (acc[bid] || 0) + 1;
        return acc;
    }, {});
}

function getFavoriteBooks() {
    return getAllBooks().filter(book =>
        favoriteBookIds.includes(String(book.id))
    );
}

function renderFavoritesPage() {
    const container = document.querySelector(".books-row");

    if (!container) return;

    container.innerHTML = "";

    const favoriteBooks = getFavoriteBooks();

    document.querySelector(".background-title").textContent = "Favorites";

    favoriteBooks.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        const imageUrl = book.img || defaultBookImage;

        card.innerHTML = `
            <div class="book-image">
                <img src="${imageUrl}" />
            </div>
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
        `;

        card.onclick = () => openModal(book);

        container.appendChild(card);
    });
}

function showFavoritesPage() {
    if (!currentUser) {
        openAuth("Login required");
        return;
    }

    renderFavoritesPage();
}

function showHomePage() {
    document.querySelector(".background-title").textContent = "Bestsellers";
    renderAll();
}

function handleAdminClick(event) {
    event.preventDefault();
    showAdminPanel();
}

async function showAdminPanel() {
    const isAdmin = currentUser?.email === "admin@gmail.com";
    if (!isAdmin) {
        openAuth("Admin login required", "login");
        return;
    }
    await loadAdminPanel();
    const modal = document.getElementById("adminModal");
    if (modal) modal.style.display = "block";
}

function closeAdminPanel() {
    const modal = document.getElementById("adminModal");
    if (modal) modal.style.display = "none";
    if (window.location.pathname.endsWith("admin.html")) {
        window.location.href = "index.html";
    }
}

async function loadAdminPanel() {
    const info = document.getElementById("adminPanelInfo");
    const content = document.getElementById("adminUsersContent");
    if (!content) return;
    content.innerHTML = "<p>Loading users...</p>";

    const { data: profiles, error } = await supabase
        .from("profiles")
        .select("id, name, username, email");

    if (error) {
        content.innerHTML = `<p>Unable to load users: ${error.message}</p>`;
        return;
    }

    const { data: favorites, error: favError } = await supabase
        .from("favorites")
        .select("user_id");

    if (favError) {
        console.warn("Unable to load favorites count:", favError);
    }

    const favoritesCount = (favorites || []).reduce((acc, favorite) => {
        const userId = String(favorite.user_id);
        acc[userId] = (acc[userId] || 0) + 1;
        return acc;
    }, {});

    const totalUsers = profiles?.length || 0;
    const totalFavorites = (favorites || []).length;
    if (info) {
        info.innerHTML = `
            <div class="admin-info-row"><strong>Total users:</strong> ${totalUsers}</div>
            <div class="admin-info-row"><strong>Total favorites:</strong> ${totalFavorites}</div>
        `;
    }

    if (!profiles || profiles.length === 0) {
        content.innerHTML = "<p>No registered users.</p>";
        return;
    }

    content.innerHTML = "";
    profiles.forEach((profile) => {
        const count = favoritesCount[String(profile.id)] || 0;
        const card = document.createElement("div");
        card.className = "admin-user-card";
        const canDelete = currentUser?.email === "admin@gmail.com" && profile.email !== "admin@gmail.com";
        card.innerHTML = `
            <div class="admin-user-card-header">
                <div>
                    <strong>${profile.name || "No name"}</strong>
                    <p>${profile.username ? `@${profile.username}` : "No username"}</p>
                </div>
                <div>${profile.email || "No email"}</div>
            </div>
            <div class="admin-user-card-info">
                <div><strong>Favorites:</strong> ${count}</div>
            </div>
            <div class="admin-user-card-actions">
                ${canDelete ? `<button class="delete-user-btn" onclick="deleteUser('${profile.id}')">Delete user</button>` : ""}
            </div>
        `;
        content.appendChild(card);
    });
}

async function deleteUser(userId) {
    if (!currentUser || currentUser.email !== "admin@gmail.com") {
        alert("Only admin can delete users.");
        return;
    }

    if (userId === currentUser.id) {
        alert("Admin cannot delete their own account.");
        return;
    }

    const confirmed = confirm("Delete this user and all their favorites? This cannot be undone.");
    if (!confirmed) return;

    const { error: favError } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId);
    if (favError) {
        console.warn("Unable to delete favorites for user:", favError);
    }

    const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);
    if (profileError) {
        alert("Unable to delete user: " + profileError.message);
        return;
    }

    alert("User deleted successfully.");
    await loadAdminPanel();
}

function renderAll() {
    renderBooks(books, ".books-row");
    renderBooks(categories.novelty, ".novelty-row");
    renderBooks(categories.fiction, ".fiction-row");
    renderBooks(categories.mysterythriller, ".mystery-thriller-row");
    renderBooks(categories.romance, ".romance-row");
    renderBooks(categories.fantasy, ".fantasy-row");
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 110;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function handleSearch(query) {
    const q = query.toLowerCase().trim();
    const slider = document.querySelector('.ad-slider');
    
    if (!q) {
        if (slider) slider.style.display = 'block';
        document.querySelectorAll('.section').forEach(s => s.style.display = 'block');
        renderAll();
        return;
    }

    if (slider) slider.style.display = 'none';

    const filterAndRender = (list, selector, sectionId) => {
        const filtered = list.filter(b => 
            b.title.toLowerCase().includes(q) || 
            b.author.toLowerCase().includes(q)
        );
        renderBooks(filtered, selector);
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = filtered.length > 0 ? 'block' : 'none';
        }
    };

    filterAndRender(books, ".books-row", "bestsellers-sec");
    filterAndRender(categories.novelty, ".novelty-row", "novelty-sec");
    filterAndRender(categories.fiction, ".fiction-row", "fiction-sec");
    filterAndRender(categories.mysterythriller, ".mystery-thriller-row", "mystery-sec");
    filterAndRender(categories.romance, ".romance-row", "romance-sec");
    filterAndRender(categories.fantasy, ".fantasy-row", "fantasy-sec");
}

function openModal(book) {
    const modal = document.getElementById("modal");
    const modalImage = document.querySelector(".modal-left img");
    const title = document.querySelector(".modal-title");
    const author = document.querySelector(".modal-author");
    const price = document.querySelector(".modal-price");

    if (!modal || !modalImage || !title || !author) return;

    const imageUrl = book.img ? String(book.img) : defaultBookImage;
    modalImage.src = imageUrl;
    modalImage.onerror = () => {
        modalImage.onerror = null;
        modalImage.src = defaultBookImage;
    };
    title.textContent = book.title;
    author.textContent = `by ${book.author}`;
    
    if (price) {
        price.textContent = `Price: $${(book.price || 11.25).toFixed(2)}`;
    }

    renderSalesChart();

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
    document.body.classList.add('modal-open-book');
    renderSalesChart();
}

function renderSalesChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (salesChartInstance) {
        salesChartInstance.destroy();
    }

    salesChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Sales',
                data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 10),
                backgroundColor: 'rgba(107, 59, 59, 0.2)',
                borderColor: 'rgba(107, 59, 59, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
    document.body.style.overflow = "auto";
    document.body.classList.remove('modal-open-book');
}

function openAuth(message = "", tab = "login") {
    const modal = document.getElementById("authModal");
    const msg = document.getElementById("authMessage");
    if (msg) msg.textContent = message;
    switchTab(tab);
    if (modal) {
        modal.style.display = "flex";
        document.body.classList.add('modal-open-book');
        document.body.style.overflow = "hidden";
    }
}

function closeAuth() {
    const modal = document.getElementById("authModal");
    if (modal) modal.style.display = "none";
    document.body.classList.remove('modal-open-book');
    document.body.style.overflow = "auto";
}

async function ensureProfile(user) {
    if (!user?.id) return;

    const { data: existingById, error: idError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

    if (!idError && existingById) {
        try {
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ last_seen: new Date().toISOString() })
                .eq("id", user.id);
            if (updateError) {
                if (!updateError.message.toLowerCase().includes("last_seen")) {
                    console.warn("Unable to update last seen:", updateError);
                }
            }
        } catch (error) {
            console.warn("Unable to update last seen:", error);
        }
        return;
    }

    const { data: existingByEmail, error: emailError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", user.email)
        .limit(1);

    if (!emailError && existingByEmail && existingByEmail.length > 0) {
        const existing = existingByEmail[0];
        try {
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ last_seen: new Date().toISOString() })
                .eq("id", existing.id);
            if (updateError) {
                if (!updateError.message.toLowerCase().includes("last_seen")) {
                    console.warn("Unable to update last seen for existing email:", updateError);
                }
            }
        } catch (error) {
            console.warn("Unable to update last seen for existing email:", error);
        }
        return;
    }

    const { error } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || null,
        username: user.user_metadata?.username || null
    });

    if (error) {
        console.warn("Unable to ensure profile:", error);
    }
}

async function toggleFavorite(btn) {
    if (!currentUser) {
        openAuth("Login required");
        return;
    }

    const bookId = btn.getAttribute('data-book-id');
    const normalizedBookId = String(bookId);
    const isFavorite = favoriteBookIds.includes(normalizedBookId);
    if (isFavorite) {
        const { error } = await supabase
            .from("favorites")
            .delete()
            .match({ user_id: currentUser.id, book_id: normalizedBookId });
        if (error) {
            console.warn("Unable to remove favorite:", error);
            alert("Could not remove from favorites: " + error.message);
            return;
        }
    } else {
        const { error } = await supabase.from("favorites").insert({
            user_id: currentUser.id,
            book_id: normalizedBookId
        });
        if (error) {
            console.warn("Unable to save favorite:", error);
            alert("Could not add to favorites: " + error.message);
            return;
        }
    }

    await loadFavorites();
    renderAll();

    const favoritesModal = document.getElementById("favoritesModal");
    if (favoritesModal && favoritesModal.style.display === "block") {
        renderFavoritesModalContent();
    }
}

function showFavoritesModal() {
    if (!currentUser) {
        openAuth("To view favorites, login required", "login");
        return;
    }

    const modal = document.getElementById("favoritesModal");
    if (!modal) return;

    modal.style.display = "block";
    document.body.classList.add('modal-open-book');
    document.body.style.overflow = "hidden"; 

    renderFavoritesModalContent();
}

function renderFavoritesModalContent() {
    const container = document.querySelector(".favorites-books-row");
    const messageNode = document.querySelector(".favorites-modal-message");
    if (!container || !messageNode) return;

    const favoriteBooks = getAllBooks().filter((book) => favoriteBookIds.includes(String(book.id)));
    container.innerHTML = "";

    if (favoriteBooks.length === 0) {
        messageNode.textContent = "No favorites yet. Add a book by clicking the heart icon.";
        return;
    }

    messageNode.textContent = "Your favorite books:";

    favoriteBooks.forEach((book) => {
        const card = document.createElement("div");
        card.className = "book-card";
        const imageUrl = book.img ? String(book.img) : defaultBookImage;
        card.innerHTML = `
            <div class="book-image">
                <img 
                    src="${imageUrl}" 
                    alt="${book.title}"
                    onerror="this.onerror=null;this.src='${defaultBookImage}';"
                >
                <button 
                    class="heart-btn active"
                    data-book-id="${book.id}"
                    onclick="event.stopPropagation(); toggleFavorite(this)"
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
                    </svg>
                </button>
            </div>
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
        `;
        card.onclick = () => openModal(book);
        container.appendChild(card);
    });
}

function closeFavoritesModal() {
    const modal = document.getElementById("favoritesModal");
    if (modal) {
        modal.style.display = "none";
    }
    document.body.classList.remove('modal-open-book'); 
    document.body.style.overflow = "auto"; 
}

async function login() {
    const email = document.getElementById("loginEmail")?.value.trim();
    const pass = document.getElementById("loginPassword")?.value.trim();
    const messageNode = document.getElementById("authMessage");

    if (!email || !pass) {
        if (messageNode) messageNode.textContent = "Fill in all fields";
        return;
    }

    if (email.toLowerCase() === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
        currentUser = {
            id: ADMIN_USER_ID,
            email: ADMIN_EMAIL,
            user_metadata: {
                name: "Admin",
                username: "admin"
            }
        };
        saveAdminSession();
        await loadFavorites();
        await loadAllFavoriteCounts();
        updateUI();
        renderAll();
        closeAuth();
        if (messageNode) messageNode.textContent = "Admin successfully signed in.";
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

    if (error.message.includes("Email not confirmed")) {
    messageNode.textContent = "Confirm your email or contact the administrator.";
    return;
}

    currentUser = data.user;
    if (currentUser?.email?.toLowerCase() === ADMIN_EMAIL) {
        saveAdminSession();
    } else {
        clearAdminSession();
    }
    await ensureProfile(currentUser);
    await updateLastSeen(currentUser?.id);
    await loadFavorites();
    if (currentUser?.email === ADMIN_EMAIL) await loadAllFavoriteCounts();
    updateUI();
    renderAll();
    closeAuth();
    alert("Logged in successfully!");
}

async function updateLastSeen(userId) {
    if (!userId) return;
    try {
        const { error } = await supabase
            .from("profiles")
            .update({ last_seen: new Date().toISOString() })
            .eq("id", userId);
        if (error) {
            if (!error.message.toLowerCase().includes("last_seen")) {
                console.warn("Unable to update last seen:", error);
            }
        }
    } catch (error) {
        console.warn("Unable to update last seen:", error);
    }
}

async function createProfile(userId, name, username, email) {
    const { error } = await supabase.from("profiles").upsert(
        {
            id: userId,
            name,
            username,
            email
        },
        { onConflict: "id" }
    );
    if (error) {
        console.warn("Unable to create profile:", error);
        return false;
    }
    return true;
}

function getRegisterErrorMessage(error) {
    if (!error || !error.message) return "Registration failed. Please try again.";
    const text = error.message.toLowerCase();
    if (text.includes("rate limit") || text.includes("email rate limit")) {
        return "There is a temporary delay in registration. Try logging in via Login or wait a few minutes.";
    }
    if (text.includes("already registered") || text.includes("already exists") || text.includes("duplicate")) {
        return "This email is already registered. Try logging in via Login.";
    }
    return error.message;
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
        if (email.toLowerCase() === ADMIN_EMAIL) {
            if (messageNode) messageNode.textContent = "Admin does not need to register. Use admin login credentials on the Login tab.";
            switchTab("login");
            return;
        }
        if (messageNode) messageNode.textContent = getRegisterErrorMessage(error);
        return;
    }

    if (data?.user) {
        const created = await createProfile(data.user.id, name, username, email);
        if (!created) {
            if (messageNode) messageNode.textContent = "User created, but profile could not be saved to the table.";
            return;
        }
        currentUser = data.user;
        await ensureProfile(currentUser);
        await updateLastSeen(currentUser.id);
        await loadFavorites();
        updateUI();
        renderAll();
        closeAuth();
        return;
    }

    if (messageNode) messageNode.textContent = "Registration successful. Please login to continue.";
    switchTab("login");
}

function saveAdminSession() {
    if (!window.localStorage) return;
    localStorage.setItem("adminSession", "true");
}

function loadAdminSession() {
    if (!window.localStorage) return null;
    const isAdmin = localStorage.getItem("adminSession") === "true";
    if (!isAdmin) return null;
    return {
        id: ADMIN_USER_ID,
        email: ADMIN_EMAIL,
        user_metadata: {
            name: "Admin",
            username: "admin"
        }
    };
}

function clearAdminSession() {
    if (!window.localStorage) return;
    localStorage.removeItem("adminSession");
}

async function getProfileByEmail(email) {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .limit(1);

    if (error || !data || data.length === 0) return null;
    return data[0];
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
    window.location.href = "admin.html";
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
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.warn("Error signing out:", error);
        }
    } catch (err) {
        console.warn("Sign out failed:", err);
    }

    currentUser = null;
    favoriteBookIds = [];
    clearAdminSession();
    updateUI();
    renderAll();
    window.location.href = "index.html";
}

async function init() {
    const { data } = await supabase.auth.getSession();
    currentUser = data?.session?.user ?? loadAdminSession();
    await loadBooks();
    if (currentUser) {
        await ensureProfile(currentUser);
        await loadFavorites();
        if (currentUser.email === ADMIN_EMAIL) await loadAllFavoriteCounts();
    }
    renderAll();
    updateUI();

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
        currentUser = session?.user ?? null;
        if (currentUser) {
            await ensureProfile(currentUser);
            await loadFavorites();
            if (currentUser.email === ADMIN_EMAIL) await loadAllFavoriteCounts();
        } else {
            favoriteBookIds = [];
        }
        renderAll();
        updateUI();
    });
}

function showCreateUserForm() {
    if (!currentUser || currentUser.email !== "admin@gmail.com") {
        alert("Only admin can create users");
        return;
    }
    const form = document.getElementById("createUserForm");
    if (form) form.style.display = "block";
}

function hideCreateUserForm() {
    const form = document.getElementById("createUserForm");
    if (form) form.style.display = "none";
}

function clearCreateUserForm() {
    document.getElementById("createName").value = "";
    document.getElementById("createUsername").value = "";
    document.getElementById("createEmail").value = "";
    document.getElementById("createPassword").value = "";
}

async function createUser() {
    if (!currentUser || currentUser.email !== "admin@gmail.com") {
        alert("Only admin can create users");
        return;
    }

    const name = document.getElementById("createName")?.value.trim();
    const username = document.getElementById("createUsername")?.value.trim();
    const email = document.getElementById("createEmail")?.value.trim();
    const password = document.getElementById("createPassword")?.value.trim();

    if (!name || !username || !email || !password) {
        alert("Fill in all fields");
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            alert("Error creating user: " + error.message);
            return;
        }

        if (data.user) {
            const created = await createProfile(
                data.user.id,
                name,
                username,
                email
            );

            if (!created) {
                alert("User created in auth, but profile was not saved.");
                return;
            }

            alert("User created successfully");

            hideCreateUserForm();
            clearCreateUserForm();

            await loadAdminPanel();
        }

    } catch (err) {
        console.error("Error creating user:", err);
        alert("Error creating user");
    }
}

window.openAuth = openAuth;
window.closeAuth = closeAuth;
window.toggleFavorite = toggleFavorite;
window.showFavoritesModal = showFavoritesModal;
window.closeFavoritesModal = closeFavoritesModal;
window.login = login;
window.register = register;
window.showUsers = showUsers;
window.logout = logout;
window.switchTab = switchTab;
window.openModal = openModal;
window.scrollToSection = scrollToSection;
window.closeModal = closeModal;
window.closeUsersModal = closeUsersModal;
window.handleAdminClick = handleAdminClick;
window.showCreateUserForm = showCreateUserForm;
window.hideCreateUserForm = hideCreateUserForm;
window.createUser = createUser;
window.clearCreateUserForm = clearCreateUserForm;
window.deleteUser = deleteUser;
window.closeAdminPanel = closeAdminPanel;
window.addEventListener("DOMContentLoaded", init);
