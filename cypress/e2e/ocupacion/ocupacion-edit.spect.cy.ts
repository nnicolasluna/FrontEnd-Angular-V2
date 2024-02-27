describe('ocupacion template', () => {
    it('Crear ocupacion', () => {
        cy.visit('http://localhost:4200/home/ocupacion-list')
        cy.get('[data-cy="editar"]').eq(2).click();
        cy.get('[formControlName="nombre"]').type('A')
        cy.get('[formControlName="descripcion"]').type('A')
        cy.get('[data-cy="editarOcupacion"]').click();
        cy.url().should('include', 'home/ocupacion-list');

    })
})