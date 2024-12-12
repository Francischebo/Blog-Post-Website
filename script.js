document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById("auth-form");
    const postForm = document.getElementById("post-form");
    const commentForm = document.getElementById("comment-form");
    const blogList = document.querySelector(".blog-list");
    const commentList = document.querySelector(".comment-list");

    const API_URL = "http://localhost:3000";

    // User Login
    authForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert("Error logging in.");
        }
    });

    // Create/Edit Post
    postForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = e.target["post-title"].value;
        const content = e.target["post-content"].value;

        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });
            const data = await response.json();
            alert("Post created successfully!");
            loadBlogs();
        } catch (error) {
            alert("Error creating post.");
        }
    });

    // Add Comment
    commentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;

        try {
            const response = await fetch(`${API_URL}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment }),
            });
            const data = await response.json();
            alert("Comment added successfully!");
            loadComments();
        } catch (error) {
            alert("Error adding comment.");
        }
    });

    // Load Blogs
    async function loadBlogs() {
        try {
            const response = await fetch(`${API_URL}/posts`);
            const posts = await response.json();
            blogList.innerHTML = posts.map(post => `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                </div>
            `).join('');
        } catch (error) {
            blogList.innerHTML = "<p>Error loading posts.</p>";
        }
    }

    // Load Comments
    async function loadComments() {
        try {
            const response = await fetch(`${API_URL}/comments`);
            const comments = await response.json();
            commentList.innerHTML = comments.map(comment => `
                <p>${comment.text}</p>
            `).join('');
        } catch (error) {
            commentList.innerHTML = "<p>Error loading comments.</p>";
        }
    }

    loadBlogs();
    loadComments();
});
