describe('Subsistema template', () => {
    it('Crear Subsistema', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Subsistema').click();
        cy.get('[data-cy="editar"]').eq(1).click();
        cy.get('[formControlName="nombre"]').type('Borrar Persoas')
        cy.contains('Guardar').click();
       
    })
})