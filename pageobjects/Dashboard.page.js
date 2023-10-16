import Page from './page.js';

class DashboardPage extends Page {
  ENABLED = 'enabled';
  /**
   * click on the logout button
   */
  async logout() {
    try {
      await (
        await this.logoutButton
      ).waitAndClick({
        timeout: this.DEFAULT_FAST_TIMEOUT * 2,
      });
    } catch (err) {
      await browser.$('[data-screen="logout"]').click();
    }
  }
  /**
   * Admin dashboard
   */
  get adminDashboard() {
    return $('[data-url="../WebAdmin/"]');
  }

  /**
   * Admin setup wizard
   */
  get setupWizard() {
    return $('#TelephonyCustomersFormID_LabelListTitle');
  }
  /**
   * logout button
   */
  get logoutButton() {
    return $('[data-screen="logout"]');
  }

  /**
   * Home icon
   */
  get homeIcon() {
    return $('.home');
  }
  /**
   * workspace icon
   */
  get workspaceIcon() {
    return $('.workspace');
  }
  /**
   * apps icon
   */
  get appsIcon() {
    return $('.apps');
  }
  /**
   * configuration icon
   */
  get configurationIcon() {
    return $('.configuration');
  }
  /**
   * site-list icon
   */
  get siteListIcon() {
    return $('.dropdown-toggle');
  }

  get agentHeader() {
    return $('#header-nav-boot>ul>li:nth-child(1)>a>span');
  }

  get flowDesignerDisabled() {
    return $('.flow-designer.disabled');
  }

  get flowDesigner() {
    return $("span.button-name[data-application-oid='aRMQeDQK']");
  }
  
  get ivrStudioDisabled() {
    return $('.ivr-studio.disabled');
  }

  get IVR() {
    return $("//span[@class='button-name' and @data-application-oid='aRMQeDQK' and text()='IVR Studio']");
  }

  get surveymanagerDsisabled() {
    return $('.survey-manager.disabled');
  }

  get surveymanager() {
    return $("//span[contains(text(),'Survey manager')]");
  }

  get LoginasanagentDsisabled() {
    return $('button.btn.with-addon.left.centered.toggle-button[disabled]');
  }

  get Loginasanagent() {
    return $('button.btn.with-addon.left.centered.toggle-button');
  }


  get taxation() {
    return $('span.button-name[data-application-oid="aQ6OIcMC"]');
  }

  get adminstration() {
    return $('span.button-name[data-url="../WebAdmin/"]');
  }
  open() {
    return super.open('hermes360/Admin/Launcher/dashboard?screen=apps');
  }
  /**
   * Return true whether the element is enabled/disabled
   * @param {string} application name of the application
   * @param {string} status  status of the application
   * @param {WebdriverIO.Element} element representing the option to be toggle
   * @returns {boolean | Error} true if there was no error during the process
   */
  async launchadministration(){
    await this.adminstration.click();
    await browser.pause(15000);

  }
  async _applicationEnabled(application, status, element) {
    if (status === undefined) {
      // throw new Error(`application - ${application} - not handled.`)
      console.log(`application - ${application} - not handled.`);
      return false;
    }
    if (status === this.ENABLED) {
      await element.waitForDisplayed({
        timeout: process.env.DEFAULT_FAST_TIMEOUT,
        reverse: true,
      });
    } else {
      await element.waitForDisplayed({
        timeout: process.env.DEFAULT_FAST_TIMEOUT,
      });
    }
    return true;
  }

