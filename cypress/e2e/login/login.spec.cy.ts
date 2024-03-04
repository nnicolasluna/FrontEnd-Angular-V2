describe('login template', () => {
  it('Visita login', () => {
    cy.visit('http://localhost:4200/login')
   /*  cy.url().should('include', 'login'); */
    cy.get('[formControlName="usuario"]').type('admin');
    cy.get('[formControlName="password"]').type('admin');
    cy.get('button').click();
    cy.url().should('include', 'home');
  })
})

