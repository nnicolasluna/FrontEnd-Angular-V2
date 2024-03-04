describe('Tipo template', () => {
    it('Crear Tipo', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="tipodocumentoslist"]').click();
        cy.url().should('include', 'home/tipodocumentolist');
        cy.get('[data-cy="TipoDoccreate"]').click();
        cy.get('[formControlName="nombre"]').type('Crear Doc>')
        cy.get('[formControlName="descripcion"]').type('Crear Doc');
        cy.get('[formControlName="estado"]').select('Activado');

        cy.get('[data-cy="TipoDocCreate"]').click();
        cy.url().should('include', 'home/tipodocumentolist');
       
    })
})