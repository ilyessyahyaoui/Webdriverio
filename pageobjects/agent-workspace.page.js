import GenericAgentWorkspacePage from './generic-agent-workspace.page';
import { responseVerbConfiguratioin } from '../../utils/twilioHook/settings';
class AgentWorkspace extends GenericAgentWorkspacePage {
  get pauseTextBlock() {
    return $('.pause-text')
  }
  /**
   * starts the inbound context
   * @returns Promise<boolean>|Error
   */
  async startInboudContext() {
    try {
      //open the inbound onglet
      await (await this.inboundOnglet).click();
      //toggle to switch if no already activated
      if (
        !(await (
          await browser.$('//*[@id="context_menu_state_switch"]/label')
        ).isSelected())
      ) {
        await (
          await browser.$('//*[@id="context_menu_state_switch"]/label')
        ).click();
      }
      return true;
    } catch (error) {
      return error;
    }
  }
  //.pad-zone
  //.midi-loading

  /**
   * Make a manual call by filtering a contact in the list
   * @param {string} contact
   * @returns Promise<boolean>
   */
  async makeAManualCallToAnExistingContact(contact) {
    //click on the contact button
    await (await this.callBarContactButton).click();
    //use the search bar to filter
    await (await this.filterContactInputField).setValue(contact);
    //click the first result on the contact list to display the phone icon
    await (await browser.$(`//div[contains(text(),'${contact}')]`)).click();
    //click on the phone icon
    await browser
      .$(await $("//article/div/button/div/i[contains(@class, 'mdi-phone')]"))
      .click();
    //check that the call has started
  }

  /**
   * Make a manual call to the targeted phone number
   * @param {string} number
   * @returns Promise<true>
   */
  async makeManualCallByEnteringAnumber(number, duration) {
    const finalduration = duration !== undefined ? duration : "short";
    await responseVerbConfiguratioin(
      finalduration === 'short' ? 'say' : 'sayTransfert',
    )
    //click on the dialpad
    await (await this.numericPadButton).click();
    //enter the phone number on the input field
    await (await this.dialPadPhoneNumberInputField).setValue(number);
    //click on the call button
    await (await this.dialPadCallButton).click();
    const isCallActive = await (
      await this.activeCallIndicator
    ).waitForDisplayed({
      timeout: this.DEFAULT_FAST_TIMEOUT * 10,
    });
    return isCallActive;
  }
  /**
   * Record an outbound conversation
   * @returns Promise<Boolean> return true at the end of the call
   */
  async recordOutBoundCall() {
    await browser.pause(this.DEFAULT_FAST_TIMEOUT * 2);
    await this.recordInboundCall();
    return (await browser.$('[id^=LOGCALL_]')).waitForDisplayed({
      timeout: this.DEFAULT_FAST_TIMEOUT * 20,
    });
  }

  /**
   * record an inbound conversation
   * @returns Promise<Boolean> true if nothing occurs during the call
   */
  async recordInboundCall() {
    await (
      await this.recordButton
    ).waitForClickable({
      timeou: this.DEFAULT_FAST_TIMEOUT * 2,
    });
    await (await this.recordButton).click();
    return true;
  }

  /**
   * record an inbound conversation as userId in a case of a multi remote session
   * @returns Promise<Boolean> true if nothing occurs during the call
   */
  async recordInboundCallAsUser(userId) {
    const instance = browser[`user${userId}`];
    await (
      await instance.$('[id^=CONTACT_]>div.panel-footer>div>div.time.recording')
    ).waitForClickable({
      timeou: this.DEFAULT_FAST_TIMEOUT * 2,
    });
    await (
      await instance.$('[id^=CONTACT_]>div.panel-footer>div>div.time.recording')
    ).click();
    return true;
  }
  /**
   * hang up the call by cliking on the phone icon
   * @returns Promise<Boolean | true>
   */
  async hangup(userId) {
    //pause the time that the call is being recorded
    const instance = userId ? browser[`user${userId}`] : browser;
    await (
      await instance.$(
        '//*[contains(@id,"CONTACT_")]/div[1]/div[3]/div[2]/div[4]/div[2]/div[2]/div[2]/button[1]'
      )
    ).waitForDisplayed({
      timeout: this.DEFAULT_FAST_TIMEOUT * 25,
    });
    await (
      await instance.$(
        '//*[contains(@id,"CONTACT_")]/div[1]/div[3]/div[2]/div[4]/div[2]/div[2]/div[2]/button[1]'
      )
    ).click();
    //check that the qualification ui is displayed
    return (await instance.$('[id^=LOGCALL_]')).waitForDisplayed({
      timeout: this.DEFAULT_FAST_TIMEOUT * 20,
    });
  }

  /**
   * Disconnect the agent from his workspace
   * @returns
   */
  async disconnect() {
    await browser.pause(this.DEFAULT_FAST_TIMEOUT * 2);
    try {
      await browser.closeWindow();
      return true;
    } catch (err) {
      await browser.closeWindow();
      return true;
    }
  }

  /**
   * check whether the pause message is displayed or not
   * @returns Promise<Boolean>
   */
  async isCurrentlyOnBreakMessageDisplayed() {
    try {
      return await (await this.pauseTextBlock).waitForDisplayed({
        timeout: this.DEFAULT_FAST_TIMEOUT
      })
    } catch (err) {
      return false
    }
  }
}

export default new AgentWorkspace();
