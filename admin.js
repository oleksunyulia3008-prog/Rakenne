import { supabase } from "./supabaseClient.js";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_USER_ID = "admin-local";
const DEFAULT_BOOK_IMAGE = "images/book.jpg";

function formatDate(value) {
    if (!value) return "No data";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "No data";
    return date.toLocaleString("uk-UA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
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

function goBack() {
    window.location.href = "index.html";
}

function showSection(sectionName) {
    // Hide all sections first
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    // Show the requested section
    const targetSection = document.getElementById(`${sectionName}Section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Update active class for navigation links
    document.querySelectorAll('.header-bottom a').forEach(link => {
        link.classList.remove('active-admin-nav');
    });
    const activeLink = document.getElementById(`adminNav${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`);
    if (activeLink) {
        activeLink.classList.add('active-admin-nav');
    }
}

async function initAdmin() {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user ?? loadAdminSession(); // Завантажуємо сесію або локального адміна
    if (!user || user.email !== ADMIN_EMAIL) {
        window.location.href = "index.html";
        return;
    }

    const info = document.getElementById("adminInfo");
    const usersListElement = document.getElementById("usersList");
    const booksListElement = document.getElementById("adminBooksList");

    if (usersListElement) usersListElement.innerHTML = "<p>Loading users...</p>";
    if (booksListElement) booksListElement.innerHTML = "<p>Loading analytics...</p>";

    // Set default view to users and highlight the link
    showSection('users');

    // Fetch all necessary data
    const { data: profiles, error: profileErr } = await supabase.from("profiles").select("*").order("email", { ascending: true });
    const { data: books, error: bookErr } = await supabase.from("books").select("*");
    const { data: favorites, error: favErr } = await supabase.from("favorites").select("user_id, book_id");

    if (profileErr) {
        if (usersListElement) usersListElement.innerHTML = `<p>Error: ${profileErr.message}</p>`;
        return;
    }

    // Calculate statistics
    const userFavsCount = (favorites || []).reduce((acc, fav) => {
        const userId = String(fav.user_id);
        acc[userId] = (acc[userId] || 0) + 1;
        return acc;
    }, {});

    const bookFavsCount = (favorites || []).reduce((acc, fav) => {
        const bookId = String(fav.book_id);
        acc[bookId] = (acc[bookId] || 0) + 1;
        return acc;
    }, {});

    const totalUsers = profiles?.length || 0;
    const totalBooks = books?.length || 0;
    const totalFavorites = (favorites || []).length;
    if (info) {
        info.innerHTML = `
            <div class="admin-info-row"><strong>Admin:</strong> ${user.email}</div>
            <div class="admin-info-row"><strong>Total users:</strong> ${totalUsers}</div>
            <div class="admin-info-row"><strong>Total books:</strong> ${totalBooks}</div>
            <div class="admin-info-row"><strong>Total favorites:</strong> ${totalFavorites}</div>
        `;
    }

    if (!profiles || profiles.length === 0) {
        usersListElement.innerHTML = "<p>No registered users.</p>";
        return;
    }

    if (usersListElement) usersListElement.innerHTML = "";
    profiles.forEach((profile) => {
        const count = userFavsCount[String(profile.id)] || 0;
        const card = document.createElement("div");
        card.className = "admin-user-card";
        const canDelete = user?.email === ADMIN_EMAIL && profile.email !== ADMIN_EMAIL;
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
                <div><strong>Last seen:</strong> ${formatDate(profile.last_seen)}</div>
                <div><strong>Registered:</strong> ${formatDate(profile.created_at)}</div>
            </div>
            <div class="admin-user-card-actions">
                ${canDelete ? `<button class="delete-user-btn" onclick="deleteUser('${profile.id}')">Delete user</button>` : ""}
            </div>
        `;
        usersListElement.appendChild(card);
    });

    // Render Books Analytics
    if (booksListElement) {
        booksListElement.innerHTML = "";
        if (!books || books.length === 0) {
            booksListElement.innerHTML = "<p>No books found.</p>";
        } else {
           books.forEach(book => {
    const count = bookFavsCount[String(book.id)] || 0;
    const card = document.createElement("div");
    card.className = "admin-book-stat-card";
    card.innerHTML = `
        <div class="admin-book-stat-info">
            <strong>${book.title}</strong>
            <p>${book.author}</p>
            <div class="fav-indicator">
                <svg viewBox="0 0 24 24" fill="#6b3b3b" width="18">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
                </svg>
                <span>Added by <b>${count}</b> users</span>
            </div>
        </div>
    `;
    booksListElement.appendChild(card);
});

        }
    }
}

async function deleteUser(userId) {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user ?? loadAdminSession();

    if (!user || user.email !== ADMIN_EMAIL) {
        alert("Only admin can delete users.");
        return;
    }

    if (userId === user.id) {
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
    await initAdmin(); // Перезавантажуємо адмін-панель
}

async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem("adminSession");
    window.location.href = "index.html";
}

window.logout = logout;
window.goBack = goBack;
window.showSection = showSection;
window.deleteUser = deleteUser; // Зробити доступною глобально для кнопки
window.addEventListener("DOMContentLoaded", initAdmin);
