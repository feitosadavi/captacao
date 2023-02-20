import { Browser as BrowserPlaywright, chromium } from '@playwright/test';

class Browser {
  private browser: Promise<BrowserPlaywright> | BrowserPlaywright

  constructor() {
    this.browser = chromium.launch({ headless: false })
  }

  async getBrowser () {
    if (this.browser instanceof Promise) {
      this.browser = await this.browser
    }
    return this.browser
  }
}

const browser = new Browser()

export { browser }




