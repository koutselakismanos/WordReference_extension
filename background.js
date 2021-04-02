chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({"title": "Wordreference", "id": "parent", contexts: ['selection']});

});

chrome.contextMenus.onClicked.addListener((event) => {
    if (event != null) {
        goToWordReference(event.selectionText)
    }
})

const translate = async (word, from = 'en', to = 'gr') => {
    const url = `http://www.wordreference.com/${from}${to}/${word}`
    const html = await request({
        method: 'GET',
        uri: url,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
        }
    })
    return processHtml(html)
};

const goToWordReference = (word, from = 'en', to = 'gr') => {
    const url = `http://www.wordreference.com/${from}${to}/${word}`

    chrome.tabs.create({url})
}

const processHtml = (html) => {
    // :D
};