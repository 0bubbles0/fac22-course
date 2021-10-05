// it("hi", () => {
//   assert.equal(1, 1);
// });

describe('Dog forms', () => {
	beforeEach(() => {
		cy.task('resetDb');
	});
	it('creates a new dog', () => {
		cy.visit('/');
		cy.get("input[name='dogName']").type('rover');
		cy.get("button[type='submit']").click();
	});
	it('deletes a dog', () => {
		cy.visit('/');
		cy.get("button[aria-label='Delete rover']").click();
		// make sure that Rover entry is removed from page
		cy.contains('Rover').should('not.exist');
	});
});

describe('Test user page', () => {
	// Reset
	beforeEach(() => {
		cy.task('resetDb');
	});
	// Add a test verifying the / route displays a list of users
	it('/ shows a user list', () => {
		cy.visit('/');
    cy.contains("Sery1976");
    cy.contains("Spont1935");
	});

	// Add a test verifying you can create a user from the /create-user route
	it('creates a user', () => {
		cy.visit('/users/create');
		cy.get("input[name='username']").type('Anna');
		cy.get("input[name='age']").type('15');
		cy.get("input[name='location']").type('Daun');
		cy.get("button[type='submit']").click();

		// is it on /?
		cy.visit('/');
		cy.contains('Anna');
	});

	// Add a test verifying you can delete a user from the / route
	it('deletes a user', () => {
		cy.visit('/');
    cy.get("button[aria-label='Delete Precand']").click();
		// make sure that Precand entry is removed from page
		cy.contains('Precand').should('not.exist');
	});
	});
});
