const filter = fetchData();
onSearchClick();

function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = item.name;

    const cardDescription = document.createElement("p");
    cardDescription.textContent = item.description;

    const cardImage = document.createElement("img");
    cardImage.src = item.imagePath;

    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    return card;
}

async function onSearchClick() {
    const searchText = getInputValue("inputbox").toLowerCase();
    let container = document.getElementById("content");
    const filteredData = await filter.filter(searchText);
    displayItems(container, filteredData, createCard);
}

function displayItems(container, items, cardFactory) {
    clearDOM(container);
    items.forEach(item => {
        const card = cardFactory(item);
        container.appendChild(card);
    });
}

function clearDOM(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function getInputValue(itemId) {
    return document.getElementById(itemId).value;
}

function fetchData() {
    let data = null;

    return {
        async filter(searchText) {
            if (!data) {
                const response = await fetch("https://pbivizedit.com/api/visuals");
                const json = await response.json();
                data = json.items;
            }
            return (data ?? []).filter(item => item.name?.toLowerCase().includes(searchText ?? ""));
        }
    }
}