describe('moneda template', () => {
    it('Crear moneda', () => {
        cy.visit('http://localhost:4200/home/moneda-create')
        cy.get('[formControlName="nombre"]').type('Gaaaaa')
        cy.get('[formControlName="abreviatura"]').type('Gaaaaa')
        cy.get('[formControlName="descripcion"]').type('Gaaaaa')
        cy.get('[formControlName="pais"]').select('Gaaaaa');
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/moneda-list');

    })
})