import { supabase } from "./supabaseClient.js";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_USER_ID = "admin-local";

async function initUsers() {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user ?? loadAdminSession();
    const container = document.getElementById("usersList");

    if (!user || user.email !== ADMIN_EMAIL) {
        window.location.href = "index.html";
        return;
    }

    const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("email", { ascending: true });
    if (error) {
        console.warn("Failed to load profiles:", error);
        if (container) container.innerHTML = "<p>Unable to load users.</p>";
        return;
    }

    const { data: favorites, error: favError } = await supabase
        .from("favorites")
        .select("user_id");

    if (favError) {
        console.warn("Failed to load favorites:", favError);
    }

    const favoritesCount = (favorites || []).reduce((acc, favorite) => {
        const userId = String(favorite.user_id);
        acc[userId] = (acc[userId] || 0) + 1;
        return acc;
    }, {});

    if (!container) return;
    container.innerHTML = "";

    if (!profiles || !profiles.length) {
        container.innerHTML = "<p>No users found.</p>";
        return;
    }

    profiles.forEach((profile) => {
        const count = favoritesCount[String(profile.id)] || 0;
        const card = document.createElement("div");
        card.className = "admin-user-card";
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
        `;
        container.appendChild(card);
    });
}

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

async function deleteUser(id) {
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
        alert("Unable to delete user.");
        console.warn(error);
        return;
    }
    await initUsers();
}

function goBack() {
    window.location.href = "index.html";
}

async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.warn("Error signing out:", error);
    }
    window.location.href = "index.html";
}

window.deleteUser = deleteUser;
window.goBack = goBack;
window.logout = logout;

function loadAdminSession() {
    if (!window.localStorage) return null;
    const isAdmin = localStorage.getItem("adminSession") === "true";
    if (!isAdmin) return null;
    return {
        id: ADMIN_USER_ID,
        email: ADMIN_EMAIL,
        user_metadata: { name: "Admin", username: "admin" }
    };
}
window.addEventListener("DOMContentLoaded", initUsers);
