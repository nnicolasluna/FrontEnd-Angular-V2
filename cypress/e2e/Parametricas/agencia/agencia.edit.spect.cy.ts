describe('agencia template', () => {
    it('Crear agencia', () => {
        cy.visit('http://localhost:4200/home/agencia-list')
        cy.get('[data-cy="editar"]').eq(0).click();
        cy.get('[formControlName="nombre"]').type('gaaaa')
        cy.get('[formControlName="abreviatura"]').type('gaaaa')
        cy.get('[formControlName="direccion"]').type('gaaaa')
        cy.get('[formControlName="telefono"]').type('gaaaa')
        cy.get('[formControlName="ciudades"]').select('Santa Cruz');
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/agencia-list');

    })
})