describe('agencia template', () => {
    it('Crear agencia', () => {
        cy.visit('http://localhost:4200/home/agencia-create')
        cy.get('[formControlName="nombre"]').type('gaaaa')
        cy.get('[formControlName="abreviatura"]').type('gaaaa')
        cy.get('[formControlName="direccion"]').type('gaaaa')
        cy.get('[formControlName="telefono"]').type('gaaaa')
        cy.get('[formControlName="ciudad"]').select('Santa Cruz');
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/agencia-list');

    })
})