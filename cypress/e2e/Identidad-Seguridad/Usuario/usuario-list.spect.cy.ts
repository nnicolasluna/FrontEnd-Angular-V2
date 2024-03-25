describe('Usuario template', () => {
    it('Listar usuaruis', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Personas').click();
        cy.get('[data-cy="ver"]').eq(1).click();
        cy.contains('Usuario').click();
        cy.contains('Editar Usuario').click();
        cy.get('[formControlName="usuario"]').type('xxxy');
        cy.contains('Guardar').click();  
    })
})