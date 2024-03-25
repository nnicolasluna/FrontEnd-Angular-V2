describe('Genero template', () => {
    it('Crear Genero', () => {
        cy.visit('http://localhost:4200/home/genero-create')
        cy.get('[formControlName="nombre"]').type('Femenino')
        cy.get('[formControlName="abreviatura"]').type('FM')
        cy.get('[data-cy="crear"]').click();
        cy.url().should('include', 'home/genero-list');

    })
})