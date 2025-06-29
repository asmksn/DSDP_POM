class CoursePage {
    login(email, password) {
      cy.get('[placeholder="Email"]').type(email);
      cy.get('[placeholder="Password"]').type(password);
      cy.contains('button', 'Sign In').click({ force: true }).wait(5000);
    }

    goToProgram() {
      cy.contains('Program').click({ force: true }).wait(500);
      cy.contains('Programs List').should('be.visible');
    }
    
    createProgram(programName) {
      cy.contains('+ Add new program').click({ force: true }).wait(1500);
      cy.get('[placeholder="Type here"]').eq(0).type(programName);
  
      cy.contains('Select country').click();
      cy.get('[placeholder="Search"]').type('bangla')
      cy.contains('Bangladesh').click();
      cy.get('[placeholder="Type here"]').eq(1).type('This is a test program description.');
      cy.get('[type="submit"]').click({ force: true }).wait(1000);
      cy.contains(programName).should('be.visible');
    }
  
    goToCourses() {
      cy.contains('Course').click({ force: true }).wait(1500);
      cy.contains('Courses List').should('be.visible');
    }
  
    createCourse(courseName, filePath, programName) {
      cy.contains('+ Add new course').click({ force: true }).wait(1500);
      cy.get('[placeholder="Type here..."]').eq(0).type(courseName);
  
      cy.contains('Select program').click();
      cy.get('[placeholder="Search..."]').type(programName).type('{downarrow}{enter}');
  
      cy.get('[placeholder="Type here"]').eq(0).type('This is a test course description.');
      cy.get('[placeholder="Type here"]').eq(1).type('This is a test course Objective for course.');
      cy.get('[placeholder="Type here"]').eq(2).type('This is a test course Outcome  for course.');
  
      cy.contains('Upload File').click({ force: true }).wait(500).attachFile(filePath);
  
      cy.get('[name="durationInHour"]').eq(0).clear().type('20');
      cy.get('[name="durationInHour"]').eq(1).clear().type('40');
  
      cy.contains('Create Course').click({ force: true }).wait(10000);
      // cy.contains('Close').click({ force: true }).wait(1000);
    }
  
    addCourseModule(title, description) {
      cy.contains('+ Add Course Module').click({ force: true }).wait(500);
      cy.get('[name="moduleTitle"]').type(title);
      cy.get('[rows="4"]').type(description);
      cy.contains('Add Module').click({ force: true }).wait(500);
    }
  
    submitCourse() {
      cy.contains('button', 'Submit').click({ force: true }).wait(1000);
    }
  
    verifyCourseVisible(courseName) {
      cy.contains(courseName).should('be.visible');
    }
  
    deleteCourse(courseName) {
      cy.get('tbody tr').contains(courseName).parents('tr').then($row => {
        cy.wrap($row).find('button').eq(1).click().wait(5000);
      });
    }
  
    searchCourse(courseName) {
      cy.get('[placeholder="Search"]').type(courseName).wait(1000);
    }
  
    verifyCourseNotExist(courseName) {
      cy.contains(courseName).should('not.exist');
    }

    addCoursePrice(courseName, programName) {
      cy.visit('http://20.188.114.175:4000/dashboard/programs/course-price').wait(1000);


      cy.get('[type="button"]').eq(0).click();
      cy.get('[placeholder="Search..."]').type(programName).type('{downarrow}{enter}');
      cy.contains('All').click({ force: true });
      cy.get('[placeholder="Search..."]').type(courseName).wait(300).type('{enter}');
      cy.get('[placeholder="Type here"]').type(20000).wait(300);
      cy.contains('Submit').click({ force: true });

      cy.contains('Course price updated successfully').should('be.visible');
      cy.contains('Close').click({ force: true });
    }

    
    addBatch(courseName) {
      cy.contains('Batches').click({ force: true }).wait(1000);
      cy.contains('Add New Batch').click({ force: true }).wait(1000);
      cy.contains('Select course').click({ force: true });      
      cy.get('[placeholder="Search..."]').type(courseName).type('{downarrow}{enter}').wait(500);

      
      cy.contains('Select days').click({ force: true });
      cy.contains('Sunday').click({ force: true }).wait(300);
      cy.get('[id="title"]').eq(5).click({ force: true }).type(20).wait(1000);


      // Set Start Date
      cy.setInputValue(1, '2025-01-05').wait(300);

      // Set End Date
      cy.setInputValue(2, '2025-01-08').wait(300);

      // Set Start Time
      cy.setInputValue(3, '09:00').wait(300);

      // Set End Time
      cy.setInputValue(4, '11:59').wait(300);


      // const dates = ['2025-01-05', '2025-01-08'];

      // dates.forEach((date, index) => {
      //   cy.get('[id="title"]').eq(index + 1)
      //     .invoke('val', date)
      //     .trigger('change');
      // });


      // // cy.get('[id="title"]').eq(1).click({ force: true }).type('0105{rightarrow}2025{enter}');
      // // cy.get('[id="title"]').eq(2).click({ force: true }).type('0108{rightarrow}2025{enter}');
      // cy.get('[id="title"]').eq(3).click({ force: true }).type('0900A{enter}');
      // cy.get('[id="title"]').eq(4).click({ force: true }).type('1159A{enter}');



      cy.contains('Submit').click({ force: true });

      cy.contains('Batch added successfully').should('be.visible');
      cy.contains('Close').click({ force: true });
    }

    
    fillEmail(email) {
      cy.get('[placeholder="Email"]').type(email);
    }
  
    fillPassword(password) {
      cy.get('[placeholder="Password"]').type(password);
    }
  
    clickSignIn(force = false) {
      if (force) {
        cy.contains('button', 'Sign In').click({ force: true });
      } else {
        cy.contains('button', 'Sign In').click();
      }
    }
    courseEnrollment(trainingCenterName){
      cy.contains('Enroll').click({ force: true }).wait(2000);
      cy.contains('Select city').click()
      cy.get('[placeholder="Search..."]').type('dhaka').type('{downarrow}{enter}');
      cy.get('.text-gray-500').click({ force: true }).wait(1000);
      cy.get('[class="w-5 h-5 transition-transform "]').eq(2).click();
      
      cy.get('[placeholder="Search..."]').type(trainingCenterName).type('{downarrow}{enter}');
      cy.contains(trainingCenterName).click({ force: true });
      cy.get('[type="radio"]').click({ force: true });
      cy.contains('Proceed').click({ force: true });
      cy.contains('Pay Now').should('be.visible');
      cy.contains('Pay Now').click({ force: true }).wait(4000);

    }
  }
  
  export default new CoursePage();
  