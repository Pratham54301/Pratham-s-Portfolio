(function() {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();
const blogs = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    title: `${i % 3 === 0 ? "⚛️ React Tips" : i % 3 === 1 ? "🎨 CSS Tricks" : "📱 Frontend Skills"} - Blog ${i + 1}`,
    date: `May ${String(i + 1).padStart(2, '0')}, 2025`,
    category: i % 3 === 0 ? "React" : i % 3 === 1 ? "CSS" : "Frontend",
    paragraph: [
        `1. Intro to ${i % 3 === 0 ? "React" : i % 3 === 1 ? "CSS" : "Frontend"} - Blog ${i + 1}`,
        `2. Key concepts of ${i % 3 === 0 ? "React" : i % 3 === 1 ? "CSS" : "Frontend"}`,
        `3. Real-world uses and examples`,
        `4. Advanced techniques discussed`,
        `5. Final thoughts on improvement`
    ].join(" "),
    authorImg: `https://i.pravatar.cc/30?img=${(i % 70) + 1}`,
    authorName: `Author ${i + 1}`,
    tags: ["Tips", "2025", "Web"].slice(0, (i % 3) + 1).join(', ')
}));

let currentIndex = 0;
const pageSize = 6;

function loadMoreBlogs() {
    const container = document.getElementById('blogGrid');
    const end = currentIndex + pageSize;
    const filteredBlogs = getFilteredBlogs().slice(currentIndex, end);
    filteredBlogs.forEach(blog => {
        const link = document.createElement('a');
        link.href = `blog-detail.html?id=${blog.id}`;
        link.className = 'blog-card';
        link.innerHTML = `
      <h3>${blog.title}</h3>
      <p class="date">Posted on ${blog.date}</p>
      <p class="description">${blog.paragraph}</p>
      <div class="author">
        <img src="${blog.authorImg}" alt="Author">
        <span>${blog.authorName}</span>
      </div>
      <div class="tags">Tags: ${blog.tags}</div>
    `;
        container.appendChild(link);
    });
    currentIndex += pageSize;
}

function getFilteredBlogs() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    if (selectedCategory === 'all') return blogs;
    return blogs.filter(blog => blog.category === selectedCategory);
}

document.getElementById('categoryFilter').addEventListener('change', () => {
    document.getElementById('blogGrid').innerHTML = '';
    currentIndex = 0;
    loadMoreBlogs();
});

loadMoreBlogs();