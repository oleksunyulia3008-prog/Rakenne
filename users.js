import { supabase } from "./supabaseClient.js";

async function initUsers() {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;
    const container = document.getElementById("usersList");

    if (!user || user.email !== "admin@gmail.com") {
        window.location.href = "index.html";
        return;
    }

    const { data: profiles, error } = await supabase.from("profiles").select("id, name, username, email");
    if (error) {
        console.warn("Failed to load profiles:", error);
        if (container) container.innerHTML = "<p>Unable to load users.</p>";
        return;
    }

    if (!container) return;
    container.innerHTML = "";

    if (!profiles || !profiles.length) {
        container.innerHTML = "<p>No users found.</p>";
        return;
    }

    profiles.forEach((profile) => {
        const div = document.createElement("div");
        div.className = "user-card";
        div.innerHTML = `
            <h3>${profile.name || "No name"}</h3>
            <p>${profile.username || ""}</p>
            <p>${profile.email || ""}</p>
            <button onclick="deleteUser('${profile.id}')">Delete</button>
        `;
        container.appendChild(div);
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

window.deleteUser = deleteUser;
window.goBack = goBack;
window.addEventListener("DOMContentLoaded", initUsers);
