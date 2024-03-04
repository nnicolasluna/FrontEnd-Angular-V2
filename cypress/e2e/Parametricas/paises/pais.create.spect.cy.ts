describe('entidad-financiera template', () => {
    it('Crear entidad-financiera', () => {
        cy.visit('http://localhost:4200/home/entidad-financiera-create')
        cy.get('[formControlName="nombre"]').type('Gaaaaa')
        cy.get('[formControlName="abreviatura"]').type('Gaaaaa')
        cy.get('[formControlName="descripcion"]').type('Gaaaaa')
        cy.get('[formControlName="tipoEntidadesFinancieras"]').select('IntitucionGaaaaa');
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/entidad-financiera-list');

    })
})