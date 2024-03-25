describe('Tipo template', () => {
    it('Crear Tipo', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="tipodocumentoslist"]').click();
        cy.url().should('include', 'home/tipodocumentolist');
        cy.get('[data-cy="TipoDocEdit"]').eq(1).click();
        cy.get('[formControlName="nombre"]').type('Crear ACC>')


        cy.get('[data-cy="TipoDocEdit"]').click();
        cy.url().should('include', 'home/tipodocumentolist');
       
    })
})