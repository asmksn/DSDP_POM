import { signUpPage } from '../pages/signUpPage';

describe('DSDP - Sign Up Suite (POM)', () => {
  const studentPassword = 'Bulipe@25';

  beforeEach(() => {
    cy.viewport(1920, 1080);
    signUpPage.visit();
  });

  it('TC1: Valid SignUp with unique email', () => {
    const email = signUpPage.generateEmail();
    signUpPage.goToSignUpPage();
    signUpPage.fillForm(email, studentPassword, studentPassword);
    signUpPage.clickTerms();
    signUpPage.clickContinue();
    signUpPage.clickSubmit();
    cy.contains('We have sent a code to your email').should('be.visible');
  });

  it('TC2: Password mismatch', () => {
    const email = signUpPage.generateEmail();
    signUpPage.goToSignUpPage();
    signUpPage.fillForm(email, 'Password@123', 'Password@321');
    signUpPage.clickTerms();
    signUpPage.clickContinue();
    signUpPage.clickSubmit();
    cy.contains('Password and confirm password does not match').should('be.visible');
  });

  it('TC3: Invalid email format', () => {
    signUpPage.goToSignUpPage();
    signUpPage.fillForm('invalidemail', studentPassword, studentPassword);
    signUpPage.clickTerms();
    signUpPage.clickContinue();
    signUpPage.clickSubmit();
    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.contain("Please include an '@'");
    });
  });

  it('TC4: Sign up with existing email', () => {
    const existingEmail = 'shohanshohoz10@gmail.com';
    signUpPage.goToSignUpPage();
    signUpPage.fillForm(existingEmail, studentPassword, studentPassword);
    signUpPage.clickTerms();
    signUpPage.clickContinue();
    signUpPage.clickSubmit();
    cy.contains('User already exists').should('be.visible');
  });

  it('TC5: All fields empty', () => {
    signUpPage.goToSignUpPage();
    cy.get('button.border').click();
    signUpPage.clickSubmit();
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('TC6: Blank email field', () => {
    signUpPage.goToSignUpPage();
    signUpPage.fillForm('', studentPassword, studentPassword);
    signUpPage.clickTerms();
    signUpPage.clickContinue();
    signUpPage.clickSubmit();
    cy.get('input[type="email"]').should(($input) => {
      expect($input[0].validationMessage).to.contain("Please fill out this field");
    });
  });

  it('TC7: Short password', () => {
    const email = signUpPage.generateEmail();
    signUpPage.goToSignUpPage();
    signUpPage.fillForm(email, 'Short', 'Short');
    signUpPage.clickTerms();
    signUpPage.clickContinue();
    signUpPage.clickSubmit();
    cy.contains('Password must be at least 8 characters, with uppercase, lowercase, number, and special character.').should('be.visible');
  });

  it('TC9: Email with leading/trailing spaces', () => {
    const email = `   user${Date.now()}@example.com   `;
    signUpPage.goToSignUpPage();
    signUpPage.fillForm(email, studentPassword, studentPassword);
    signUpPage.clickTerms();
    signUpPage.clickContinue();
    signUpPage.clickSubmit();
    cy.contains('Invalid email format').should('not.exist');
  });

  it('TC10: Confirm password is empty', () => {
    const email = signUpPage.generateEmail();
    signUpPage.goToSignUpPage();
    signUpPage.fillForm(email, studentPassword, '');
    signUpPage.clickTerms();
    signUpPage.clickContinue();
    signUpPage.clickSubmit();
    cy.get('[placeholder="Confirm Password"]').should(($input) => {
      expect($input[0].validationMessage).to.contain("Please fill out this field");
    });
  });

  it('TC12: Agreement not checked - Sign Up button disabled', () => {
    const email = signUpPage.generateEmail();
    signUpPage.goToSignUpPage();
    signUpPage.fillForm(email, studentPassword, studentPassword);
    signUpPage.clickContinue();
    cy.contains('button', 'Sign Up').should('be.disabled');
  });
});
