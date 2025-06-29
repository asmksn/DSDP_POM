import 'cypress-file-upload'; // Import the file upload plugin
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore errors that contain NEXT_REDIRECT
    if (err.message.includes('NEXT_REDIRECT')) {
      return false; // Prevent Cypress from failing the test
    }
    // Allow other errors to fail the test
    return true;
  });

// Cypress.Commands.add('setInputValue', (index, value) => {
//   cy.get('[id="title"]').eq(index)
//     .invoke('val', value)
//     .trigger('change');
// });
  
Cypress.Commands.add('setInputValue', (index, value) => {
  cy.get('[id="title"]').eq(index)
    .clear()
    .type(value);
});
