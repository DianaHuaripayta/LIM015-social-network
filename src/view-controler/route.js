/* eslint-disable no-undef */
import { components } from '../views/components.js';
import { addEventsLogin } from '../views/login/eventsLogin.js';
import { addEventResetPassword } from '../views/password/eventsResetPassword.js';
import { addEventsRegister } from '../views/register/eventsSignUp.js';
import { loadComponents } from '../views/timeline/loadComponents.js'


const changeView = (route) => {
    const containerMain = document.querySelector('#container-main');
    containerMain.innerHTML = '';
    switch (route) {
        case '/':
        case '':
            {
                const viewLogin = containerMain.appendChild(components.login());
                addEventsLogin();
                return viewLogin;
            }
        case '#/signup':
            {
                const viewRegistro = containerMain.appendChild(components.signUp());
                addEventsRegister();
                return viewRegistro;
            }

        case '#/forgetPassword':
            {
                const viewForgetPassword = containerMain.appendChild(components.forgetPassword());
                addEventResetPassword();
                return viewForgetPassword;
            }
        case '#/timeline':
            {
                const viewTimeLine = containerMain.appendChild(components.timeLine());
                const firstChild = viewTimeLine.firstChild;
                viewTimeLine.insertBefore(components.header(), firstChild);
                loadComponents();
                return viewTimeLine;
            }

        default:
            { return containerMain.appendChild(components.error()); }
    }
};

export { changeView };