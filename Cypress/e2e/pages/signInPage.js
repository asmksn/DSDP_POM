// class SignInPage {
//     visit() {
//       cy.visit('http://20.188.114.175:4000/');
//     }
  
//     goToSignInPage() {
//       cy.contains('button', 'Sign In')
//     //   .click();
//     }
  
//     fillEmail(email) {
//       cy.get('[placeholder="Email"]').type(email);
//     }
  
//     fillPassword(password) {
//       cy.get('[placeholder="Password"]').type(password);
//     }
  
//     clickLogin() {
//       cy.get('button').contains('Sign In').click();
//     }
  
//     fillCredentials(email, password) {
//       this.fillEmail(email);
//       this.fillPassword(password);
//     }
//   }
  
//   export const signInPage = new SignInPage();
  

class SignInPage {
    visit(baseUrl) {
      cy.visit(baseUrl);
    }
  
    fillEmail(email) {
      cy.get('[placeholder="Email"]').type(email);
    }
  
    fillPassword(password) {
      cy.get('[placeholder="Password"]').type(password);
    }
  
    clickSignIn(force = false) {
      if (force) {
        cy.contains('button', 'Sign In').click({ force: true }).wait(500);
      } else {
        cy.contains('button', 'Sign In').click().wait(500);
      }
    }
  
    assertDashboardVisible() {
      cy.contains('Dashboard').should('be.visible');
    }
  
    assertInvalidCredentialsMessage() {
      cy.contains('Password must be at least 8 characters, with uppercase, lowercase, number, and special character.').should('be.visible');
    }
  
    assertEmailValidationMessage() {
      cy.get('input[type="email"]').then(($input) => {
        expect($input[0].validationMessage).to.contain("Please include an '@'");
      });
    }
  
    assertSignInDisabled() {
      cy.contains('button', 'Sign In').should('be.disabled');
    }
  }
  
  export default new SignInPage();
  