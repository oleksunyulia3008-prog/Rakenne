import { supabase } from "./supabaseClient.js";
import { formatDate, storageHelper, ADMIN_EMAIL, ADMIN_USER_ID } from "./helpers.js";

const DEFAULT_BOOK_IMAGE = "images/book.jpg";

let loadedBooks = [];
const loadAdminSession = storageHelper.loadAdminSession;

function goBack() {
    window.location.href = "index.html";
}

function showSection(sectionName) {
   
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
  
    const targetSection = document.getElementById(`${sectionName}Section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

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
    const user = data?.session?.user ?? loadAdminSession();
    if (!user || user.email !== ADMIN_EMAIL) {
        window.location.href = "index.html";
        return;
    }

    const info = document.getElementById("adminInfo");
    const usersListElement = document.getElementById("usersList");
    const booksListElement = document.getElementById("adminBooksList");

    if (usersListElement) usersListElement.innerHTML = "<p>Loading users...</p>";
    if (booksListElement) booksListElement.innerHTML = "<p>Loading analytics...</p>";

    showSection('books'); 

    const { data: profiles, error: profileErr } = await supabase.from("profiles").select("*").order("email", { ascending: true });
    const { data: books, error: bookErr } = await supabase.from("books").select("*");
    loadedBooks = books || [];
    const { data: favorites, error: favErr } = await supabase.from("favorites").select("user_id, book_id");

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

    if (profileErr) {
        if (usersListElement) usersListElement.innerHTML = `<p>Error loading users: ${profileErr.message}</p>`;
    } else if (!profiles || profiles.length === 0) {
        if (usersListElement) usersListElement.innerHTML = "<p>No registered users.</p>";
    } else {
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
    }

    if (booksListElement) {
        booksListElement.innerHTML = "";
        if (bookErr) {
            booksListElement.innerHTML = `<p>Error loading analytics: ${bookErr.message}</p>`;
        } else if (!books || books.length === 0) {
            booksListElement.innerHTML = "<p>No books found.</p>";
        } else {
            books.forEach(book => {
                const count = bookFavsCount[String(book.id)] || 0;
                const card = document.createElement("div");
                card.className = "admin-book-stat-card";
                const price = typeof book.price === 'number' ? book.price : 0;
                card.innerHTML = `
                    <div class="admin-book-stat-info">
                        <strong>${book.title}</strong>
                        <p>${book.author} | <small>${book.category || 'other'}</small></p>
                        <div class="fav-indicator">
                            <svg viewBox="0 0 24 24" fill="#6b3b3b" width="18">
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
                            </svg>
                            <span>Favorites: <b>${count}</b></span>
                            <span style="margin-left: 15px; color: #444;">Price: <b>$${price.toFixed(2)}</b></span>
                        </div>
                    </div>
                    <div class="admin-book-actions">
                        <button class="edit-book-btn" onclick="openEditBookModal('${book.id}')">Edit info</button>
                        <button class="delete-user-btn" style="padding: 6px 12px; margin-left: 5px;" onclick="deleteBook('${book.id}')">Delete</button>
                    </div>
                `;
                booksListElement.appendChild(card);
            });
        }
    }
}

function openEditBookModal(bookId) {
    const book = loadedBooks.find(b => String(b.id) === String(bookId));
    if (!book) return;

    document.getElementById("editBookId").value = book.id;
    document.getElementById("editTitle").value = book.title;
    document.getElementById("editAuthor").value = book.author;
    document.getElementById("editPrice").value = book.price || 0;
    document.getElementById("editCategory").value = book.category || 'other';
    document.getElementById("editImg").value = book.img || '';
    
    document.getElementById("editBookModal").style.display = "block";
}

function closeEditBookModal() {
    document.getElementById("editBookModal").style.display = "none";
}

async function saveBookChanges() {
    const id = document.getElementById("editBookId").value;
    const updates = {
        title: document.getElementById("editTitle").value,
        author: document.getElementById("editAuthor").value,
        price: parseFloat(document.getElementById("editPrice").value),
        category: document.getElementById("editCategory").value,
        img: document.getElementById("editImg").value
    };

    const { error } = await supabase
        .from("books")
        .update(updates)
        .eq("id", id);

    if (error) {
        alert("Error updating book: " + error.message);
    } else {
        alert("Book updated successfully!");
        closeEditBookModal();
        await initAdmin();
    }
}

async function addNewBook() {
    const id = document.getElementById("addBookId").value.trim();
    const title = document.getElementById("addBookTitle").value.trim();
    const author = document.getElementById("addBookAuthor").value.trim();
    const img = document.getElementById("addBookImg").value.trim();
    const category = document.getElementById("addBookCategory").value.trim();
    const price = parseFloat(document.getElementById("addBookPrice").value);

    if (!id || !title || !author || !category || isNaN(price)) {
        alert("Please fill in all required fields (ID, Title, Author, Category, Price).");
        return;
    }

    const newBook = {
        id: id,
        title: title,
        author: author,
        img: img || DEFAULT_BOOK_IMAGE,
        category: category,
        price: price
    };

    const { error } = await supabase
        .from("books")
        .insert([newBook]);

    if (error) {
        alert("Error adding book: " + error.message);
    } else {
        alert("Book added successfully!");
        document.getElementById("addBookForm").reset();
        await initAdmin();
        showSection('books'); 
    }
}

async function deleteBook(bookId) {
    const confirmed = confirm("Are you sure you want to delete this book? This will also remove it from all users' favorites.");
    if (!confirmed) return;

    const { error } = await supabase.from("books").delete().eq("id", bookId);
    if (error) {
        alert("Error deleting book: " + error.message);
    } else {
        alert("Book deleted successfully.");
        await initAdmin();
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
    await initAdmin(); 
}

async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem("adminSession");
    window.location.href = "index.html";
}

window.logout = logout;
window.goBack = goBack;
window.showSection = showSection;
window.deleteUser = deleteUser; 
window.openEditBookModal = openEditBookModal;
window.closeEditBookModal = closeEditBookModal;
window.saveBookChanges = saveBookChanges;
window.addNewBook = addNewBook;
window.deleteBook = deleteBook;
window.addEventListener("DOMContentLoaded", initAdmin);
