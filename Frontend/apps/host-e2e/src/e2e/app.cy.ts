/* eslint-disable cypress/no-unnecessary-waiting */
describe('host-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should successfully log in', () => {
    const email = 'pramodmadushan585@gmail.com';
    const password = 'Password123!';

    // Fill in the login form
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);

    // Click the "Sign In" button
    cy.get('form').submit();
    cy.wait(1000);
    cy.url().should('include', '/b2b-app');
  });

  it('should show an error message for incorrect login', () => {
    const email = 'test@example.com';
    const incorrectPassword = 'wrongpassword';

    // Fill in the login form with incorrect password
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(incorrectPassword);

    // Click the "Sign In" button
    cy.get('form').submit();

    // Assert that an error message is displayed
    cy.contains('Incorrect username or password.').should('be.visible');
  });

  it('should successfully sign up', () => {
    const name = 'John Doe';
    const email = 'test@example.com';
    const password = 'password123';

    // Fill in the sign-up form
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    // Check the "Supplier" checkbox
    cy.get('input[type="checkbox"]').check();

    // Click the "Sign Up" button
    cy.get('form').submit();

    cy.get('[data-testid=toast]').should('not.exist');
  });

  it('should show an error message for invalid sign-up', () => {
    // Fill in the sign-up form with invalid data (e.g., missing name)
    const email = 'test@example.com';
    const password = 'password123';

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    // Click the "Sign Up" button
    cy.get('form').submit();

    // Assert that an error message is displayed
    cy.contains('Name is required').should('exist');
  });
});
