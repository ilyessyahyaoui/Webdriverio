

import Page from './page.js';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#usrID');
    }

    get inputPassword () {
        return $('#usrPWD');
    }

    get stationInputField(){
        return $('#numeric')
    }

    get btnSubmit () {
        return $('input[type="submit"]');
    }

    get inputStationId() {
        return $('input[name="station')
    }
   

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    /**
     * Login as a user (e.g Root admin with station id)
     * @param {string} username 
     * @param {string} password 
     * @param {string} stationID 
     */
    async login (username, password, stationID) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        if(stationID !==  undefined || stationID!==''){
            await (await this.inputStationId).addValue(stationID)
        }
        //await browser.pause(1000);
        await this.btnSubmit.click();
        await browser.pause(5000);
        
    }

    get loginForm (){
        return $("#login-form")
    }
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('hermes360/Admin/Launcher/login');
    }
}

export default new LoginPage();
