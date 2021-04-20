const menus = {
    PARENT: 'PARENT',
    TRANSLATE: 'TRANSLATE',
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({'title': 'WordReference', 'id': menus.PARENT, contexts: ['selection']});
});

chrome.contextMenus.onClicked.addListener(event => {
    const {menuItemId, selectionText} = event;
    switch (menuItemId) {
        case menus.PARENT:
            goToWordReference(selectionText)
            break;
        case menus.TRANSLATE:
            // TODO
            break;
        default:
            console.error('No matching menu id.')
    }
})

const goToWordReference = (word, from = 'en', to = 'gr') => {
    const url = `http://www.wordreference.com/${from}${to}/${word}`

    chrome.tabs.create({url})
}