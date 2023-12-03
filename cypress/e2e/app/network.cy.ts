describe('Network', { browser: '!firefox' }, () => {
  beforeEach(cy.goOnline);
  afterEach(cy.goOnline);

  it('Status is online', () => {
    cy.visit('/');
    cy.assertOnline();
    cy.getByTestId('NetworkStatus').should('contain.text', 'Online');
  });

  it('Status is offline', () => {
    cy.visit('/');
    cy.goOffline();
    cy.assertOffline();
    cy.getByTestId('NetworkStatus').should('contain.text', 'Offline');
  });
});
