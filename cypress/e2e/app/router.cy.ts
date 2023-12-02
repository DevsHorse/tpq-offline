
describe('Router', () => {
	it('Storages page opens', () => {
		cy.visit('/');
		cy.getByTestId('StoragesPage').should('exist');
	});
	it('Not found page opens', () => {
		cy.visit('/awdawdawdawdawd');
		cy.getByTestId('NotFoundPage').should('exist');
	});
});