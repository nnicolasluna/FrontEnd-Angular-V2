describe('tipo-corte template', () => {
    it('Crear tipo-corte', () => {
        cy.visit('http://localhost:4200/home/tipo-corte-create')
        cy.get('[formControlName="nombre"]').type('Gaaaaa')
        cy.get('[formControlName="abreviatura"]').type('Gaaaaa')
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/tipo-corte-list');

    })
})