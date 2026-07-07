declare global {
  namespace Cypress {
    interface Chainable {
      getByData(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

export {}