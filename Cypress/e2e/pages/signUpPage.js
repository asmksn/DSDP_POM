class SignUpPage {
  visit() {
    cy.visit('http://172.188.17.213:4000/');
  }

  goToSignUpPage() {
    cy.contains('button', 'Sign Up').click().wait(3000);
  }

  fillEmail(email) {
    cy.get('[placeholder="Email"]').type(email);
  }

  fillPassword(password) {
    cy.get('[placeholder="Password"]').type(password);
  }

  fillConfirmPassword(confirmPassword) {
    cy.get('[placeholder="Confirm Password"]').type(confirmPassword);
  }

  fillForm(email, password, confirmPassword) {
    if (email) this.fillEmail(email);
    if (password) this.fillPassword(password);
    if (confirmPassword) this.fillConfirmPassword(confirmPassword);
  }

  clickTerms() {
    // cy.get('[type="button"]').eq(2).click();
    cy.get('button[type="button"]').eq(2)
  .should('not.be.disabled') // Wait for the button to be enabled
  .click().wait(500);

  // cy.get('button[type="button"]').eq(2).then(($button) => {
  //   // Ensure checkbox is checked only once (if not already checked)
  //   if (!$button.hasClass('checked')) {
  //     cy.wrap($button).click();
  //   }
  // });
  }

  clickContinue() {
    cy.get('button.border')
    // .click();
  }

  clickSubmit() {
    cy.contains('button', 'Sign Up').click().wait(2500);
  }

  generateEmail() {
    return `testuser+${Date.now()}@example.com`;
  }
}

export const signUpPage = new SignUpPage();