  async verifyApplicationEnabled(applications) {
    // | administration   | taxation   | survey   | scripter   |
    const isAdministrationDisplayed = await this._applicationEnabled(
      'administration',
      applications['administration'],
      await this.adminconsoleDisabled
    );
    const isTaxationDisplayed = await this._applicationEnabled(
      'taxation',
      applications['taxation'],
      await this.taxationDisabled
    );
    const isSurveryDisplayed = await this._applicationEnabled(
      'survey',
      applications['survey'],
      await this.surveymanagerDsisabled
    );
    const isflowDesignerDisabled = await this._applicationEnabled(
      'scripter',
      applications['scripter'],
      await this.flowDesignerDisabled
    );
    const isIVRStudioDisabled = await this._applicationEnabled(
      'scripter',
      applications['scripter'],
      await this.ivrStudioDisabled
    );
    return (
      isAdministrationDisplayed &&
      isTaxationDisplayed &&
      isSurveryDisplayed &&
      isflowDesignerDisabled &&
      isIVRStudioDisabled
    );
  }

  get loginAsAnAgentButton() {
    return $(
      '//*[@id="hermes"]/div[2]/div[2]/div[2]/div/div[1]/div/div[2]/div/div/button'
    );
  }

  get closeListOfAgentButton() {
    return $(
      '//*[@id="hermes"]/div[2]/div[2]/div[2]/div/div[2]/div/button/span'
    );
  }

  get agentSearchInputField() {
    return $('#search');
  }

  /**
   * Login as an agent targeted by his lastname firstname
   * @param {string} lastName  agent last name
   * @param {string} firstName agent first name
   * @returns {boolean} true if the agent is displayed in the list
   */

  async loginAsAgent(lastName) {
    //open the list of agent
    await browser.pause(this.DEFAULT_FAST_TIMEOUT);
    await (await this.loginAsAnAgentButton).waitForClickable({
      timeout: this.DEFAULT_FAST_TIMEOUT,
    });
    await (await this.loginAsAnAgentButton).click();  // click to login as an agent button
    await browser.pause(this.DEFAULT_FAST_TIMEOUT);
    //enter the search filter of the agent last name firstname
    await (await browser.$('#search')).setValue(lastName);
    await browser.pause(parseInt(process.env.DEFAULT_FAST_TIMEOUT));
    //click on the first result of the filter

    await (await browser.$(`//td[contains(text(), '${lastName}')]`)).waitForDisplayed({
      timeout: this.DEFAULT_FAST_TIMEOUT,
    });
    await (await browser.$(`//td[contains(text(), '${lastName}')]`)).waitForClickable({
      timeout: this.DEFAULT_FAST_TIMEOUT * 2,
    });
    await (await browser.$(`//td[contains(text(), '${lastName}')]`)).click();
    await browser.pause(30000);
    return true;
  }

  async loginAsAgentMultiRemote(userA, agentA, userB, agentB) {
    //open the list of agent
    await browser.pause(this.DEFAULT_FAST_TIMEOUT);
    await (
      await this.loginAsAnAgentButton
    ).waitForClickable({
      timeout: this.DEFAULT_FAST_TIMEOUT,
    });
    await (await this.loginAsAnAgentButton).click();
    await browser.pause(this.DEFAULT_FAST_TIMEOUT);
    //enter the search filter of the agent last name firstname
    await this.searchAgent(userA, agentA);
    await this.searchAgent(userB, agentB);
    return true;
  }

  async searchAgent(user, agent) {
    //enter the search filter of the agent last name firstname
    await (await browser[`user${user}`].$('#search')).setValue(`${agent}`);
    await browser[`user${user}`].pause(
      parseInt(process.env.DEFAULT_FAST_TIMEOUT)
    );
    //click on the first result of the filter
    await (
      await browser[`user${user}`].$(`//td[contains(text(), '${agent}')]`)
    ).waitForDisplayed({
      timeout: this.DEFAULT_FAST_TIMEOUT,
    });
    await (
      await browser[`user${user}`].$(`//td[contains(text(), '${agent}')]`)
    ).waitForClickable({
      timeout: this.DEFAULT_FAST_TIMEOUT * 2,
    });
    await (
      await browser[`user${user}`].$(`//td[contains(text(), '${agent}')]`)
    ).click();
  }
}

export default new DashboardPage();
