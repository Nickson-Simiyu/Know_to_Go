document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        console.log(`Highlighted text: ${selectedText}`);
        chrome.runtime.sendMessage({ word: selectedText });
    }
});