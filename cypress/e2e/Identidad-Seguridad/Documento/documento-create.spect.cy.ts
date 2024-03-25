describe('Documento template', () => {
    it('Crear Documento', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Personas').click();
        cy.get('[data-cy="ver"]').eq(1).click();
        cy.contains('Documentos').click();
        cy.contains('Agregar Documento').click();
        cy.get('[formControlName="numero"]').type('La Paz')
        cy.get('[formControlName="tipoDocumentos"]').select('Pasaporte')
        cy.contains('Guardar').click();  
    })
})
