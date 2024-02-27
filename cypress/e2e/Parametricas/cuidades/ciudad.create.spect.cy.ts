describe('ciudad template', () => {
    it('Crear ciudad', () => {
        cy.visit('http://localhost:4200/home/ciudad-create')
        cy.get('[formControlName="nombre"]').type('Gaaaaa')
        cy.get('[formControlName="abreviatura"]').type('Gaaaaa')
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/ciudad-list');

    })
})