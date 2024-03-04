describe('entidad-financiera template', () => {
    it('Crear entidad-financiera', () => {
        cy.visit('http://localhost:4200/home/entidad-financiera-create')
        cy.get('[formControlName="nombre"]').type('gaaaa')
        cy.get('[formControlName="abreviatura"]').type('gaaaa')
        cy.get('[formControlName="descripcion"]').type('gaaaa')
        cy.get('[formControlName="tipoEntidadesFinancieras"]').select('GaaaaaGaaaaa');
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/entidad-financiera-list');

    })
})