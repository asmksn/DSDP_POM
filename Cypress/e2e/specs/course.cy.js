import coursePage from '../pages/coursePage';

const baseUrl = 'http://172.188.17.213:4000/';

const AdminEmail = 'kibria.qa.bulipe@gmail.com';
const AdminPassword = 'Bulipe@25';

const TCEmail = 'asmksn.sqa@gmail.com';
const TCPassword = 'Bulipe@25';
const trainingCenterName = 'ABC Training Center';

const studentEmail = 'shohanshohoz10@gmail.com';
const studentPassword = 'Bulipe@25';


const filePath = 'Attachments/QA_Course.jpg';
// const CourseName = 'QA Course ' + Math.floor(Math.random() * 1000);
// const programName = 'SQA Program ' + Math.floor(Math.random() * 1000);
const rand = () => Math.random().toString(36).replace(/[^a-z.]/g, '').slice(0, 5);
const CourseName = 'QA Course ' + rand();
const programName = 'SQA Program ' + rand();

describe('DSDP Course Create & Delete', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(baseUrl).wait(2000);
  });

  it.only('TC1: Create a Program and course', () => {
    coursePage.login(AdminEmail, AdminPassword);
    coursePage.goToProgram();
    coursePage.createProgram(programName);
  // });

  // it('TC2: Create a Course', () => {
    // coursePage.login(AdminEmail, AdminPassword);
    coursePage.goToCourses();
    coursePage.createCourse(CourseName, filePath, programName);

    coursePage.addCourseModule('Test Module 1', 'description for module 1');
    coursePage.addCourseModule('Test Module 2', 'description for module 2');
    coursePage.addCourseModule('Test Module 3', 'description for module 3');

    coursePage.submitCourse();
    coursePage.verifyCourseVisible(CourseName);
  });

  // it('TC3: Delete added Course', () => {
  //   coursePage.login(AdminEmail, AdminPassword);
  //   coursePage.goToCourses();
  //   coursePage.searchCourse(CourseName);
  //   coursePage.deleteCourse(CourseName);
  //   coursePage.verifyCourseNotExist(CourseName);
  // });

  //Add course price to visible in course list
  it('TC3: Add Course Price', () => {
    coursePage.login(AdminEmail, AdminPassword);
    coursePage.addCoursePrice(CourseName, programName);
  });

 

  // Create batch of newly created course
  it('TC4: Batch Create', () => {
    cy.get('[placeholder="Email"]').type(TCEmail);
    cy.get('[placeholder="Password"]').type(TCPassword);
    cy.contains('button', 'Sign In').click({ force: true });
    cy.wait(5000);
    coursePage.addBatch(CourseName, trainingCenterName);

  })

   // Enroll to newly created course as student
   it('TC5: Course Enroll ', () => {
    cy.get('[placeholder="Email"]').type(studentEmail);
    cy.get('[placeholder="Password"]').type(studentPassword);
    cy.contains('button', 'Sign In').click({ force: true });
    cy.wait(5000);
    cy.contains('Browse Courses').click({ force: true }).wait(2000);
    cy.contains(CourseName).should('be.visible').click({ force: true }).wait(2000);
    
    // cy.contains(CourseName).should('be.visible').click({ force: true }).wait(2000);

    coursePage.courseEnrollment(trainingCenterName);

  })

});
