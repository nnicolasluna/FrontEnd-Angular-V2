describe('Subsistema template', () => {
    it('Crear Subsistema', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Subsistema').click();
        cy.contains('Agregar').click();
        cy.get('[formControlName="nombre"]').type('Crear Persoas')
        cy.get('[formControlName="descripcion"]').type('Crear Persoa');
        cy.get('[formControlName="link"]').type('/home/subsistemacreate');
        cy.contains('Guardar').click();
       
    })
})