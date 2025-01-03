chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.word) {
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${message.word}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
            if (data && data.length > 0) {
                const wordData = data[0];
                const definition = wordData.meanings[0].definitions[0].definition;
                const pronunciation = wordData.phonetics[0]?.text || "No pronunciation available";
                const synonyms = wordData.meanings[0]?.synonyms || [];
    
                const synonymsText = synonyms.length > 0
                ? `Synonyms: ${synonyms.slice(0, 5).join(", ")}`
                : "No synonyms available.";
    
                const message = `${definition}\n\nPronunciation: ${pronunciation}\n\n${synonymsText}`;
                showPopup(message, message.word);
            } else {
                showPopup("Definition not found.", message.word);
            }
            })
            .catch(error => {
            console.error("Error fetching definition:", error);
            showPopup("Error fetching definition.", message.word);
        });
    }
});
function showPopup(message, word) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: `Definition of "${word}"`,
        message: message
    });
}