describe('Course Management', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should display the course list', () => {
      cy.intercept('GET', 'http://localhost:3000/courses', { fixture: 'courses.json' }).as('getCourses');
      cy.reload();
      cy.wait('@getCourses');
      cy.get('.course-list').should('contain', 'Course 1');
      cy.get('.course-list').should('contain', 'Course 2');
    });
  
    it('should add a new course', () => {
      cy.intercept('POST', 'http://localhost:3000/courses', { id: 3, title: 'New Course', description: 'New Description', duration: '30' }).as('createCourse');
      cy.intercept('GET', 'http://localhost:3000/courses', { fixture: 'coursesAfterAdd.json' }).as('getCoursesAfterAdd');
  
      cy.get('input[name="title"]').type('New Course');
      cy.get('input[name="description"]').type('New Description');
      cy.get('input[name="duration"]').type('30');
      cy.get('button').contains('Save').click();
  
      cy.wait('@createCourse');
      cy.reload();
      cy.wait('@getCoursesAfterAdd');
      cy.get('.course-list').should('contain', 'New Course');
    });
  
    it('should delete a course', () => {
      // Ensure the course list is loaded
      cy.intercept('GET', 'http://localhost:3000/courses', { fixture: 'courses.json' }).as('getCourses');
      cy.reload();
      cy.wait('@getCourses');
  
      // Intercept the DELETE request
      cy.intercept('DELETE', 'http://localhost:3000/courses/1', {}).as('deleteCourse');
      // Intercept the updated GET request to simulate the backend response after deletion
      cy.intercept('GET', 'http://localhost:3000/courses', { fixture: 'coursesAfterDelete.json' }).as('getCoursesAfterDelete');
  
      // Assert the course is present before deletion
      cy.get('.course-list').should('contain', 'Course 1');
  
      // Trigger the delete action
      cy.get('.card').contains('Course 1').parent().find('.btn-danger').click();
      cy.wait('@deleteCourse');
  
      // Wait for the updated GET request and verify the course is deleted
      cy.wait('@getCoursesAfterDelete');
      cy.get('.course-list').should('not.contain', 'Course 1');
    });
    
  });
  