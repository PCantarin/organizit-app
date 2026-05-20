function loadScreen(screenPath) {
    const template = document.getElementById('card');

    fetch(`/pages/${screenPath}.html`)
        .then(response => {
            if (!response.ok) throw new Error();
            return response.text();
        })
        .then(html => {
            template.innerHTML = html;
        })
        .catch(error => {
            template.innerHTML = `<h3>Error</h3><p>${error.message}</p>`;
        });

}