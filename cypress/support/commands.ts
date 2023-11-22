import {selectByTestId} from "../helpers/getByTestId";

export {};

const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId), {timeout: 10000});
}

const goOffline = () => {
  cy.log('**go offline**')
    .then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.enable',
        })
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.emulateNetworkConditions',
          params: {
            offline: true,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        })
    })
}

const goOnline = () => {
  cy.log('**go online**')
    .then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.emulateNetworkConditions',
          params: {
            offline: false,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        })
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.disable',
        })
    })
}

const assertOnline = () => {
  return cy.wrap(window).its('navigator.onLine').should('be.true')
}

const assertOffline = () => {
  return cy.wrap(window).its('navigator.onLine').should('be.false')
}

const openStorageActionModal = (rowId: string, action: string) => {
  cy.getByTestId(`StoragesPage.Storage.Button(row_${rowId})`).click();
  cy.getByTestId(`StoragesPage.Storage.Button.List(row_${rowId})`)
    .and('have.css', 'visibility')
    .should('include', 'visible');

  cy.getByTestId('Modal').should('not.exist');

  cy.getByTestId(`StoragesPage.Storage.Button.List.Action(row_${rowId}_${action})`)
    .should('have.text', action)
    .click();

  cy.getByTestId('Modal').should('exist');
}

const fillCountInput = (value: string) => {
  cy.getByTestId('Input.Count')
    .should('exist')
    .clear()
    .type(value);
}

const fillSelectInput = (selector: string | number) => {
  cy.getByTestId('Input.Select')
    .select(selector);
}

const sendStorageForm = (offline: boolean = false) => {
  cy.getByTestId('Modal.SubmitButton')
    .should('exist')
    .click();

  if (!offline) {
    cy.wait('@updateStorage')
      .its('response.statusCode')
      .should('eq', 200);
  }
  cy.getByTestId('Modal').should('not.exist');
}

const expectProducts = (rowId: string, value: string) => {
  cy.getByTestId(`StoragesPage.Storage.Cell(${rowId}_productsCount)`)
    .should('have.text', value);
}

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>,
      goOnline(): void;
      goOffline(): void;
      assertOnline(): void;
      assertOffline(): void;
      openStorageActionModal(rowId: string, action: string): void;
      fillCountInput(value: string): void;
      fillSelectInput(selector: string | number): void;
      sendStorageForm(offline?: boolean): void;
      expectProducts(rowId: string, value: string): void;
    }
  }
}

Cypress.Commands.add('getByTestId', getByTestId);
Cypress.Commands.add('goOnline', goOnline);
Cypress.Commands.add('goOffline', goOffline);
Cypress.Commands.add('assertOnline', assertOnline);
Cypress.Commands.add('assertOffline', assertOffline);
Cypress.Commands.add('openStorageActionModal', openStorageActionModal);
Cypress.Commands.add('fillCountInput', fillCountInput);
Cypress.Commands.add('fillSelectInput', fillSelectInput);
Cypress.Commands.add('sendStorageForm', sendStorageForm);
Cypress.Commands.add('expectProducts', expectProducts);

