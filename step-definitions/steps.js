import { Given, When, Then } from "@wdio/cucumber-framework";
import { setOptions } from "expect-webdriverio";
import LoginPage from "../pageobjects/login.page.js";
import DashboardPage from "../pageobjects/Dashboard.page.js";
import SecurePage from "../pageobjects/secure.page.js";

const pages = {
  login: LoginPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
  //await browser.maximizeWindow();
});

When(
  /^I login with (\w+) and (.+) and (.+)$/,
  async (username, password, station) => {
    await LoginPage.login(username, password, station);
  }
);

Then(/^I am able to view icons$/, async () => {
  const icons = {
    home: DashboardPage.homeIcon,
    apps: DashboardPage.appsIcon,
    workspace: DashboardPage.workspaceIcon,
    siteList: DashboardPage.siteListIcon,
    configuration: DashboardPage.configurationIcon,
  };

  for (const icon in icons) {
    await expect(icons[icon]).toBeExisting();
  }
});

Then(/^I am able to view elements for root moode$/, async () => {
  const elms = {
    Disabled_Flow_Designer: DashboardPage.flowDesignerDisabled, //Disabled_Flow_Designer is the key and Disabled_Flow_Designer: DashboardPage.flowDesignerDisabled is the element/value
    Disabled_IVR: DashboardPage.ivrStudioDisabled,
    Administration: DashboardPage.adminstration,
    Disabled_Loginasanagent: DashboardPage.LoginasanagentDsisabled,
    Disabled_Survey: DashboardPage.surveymanagerDsisabled,
    Taxation: DashboardPage.taxation,
  };
  for (const elm in elms) {
    await expect(elms[elm]).toBeExisting();
  }
});

Then(/^I am able to view elements for admin site moode$/, async () => {
  const elms = {
    Flow_Designer: DashboardPage.flowDesigner,
    IVR: DashboardPage.IVR,
    Administration: DashboardPage.adminstration,
    Loginasanagent: DashboardPage.Loginasanagent,
    Survey: DashboardPage.surveymanager,
    Taxation: DashboardPage.taxation,
  };
  for (const elm in elms) {
    await expect(elms[elm]).toBeExisting();
  }
});

Then(/^I am able to launch$/, async () => {
  await DashboardPage.launchadministration();
});

Then(/^I logout from the admin dashboard$/, async () => {
  await expect(DashboardPage.logout());
  await expect(LoginPage.loginForm).toBeExisting();
});

Then(/^I can connect with my agent$/, async () => {
  await DashboardPage.loginAsAgent("Agt_ilyes");
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
  await expect(SecurePage.flashAlert).toBeExisting();
  //await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

Then(/^I am able to see the enabled applications$/, async () => {
  const apps = {
    home: DashboardPage.taxation,
    apps: DashboardPage.adminstration,
  };

  for (const app in apps) {
    await expect(apps[app]).toBeExisting();
  }

  Then(/^I am able to view elements in my workspace agent$/, async () => {
    const elms = {
      Flow_Designer: DashboardPage.flowDesigner,
      IVR: DashboardPage.IVR,
      Administration: DashboardPage.adminstration,
      Loginasanagent: DashboardPage.Loginasanagent,
      Survey: DashboardPage.surveymanager,
      Taxation: DashboardPage.taxation,
    };
    for (const elm in elms) {
      await expect(elms[elm]).toBeExisting();
    }
  });
});
