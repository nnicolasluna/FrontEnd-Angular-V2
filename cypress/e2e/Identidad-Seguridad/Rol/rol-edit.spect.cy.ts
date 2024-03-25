describe('Rol template', () => {
    it('Editar Rol', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Roles').click();
        cy.get('[data-cy="editar"]').eq(1).click();
        cy.get('[formControlName="nombre"]').type('Cajero GOD')
        cy.contains('Guardar').click();  


    })
})