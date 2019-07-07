import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo(path: string = '/') {
    return browser.get(browser.baseUrl + path) as Promise<any>;
  }

  getTitleText() {
    return element(by.id('titel')).getText() as Promise<string>;
  }
}
