const API_KEY = "6b31d529fbe84cf7b419d4e8125e3d7e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// const searchButton = document.getElementById("search-button");
// const searchText = document.getElementById("search-text");

// searchButton.addEventListener("click", () => {
//     const query = searchText.value;
//     if (!query) return;
//     fetchNews(query);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = null;
// });
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
const overlay = document.getElementById("overlay");
const searchResultText = document.querySelector(".search-result h1");
const initialResultText = searchResultText.textContent; // Store the initial text

// Function to perform search
function performSearch() {
    // Show loading overlay with blur effect
    overlay.classList.add("loading");
    overlay.style.display = "block";

    const query = searchText.value.trim(); // Trim to remove leading/trailing spaces
    if (!query) {
        // Hide loading overlay after a short delay
        setTimeout(() => {
            overlay.classList.remove("loading");
            overlay.style.display = "none";
        }, 500);
        return;
    }

    // Update search result text with the query
    searchResultText.textContent = `Your search results for "${query}"`;
    
    // Reduce font size of search result text
    searchResultText.style.fontSize = "60px"; // Adjust font size as needed

    // Simulate a delay with setTimeout
    setTimeout(() => {
        // Hide loading overlay after the delay
        overlay.style.display = "none";

        // Scroll smoothly to the page-2 section
        const page2Section = document.getElementById("page-2");
        const offsetTop = page2Section.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });

        // Remove blur effect after the scroll animation is complete
        setTimeout(() => {
            overlay.classList.remove("loading");
        }, 1000); // Adjust this value according to your smooth scroll duration
    }, 1000);
}

// Event listener for search button click
searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission
    performSearch();
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

// Event listener for Enter key press in search text input
searchText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { // Check if Enter key is pressed
        event.preventDefault(); // Prevent default form submission
        performSearch();
        const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
    }
});

// Event listener for navigation links
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
        // Reset search result text and font size
        searchResultText.textContent = link.textContent;
        searchResultText.style.fontSize = "80px";
    });
});

// Restore initial search result text after page reload
window.addEventListener("load", () => {
    searchResultText.textContent = initialResultText;
});



// const searchButton = document.getElementById("search-button");
// const searchText = document.getElementById("search-text");

// searchButton.addEventListener("click", () => {
//     const query = searchText.value;
//     if (!query) return;
//     fetchNews(query);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = null;
// });
