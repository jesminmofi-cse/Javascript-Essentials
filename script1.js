document.getElementById('toggle-images').addEventListener('change', function() {
    filterImages();
});

document.getElementById('search-bar').addEventListener('input', function() {
    showSuggestions();
    filterImages();
});

document.getElementById('clear-btn').addEventListener('click', function() {
    clearSearch();
});

document.getElementById('submit-btn').addEventListener('click', function() {
    filterImages();
    hideSuggestions();
});

function filterImages() {
    const searchBar = document.getElementById('search-bar');
    const query = searchBar.value.toLowerCase();
    const images = document.querySelectorAll('#images-container img');
    const toggleImages = document.getElementById('toggle-images').checked;

    images.forEach(img => {
        const name = img.getAttribute('data-name').toLowerCase();
        const description = img.getAttribute('data-description');
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'image-description';
        descriptionElement.textContent = description;

        if (toggleImages && query && name.includes(query)) {
            img.style.display = 'block';
            img.insertAdjacentElement('afterend', descriptionElement);
            descriptionElement.style.display = 'block';
        } else {
            img.style.display = 'none';
            if (img.nextElementSibling && img.nextElementSibling.className === 'image-description') {
                img.nextElementSibling.style.display = 'none';
            }
        }

    });
}

function showSuggestions() {
    const searchBar = document.getElementById('search-bar');
    const query = searchBar.value.toLowerCase();
    const suggestions = document.getElementById('suggestions');
    const images = document.querySelectorAll('#images-container img');

    suggestions.innerHTML = '';

    if (query) {
        images.forEach(img => {
            const name = img.getAttribute('data-name').toLowerCase();
            if (name.includes(query)) {
                const imgClone = img.cloneNode();
                imgClone.style.display = 'inline';
                imgClone.addEventListener('click', () => {
                    searchBar.value = img.getAttribute('data-name');
                    filterImages();
                    hideSuggestions();
                });
                suggestions.appendChild(imgClone);
            }
        });

        if (suggestions.children.length > 0) {
            suggestions.style.display = 'block';
        } else {
            suggestions.style.display = 'none';
        }
    } else {
        suggestions.style.display = 'none';
    }
}

function hideSuggestions() {
    document.getElementById('suggestions').style.display = 'none';
}

function clearSearch() {
    document.getElementById('search-bar').value = '';
    hideSuggestions();
    filterImages();
}
