const links = document.querySelectorAll('a');
const output = document.querySelector('p');

links.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        links.forEach(l => l.classList.remove('active-link'));
        this.classList.add('active-link');
        output.textContent = this.textContent;
    });
});