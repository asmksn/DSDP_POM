// module.exports = {
//   e2e: {
//     supportFile: 'cypress/support/e2e.js',//
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// };


// cypress.config.js
 
const { defineConfig } = require("cypress");
 
module.exports = defineConfig({
  viewportHeight:1080,
  viewportWidth:1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/e2e.js',
    // …other config
  },
});
 