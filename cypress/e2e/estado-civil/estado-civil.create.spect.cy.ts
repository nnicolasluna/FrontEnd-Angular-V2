describe('Estado Civil template', () => {
    it('Crear Estado Divil', () => {
        cy.visit('http://localhost:4200/home/estado-civil-create')
        cy.get('[formControlName="nombre"]').type('Casado')
        cy.get('[formControlName="abreviatura"]').type('C')
        cy.get('[data-cy="crear"]').click();
        cy.url().should('include', 'home/estado-civil-list');

    })
})