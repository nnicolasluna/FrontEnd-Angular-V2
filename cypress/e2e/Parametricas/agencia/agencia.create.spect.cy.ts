describe('agencia template', () => {
    it('Crear agencia', () => {
        cy.visit('http://localhost:4200/home')
        cy.contains('Parametricas').click();
        cy.contains('Agencias').click();
        cy.contains('Agregar').click();
        cy.url().should('include', 'create');
        cy.get('[formControlName="nombre"]').type('aaa')
        cy.get('[formControlName="abreviatura"]').type('aaa')
        cy.get('[formControlName="direccion"]').type('aaa')
        cy.get('[formControlName="telefono"]').type('aaa')
        cy.get('[formControlName="ciudades"]').select('Santa Cruz');
        cy.contains('Guardar').click();
        cy.url().should('include', 'home/agencia-list');
    })
})