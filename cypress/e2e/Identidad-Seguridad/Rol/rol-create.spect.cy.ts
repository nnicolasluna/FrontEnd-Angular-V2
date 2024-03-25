describe('Rol template', () => {
    it('Crear Rol', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Roles').click();
        cy.contains('Agregar').click();
         // Crear rolea
        cy.get('[formControlName="nombre"]').type('Cajero')
        cy.get('[formControlName="descripcion"]').type('Cajero')
        cy.get('[formControlName="nivel"]').type('9');
        cy.contains('Guardar').click();
       
    })
})