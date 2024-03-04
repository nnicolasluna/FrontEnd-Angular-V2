describe('tipo-entidad-financiera template', () => {
    it('Crear tipo-entidad-financiera', () => {
        cy.visit('http://localhost:4200/home/tipo-entidad-finaciera-create')
        cy.get('[formControlName="nombre"]').type('Gaaaaa')
        cy.get('[formControlName="abreviatura"]').type('Gaaaaa')
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/tipo-entidad-finaciera-list');

    })
})