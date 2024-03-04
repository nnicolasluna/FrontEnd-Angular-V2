describe('entidad-financiera template', () => {
    it('editar entidad-financiera', () => {
        cy.visit('http://localhost:4200/home/entidad-financiera-list')
        cy.get('[data-cy="editar"]').eq(0).click();
        cy.get('[formControlName="nombre"]').type('gaaaa')
        cy.get('[formControlName="abreviatura"]').type('gaaaa')
        cy.get('[formControlName="descripcion"]').type('gaaaa')
        cy.get('[formControlName="tipoEntidadesFinancieras"]').select('GaaaaaGaaaaa');
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/entidad-financiera-list');

    })
})