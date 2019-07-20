import {browser, by, element, ElementFinder} from 'protractor';

export class AppPage {

  praesentationButton: ElementFinder = element(by.id('start-praesentation'));

  navigateTo(path: string = '/') {
    return browser.get(browser.baseUrl + path) as Promise<any>;
  }

  getTitleText() {
    return element(by.id('titel')).getText() as Promise<string>;
  }

  async clickPraesentationButton() {
    return this.praesentationButton.click();
  }
}
