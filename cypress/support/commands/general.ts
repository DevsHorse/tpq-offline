import { selectByTestId } from '../../helpers/getByTestId';

export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId), { timeout: 10000 });
};

export const expectProducts = (rowId: string, value: string) => {
  cy.getByTestId(`StoragesPage.Storage.Cell(${rowId}_productsCount)`).should(
    'have.text',
    value,
  );
};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      expectProducts(rowId: string, value: string): void;
    }
  }
}
