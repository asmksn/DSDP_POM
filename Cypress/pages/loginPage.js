class LoginPage {
  visit() {
    cy.visit('/');
  }

  enterEmail(email) {
    cy.get('[placeholder="Email"]').clear().type(email);
  }

  enterPassword(password) {
    cy.get('[placeholder="Password"]').clear().type(password);
  }

  clickSignIn() {
    cy.contains('button', 'Sign In').click({ force: true });
  }

  signIn(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickSignIn();
  }

  assertDashboardVisible() {
    cy.contains('Dashboard').should('be.visible');
  }

  assertInvalidLoginMessage() {
    cy.contains('Invalid email or password').should('be.visible');
  }

  assertSignInDisabled() {
    cy.contains('button', 'Sign In').should('be.disabled');
  }

  getEmailValidationMessage() {
    return cy.get('input[type="email"]').then(($input) => $input[0].validationMessage);
  }
}

export default new LoginPage();
