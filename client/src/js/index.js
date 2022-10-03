// Import modules
import {toggleForm,clearForm} from './form';


// Import CSS files
import '../css/index.css';

// Import Bootstrap
import {Tooltip, Toast, Popover} from 'bootstrap'; // note: install bootstrap and @popperjs/core npms as dependencies
import 'bootstrap/dist/css/bootstrap.min.css';

// Import initDb method from database.js
import{initDb, getDb, postDb, deleteDb, editDb} from './database';

// Import fetchCards function from cards.js
import{fetchCards} from './cards';

// Import images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

// Add images on load
window.addEventListener('load', function(){
    initDb();
    fetchCards();
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
  toggleForm()
})

form.addEventListener('submit', event => {
    // Handle data
    event.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    // Post form data to IndexedDB OR Edit an existing card in IndexedDB
    if (submitBtnToUpdate == false) {
        postDb(name, email, phone, profile);
    } 
    else {
        // Obtains values passed into the form element
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let profile = document.querySelector('input[type="radio"]:checked').value;

        // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
        editDb(profileId, name, email, phone, profile);
        
        fetchCards();

        // Toggles the submit button back to POST functionality
        submitBtnToUpdate = true;
    }

    // Clear form
    clearForm();

    // Toggle form
    toggleForm();

    // Reload the DOM
    fetchCards();
});

window.deleteCard = (event) => {
    // Grab the id from the button element attached to the contact card.
    let id = parseInt(event.id)
    // Delete the card
    deleteDb(id);
    // Reload the DOM
    fetchCards()
};

window.editCard = (event) => {
    // Grabs the id from the button element attached to the contact card and sets a global variable that will be used in the form element.
    profileId = parseInt(event.dataset.id);
    
    // Grabs information to pre-populate edit form
    let editName = event.dataset.name;
    let editEmail = event.dataset.email;
    let editPhone = event.dataset.phone;
    
    document.getElementById("name").value = editName;
    document.getElementById("email").value = editEmail;
    document.getElementById("phone").value = editPhone;
    
    form.style.display = "block";
    
    // Toggles the submit button so that it now Updates an existing contact instead of posting a new one
    submitBtnToUpdate = true;
};