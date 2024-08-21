document.addEventListener('DOMContentLoaded', () => {
    const directoryList = document.getElementById('directory-list');
    const addPageForm = document.getElementById('add-page-form');
    const pageTitleInput = document.getElementById('page-title');
    const pageContentInput = document.getElementById('page-content');

    // Fetch and display existing pages
    fetch('/pages')
        .then(response => response.json())
        .then(pages => {
            pages.forEach(page => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${page.title}</strong><p>${page.content}</p>`;
                directoryList.appendChild(li);
            });
        });

    // Handle form submission
    addPageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = pageTitleInput.value;
        const content = pageContentInput.value;

        fetch('/pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(page => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${page.title}</strong><p>${page.content}</p>`;
            directoryList.appendChild(li);
            pageTitleInput.value = '';
            pageContentInput.value = '';
        });
    });
});
