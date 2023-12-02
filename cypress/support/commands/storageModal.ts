

export const openStorageActionModal = (rowId: string, action: string) => {
	cy.getByTestId(`StoragesPage.Storage.Button(row_${rowId})`).click();
	cy.getByTestId(`StoragesPage.Storage.Button.List(row_${rowId})`)
		.and('have.css', 'visibility')
		.should('include', 'visible');

	cy.getByTestId('Modal').should('not.exist');

	cy.getByTestId(`StoragesPage.Storage.Button.List.Action(row_${rowId}_${action})`)
		.should('have.text', action)
		.click();

	cy.getByTestId('Modal').should('exist');
};

export const fillCountInput = (value: string) => {
	cy.getByTestId('Input.Count')
		.should('exist')
		.clear()
		.type(value);
};

export const fillSelectInput = (selector: string | number) => {
	cy.getByTestId('Input.Select')
		.select(selector);
};

export const sendStorageForm = (offline: boolean = false) => {
	cy.getByTestId('Modal.SubmitButton')
		.should('exist')
		.click();

	if (!offline) {
		cy.wait('@updateStorage')
			.its('response.statusCode')
			.should('eq', 200);
	}
	cy.getByTestId('Modal').should('not.exist');
};

declare global {
  namespace Cypress {
    interface Chainable {
      openStorageActionModal(rowId: string, action: string): void;
      fillCountInput(value: string): void;
      fillSelectInput(selector: string | number): void;
      sendStorageForm(offline?: boolean): void;
    }
  }
}

