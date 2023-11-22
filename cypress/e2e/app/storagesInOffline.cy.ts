

describe('Storages In Offline', () => {
  afterEach(cy.goOnline);

  beforeEach(() => {
    cy.goOnline();
    cy.assertOnline();
    cy.intercept('GET', '**/storage').as('getStorage')
    cy.intercept('POST', '**/storage/*').as('updateStorage')
    cy.visit('/');

    cy.wait('@getStorage')
      .its('response.statusCode')
      .should('eq', 200);

    cy.getByTestId('StoragesPage.Storage')
      .should('exist')
      .should('have.length', 3);

    cy.openStorageActionModal('0', 'Inventory');
    cy.fillCountInput('1000');
    cy.sendStorageForm();
    cy.expectProducts('0', '1000');

    cy.openStorageActionModal('1', 'Inventory');
    cy.fillCountInput('1000');
    cy.sendStorageForm();
    cy.expectProducts('1', '1000');
  })

  it('Storage Add Action', () => {
    cy.goOffline();
    cy.assertOffline();

    cy.openStorageActionModal('0', 'Add');
    cy.fillCountInput('500');
    cy.sendStorageForm(true);
    cy.expectProducts('0', '1500');
  })

  it('Storage Use Action', () => {
    cy.goOffline();
    cy.assertOffline();

    cy.openStorageActionModal('0', 'Use');
    cy.fillCountInput('500');
    cy.sendStorageForm(true);
    cy.expectProducts('0', '500');
  })

  it('Storage Inventory Action', () => {
    cy.goOffline();
    cy.assertOffline();

    cy.openStorageActionModal('0', 'Inventory');
    cy.fillCountInput('2000');
    cy.sendStorageForm(true);
    cy.expectProducts('0', '2000');
  })


  it('Storage Move Action', () => {
    cy.goOffline();
    cy.assertOffline();

    cy.openStorageActionModal('0', 'Move');
    cy.fillCountInput('500');
    cy.fillSelectInput(1);
    cy.sendStorageForm(true);
    cy.expectProducts('0', '500');
    cy.expectProducts('1', '1500');
  })

  it('All actions and synchronization', () => {
    cy.goOffline();
    cy.assertOffline();

    cy.openStorageActionModal('0', 'Inventory');
    cy.fillCountInput('2000');
    cy.sendStorageForm(true);
    cy.expectProducts('0', '2000');

    cy.openStorageActionModal('0', 'Add');
    cy.fillCountInput('500');
    cy.sendStorageForm(true);
    cy.expectProducts('0', '2500');

    cy.openStorageActionModal('0', 'Use');
    cy.fillCountInput('1000');
    cy.sendStorageForm(true);
    cy.expectProducts('0', '1500');

    cy.openStorageActionModal('0', 'Move');
    cy.fillCountInput('500');
    cy.fillSelectInput(1);
    cy.sendStorageForm(true);
    cy.expectProducts('0', '1000');
    cy.expectProducts('1', '1500');

    cy.goOnline();
    cy.assertOnline();

    cy.wait('@updateStorage')
    cy.wait('@getStorage')

    cy.expectProducts('0', '1000');
    cy.expectProducts('1', '1500');
  })
})