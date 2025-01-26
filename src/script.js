function scrollToSection() {
    const target = document.getElementById('target-section');
    target.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('track-button').addEventListener('click', function () {
    const emailForm = document.getElementById('email-form');
    // Toggle visibility of the email form
    emailForm.classList.toggle('hidden');
});

const closeButton = document.getElementById('close-email-form');
const emailForm = document.getElementById('email-form');

closeButton.addEventListener('click', () => {
    // Use the class toggle method for consistent hiding
    emailForm.classList.add('hidden');
});
