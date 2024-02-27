describe('Usuario template', () => {
    it('Listar usuaruis', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="usuarioslist"]').click();
        cy.url().should('include', 'home/userlist');
      
    })
})