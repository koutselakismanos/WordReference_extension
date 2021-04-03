(function () {
    const requestWordReferenceWord = async (word, from = 'en', to = 'gr') => {
        const url = `https://www.wordreference.com/${from}${to}/${word}`
        const request = await fetch(url);

        return await request.text();
    };

    const parseHTML = (html) => {
        const parser = new DOMParser();
        return parser.parseFromString(html, "text/html");
    }

    const scrapeDocumentWordsFromParsedHTML = doc => {
        const articleWRDElement = doc.getElementById('articleWRD'); // element containing all the meat
        const wrdElement = articleWRDElement.querySelector('.WRD');
        const evenElements = wrdElement.querySelectorAll('.even');
        const oddElements = wrdElement.querySelectorAll('.odd')

        // Filter word elements that do not have the `ToWrd` class
        // Spread operator is used to convert a `NodeList` to an `Array`
        const wordElements = [...evenElements]
            .concat([...oddElements])
            .filter(wordElement => {
                console.log('worde', wordElement);
                return wordElement.querySelector('.ToWrd') != null
            })
            .map(wordElement => {
                return wordElement.querySelector('.ToWrd')
            });

        wordElements.forEach((word) => {
            console.log('------------------');
            console.log(word.innerHTML);
            console.log(word.innerText);
            console.log('------------------');
        })
    }

    const getSelectionDomRect = windowSelection => {
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
        const oRange = windowSelection.getRangeAt(0); //get the text range
        return oRange.getBoundingClientRect()
    }


    document.addEventListener('mouseup', async () => {
        const windowSelection = window.getSelection();
        if (windowSelection.toString().trim().length) {
            const domRect = getSelectionDomRect(windowSelection);

            const selectionText = windowSelection.toString();

            const htmlText = await requestWordReferenceWord(selectionText)
            scrapeDocumentWordsFromParsedHTML(parseHTML(htmlText));
        }
    });
})()
