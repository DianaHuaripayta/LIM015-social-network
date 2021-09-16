/* eslint-disable no-undef */

import { changeView } from './view-controler/route.js'
const init = () => {

    changeView(window.location.hash);
    window.addEventListener('hashchange', () =>changeView(window.location.hash));
}

window.addEventListener('load', init);
