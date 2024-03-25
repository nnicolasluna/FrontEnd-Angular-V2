describe('Menu template', () => {
    it('Crear Menu', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Menus').click();
        cy.contains('Agregar').click();
        cy.get('[formControlName="nombre"]').type('Cajero')
        cy.get('[formControlName="descripcion"]').type('Cajero')
        cy.get('[formControlName="link"]').type('google.com')
        cy.get('[formControlName="uuid"]').select('Parametricas')
        cy.contains('Guardar').click();

    })
})