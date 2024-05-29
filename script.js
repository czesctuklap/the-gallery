const accessKey = 'insert consent key here';

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreButton = document.getElementById("show-more-button");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=9`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
            const results = data.results;

            // Clear previous search results
            searchResult.innerHTML = "";

            results.forEach((result) => {
                // Create a container for each image and link
                const container = document.createElement("div");

                // Create an image element
                const image = document.createElement("img");
                image.src = result.urls.small;

                // Create a link element
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";
                imageLink.appendChild(image);

                // Append the container to the search result
                searchResult.appendChild(container);

                // Append the image link to the container
                container.appendChild(imageLink);
            });
        } else {
            console.error('Brak wyników w odpowiedzi z API Unsplash');
        }
    } catch (error) {
        console.error('Błąd podczas pobierania danych z API Unsplash', error);
    }
    showMoreButton.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    page++;
    searchImages();
});
