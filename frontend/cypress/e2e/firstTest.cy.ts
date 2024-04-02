describe('chemify todo', () => {
  it('renders defualt elements on the screen', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-testid="cypress-main-title"]').should('exist').should('have.text', 'Todos')
  })

  it('rendres the todo list on the screen', () => {
     cy.visit('http://localhost:5173/')
  })
})

describe('TodoList Component', () => {
  it('renders all list items', () => {
    // Mock the API response
    cy.intercept('GET', 'http://localhost:8080/todos', {
      fixture: 'todos.json' 
    }).as('getTodos');

    // Visit the page
      cy.visit('http://localhost:5173/')

    // Wait for the API call to complete
    cy.wait('@getTodos');
    
    // Now you can assert the list based on the mocked response
    cy.get('[data-testid^="todo-"]').should('have.length.at.least', 1);
  });
});

describe('Create Todo Form', () => {
  it('displays the form when the "Create Todo" button is clicked', () => {
    cy.visit('http://localhost:5173/')

    cy.contains('button', 'Create Todo').click();

    cy.get('form[data-testid="create-todo-form"]').should('be.visible');

    cy.get('input[name="title"]').should('exist');

  });
});

