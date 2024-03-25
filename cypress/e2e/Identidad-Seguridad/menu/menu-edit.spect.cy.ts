describe('Menu template', () => {
    it('Editar Menu', () => {
        cy.visit('http://localhost:4200/home')
        cy.contains('Administracion').click();
        cy.contains('Menus').click();
        cy.get('[data-cy="editar"]').eq(1).click();
        cy.get('[formControlName="nombre"]').type('Personas');
        cy.contains('Guardar').click();
    })
})