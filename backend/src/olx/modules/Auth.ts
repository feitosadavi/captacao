import { Page } from '@playwright/test';
async function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class EmailAndPasswordStrategy {
  constructor(private readonly page: Page) { }

  async authenticateWithEmailAndPassword () {
    try {
      await this.page.goto('https://conta.olx.com.br/acesso', { waitUntil: 'commit' });
      await this.page.type("input[type='email']", 'capitalveiculos07@gmail.com')
      await this.page.type("input[type='password']", 'CV204060')
      await this.page.getByText(/^Entrar$/).click();
      await delay(1500)
      // Save signed-in state to 'storageState.json'.
      // await this.page.context().storageState({ path: './storageState.json' });
    } catch (error) {
      console.log('JÁ ESTÁ AUTENTICADO');

    }
  }
}

export class Auth extends EmailAndPasswordStrategy {
  super (page: Page) {
    this.super(page)
  }
}