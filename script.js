
function getInputValue() {
    return document.getElementById("inputbox").value;
}

async function fetchData() {
    const response = await fetch("https://pbivizedit.com/api/visuals");

    const data = await response.json()

    const displayData = data.items;

    // console.log(displayData)

    let search = getInputValue().toLowerCase();

    const filteredData = displayData.filter(item => item.name.toLowerCase().startsWith(search));

    console.log(filteredData)

    document.getElementById("content").innerHTML = ''

    filteredData?.map((item) => {
        const card = document.createElement("div")
        card.className = "card"

        const cardTitle = document.createElement("h3")
        cardTitle.textContent = item.name

        const cardDescription = document.createElement("p")
        cardDescription.textContent = item.description

        const cardImage = document.createElement("img")
        cardImage.src = item.imagePath

        card.appendChild(cardImage);
        card.appendChild(cardTitle)
        card.appendChild(cardDescription)

        document.getElementById("content").appendChild(card);
    })
}

fetchData();

