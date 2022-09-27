// Import modules
import './form';
import './submit';

// Import CSS files
import '../css/index.css';

// Import Bootstrap
import {Tooltip, Toast, Popover} from 'bootstrap'; // note: install bootstrap and @popperjs/core npms as dependencies
import 'bootstrap/dist/css/bootstrap.min.css';

// Import initDb method from database.js
import{initDb} from './database'

// Import images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

// Add images on load
window.addEventListener('load', function(){
    initDb();
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
})