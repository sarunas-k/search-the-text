window.addEventListener('load', function() {console.log('Loaded search.js')});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form[role=search]').addEventListener('submit', function() { return false });

    let contentElement = document.querySelector('article.main');
    let contentElementCopy = contentElement.cloneNode(true);

    document.getElementById('search-field').addEventListener('input', function(event) {
        // Start from initial state
        contentElement.innerHTML = contentElementCopy.innerHTML;

        // Get search text from input
        let searchText = event.target.value;

        // If less than 2 symbols do nothing
        if (searchText.length < 2)
            return;

        // Highlight search text inside element content
        highlight(searchText, contentElement);
    });

    function encodeText(text) {
        // Has to come first
        text = text.replaceAll(/&/g, '&amp;');

        text = text.replaceAll(/</g, '&lt;');
        text = text.replaceAll(/>/g, '&gt;');
        text = text.replaceAll(/"/g, '&quot;');
        text = text.replaceAll(/'/g, '&amp;');
        //text = text.replaceAll(/ /g, '&nbsp;');
        return text;
    }

    function highlight(text, element) {
        if (typeof element == 'undefined' || typeof element.innerHTML == 'undefined' || typeof text == 'undefined')
            return;
        let content = element.innerHTML;
        if (!content.length)
            return;

        let searchString = encodeText(text);
        element.innerHTML = element.innerHTML.replaceAll(
            new RegExp(searchString, 'ig'),
            function(found) { return '<span class="colored">' + found + '</span>' }
        );
    }
});