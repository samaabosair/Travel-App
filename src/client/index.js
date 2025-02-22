// Import JavaScript functions
import { handleSubmit } from './js/formHandler';

// Import SASS styles
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

// Add event listener to the form
const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', handleSubmit);
} else {
    console.error('Form element not found!');
}

console.log("Client index.js is running!");
