import Back from "./Back";
import Front from "./Front";
import { render } from '@wordpress/element';
/**
 * Import the stylesheet for the plugin.
 */
import './style/main.scss';

// Render the App component into the DOM
try {
    render(<Back />, document.getElementById('ul_openagenda_admin'));
  } catch {
    render(<Front />, document.getElementById('ul_openagenda_front'));
  }

