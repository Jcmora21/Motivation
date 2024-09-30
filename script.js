const quotes = [
    "A vida é 10% o que acontece e 90% como reagimos a isso.",
    "A única maneira de fazer um excelente trabalho é amar o que você faz.",
    "Você é nunca muito velho para definir outra meta ou sonhar um novo sonho.",
    "Acredite que você pode e você já está no meio do caminho.",
    "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "Não importa o quão lentamente você vá, desde que você não pare.",
    "A única limitação que você tem é a que você se impõe.",
    "A vida é feita de escolhas, e suas escolhas fazem sua vida.",
    "Se você quer algo que nunca teve, precisa fazer algo que nunca fez."
];

let currentQuote = "";

// Função para gerar uma citação aleatória
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    document.getElementById("quote").value = currentQuote;
    document.getElementById("saveFavorite").style.display = "inline-block"; // Exibir botão "Salvar Favorito"
}

// Função para salvar a citação nos favoritos
function saveFavorite() {
    if (!currentQuote) {
        alert("Por favor, gere uma citação primeiro!");
        return; // Não faz nada se não houver citação gerada
    }

    const favoritesList = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favoritesList.includes(currentQuote)) {
        favoritesList.push(currentQuote);
        localStorage.setItem("favorites", JSON.stringify(favoritesList));
        displayFavorites();
    } else {
        alert("Esta citação já está nos favoritos!");
    }
}

// Função para exibir as citações favoritas
function displayFavorites() {
    const favoritesList = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesContainer = document.getElementById("favoriteQuotes");
    favoritesContainer.innerHTML = ""; // Limpa a lista antes de exibir

    favoritesList.forEach((quote) => {
        const li = document.createElement("li");
        li.textContent = quote;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.classList.add("remove");
        removeButton.onclick = () => removeFavorite(quote);

        li.appendChild(removeButton);
        favoritesContainer.appendChild(li);
    });
}

// Função para remover uma citação dos favoritos
function removeFavorite(quoteToRemove) {
    let favoritesList = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesList = favoritesList.filter(quote => quote !== quoteToRemove);
    localStorage.setItem("favorites", JSON.stringify(favoritesList));
    displayFavorites();
}

// Função para definir a notificação
function setNotification() {
    const frequency = document.getElementById("notificationFrequency").value;
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    setInterval(() => {
        if (Notification.permission === "granted") {
            const notification = new Notification("Citação do Dia", {
                body: currentQuote || "Clique em 'Citação Seguinte' para gerar uma citação!",
            });
        }
    }, frequency);
}

// Adicionando event listeners
document.getElementById("generateQuote").addEventListener("click", generateQuote);
document.getElementById("saveFavorite").addEventListener("click", saveFavorite);
document.getElementById("setNotification").addEventListener("click", setNotification);

// Gerar uma citação ao carregar a página
window.onload = function() {
    generateQuote();
    displayFavorites(); // Exibir citações favoritas ao carregar a página
}
