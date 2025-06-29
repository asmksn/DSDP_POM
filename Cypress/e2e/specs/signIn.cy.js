import signInPage from '../pages/signInPage';

const baseUrl = 'http://172.188.17.213:4000/';
const studentEmail = 'shohanshohoz10@gmail.com';
const studentPassword = 'Bulipe@25';

describe('DSDP SignIn Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    signInPage.visit(baseUrl);
  });

  it('TC1: Valid SignIn', () => {
    signInPage.fillEmail(studentEmail);
    signInPage.fillPassword(studentPassword);
    signInPage.clickSignIn(true);
    cy.wait(10000);
    signInPage.assertDashboardVisible();
  });

  it('TC2: Invalid email format', () => {
    signInPage.fillEmail('invalidEmailFormat');
    signInPage.fillPassword(studentPassword);
    signInPage.clickSignIn();
    signInPage.assertEmailValidationMessage();
  });

  it('TC3: Incorrect password', () => {
    signInPage.fillEmail(studentEmail);
    signInPage.fillPassword('WrongPassword123');
    signInPage.clickSignIn();
    signInPage.assertInvalidCredentialsMessage();
  });

  it('TC4: Non-existent user', () => {
    signInPage.fillEmail('nonexistentuser@example.com');
    signInPage.fillPassword('AnyPassword123');
    signInPage.clickSignIn();
    signInPage.assertInvalidCredentialsMessage();
  });

  it('TC5: Empty email and password fields', () => {
    signInPage.assertSignInDisabled();
  });

  it('TC6: Blank email field', () => {
    signInPage.fillPassword(studentPassword);
    signInPage.assertSignInDisabled();
  });

  it('TC7: Blank password field', () => {
    signInPage.fillEmail(studentEmail);
    signInPage.assertSignInDisabled();
  });

  it('TC8: Password with special characters only', () => {
    signInPage.fillEmail('test@example.com');
    signInPage.fillPassword('!@#$%^&*()');
    signInPage.clickSignIn();
    signInPage.assertInvalidCredentialsMessage();
  });

  it('TC9: Password case sensitivity', () => {
    signInPage.fillEmail(studentEmail);
    signInPage.fillPassword(studentPassword.toLowerCase());
    signInPage.clickSignIn();
    signInPage.assertInvalidCredentialsMessage();
  });
  it('TC10: Remember me button', () => {
    signInPage.fillEmail(studentEmail);
    signInPage.fillPassword(studentPassword);
    cy.get('[type="button"]').eq(1).click({ force: true });
    signInPage.clickSignIn(true);
    cy.wait(10000);
    signInPage.assertDashboardVisible();
    
  });
});



// import { signInPage } from '../pages/signInPage';

// describe('DSDP - Sign In Suite (POM)', () => {
//   const validEmail = 'testuser@example.com';
//   const validPassword = 'Bulipe@2025';

//   beforeEach(() => {
//     cy.viewport(1366, 768);
//     signInPage.visit();
//     signInPage.goToSignInPage();
//   });

//   it.only('TC1: Valid SignIn', () => {
//     signInPage.signIn(studentEmail, studentPassword);
//     cy.wait(5000);
//     signInPage.assertDashboardVisible();
//   });

//   it('TC2: Invalid email format', () => {
//     LoginPage.enterEmail('invalidEmailFormat');
//     LoginPage.enterPassword(studentPassword);
//     LoginPage.clickSignIn();
//     LoginPage.getEmailValidationMessage().should('contain', "Please include an '@'");
//   });

//   it('TC3: Incorrect password', () => {
//     LoginPage.signIn(studentEmail, 'WrongPassword123');
//     LoginPage.assertInvalidLoginMessage();
//   });

//   it('TC4: Non-existent user', () => {
//     LoginPage.signIn('nonexistentuser@example.com', 'AnyPassword123');
//     LoginPage.assertInvalidLoginMessage();
//   });

//   it('TC5: Empty email and password fields', () => {
//     LoginPage.assertSignInDisabled();
//   });

//   it('TC6: Blank email field', () => {
//     LoginPage.enterPassword(studentPassword);
//     LoginPage.assertSignInDisabled();
//   });

//   it('TC7: Blank password field', () => {
//     LoginPage.enterEmail(studentEmail);
//     LoginPage.assertSignInDisabled();
//   });

//   it('TC8: Password with special characters only', () => {
//     LoginPage.signIn('test@example.com', '!@#$%^&*()');
//     LoginPage.assertInvalidLoginMessage();
//   });

//   it('TC9: Password case sensitivity', () => {
//     LoginPage.signIn(studentEmail, studentPassword.toLowerCase());
//     LoginPage.assertInvalidLoginMessage();
//   });
// });


