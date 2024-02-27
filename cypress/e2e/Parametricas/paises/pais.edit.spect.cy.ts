describe('Pais template', () => {
    it('Editar Pais', () => {
        cy.visit('http://localhost:4200/home/pais-list')
        cy.get('[data-cy="editar"]').eq(0).click();
        cy.get('[formControlName="nombre"]').type('Gee')
        cy.get('[formControlName="nacionalidad"]').type('Gee')
        cy.get('[formControlName="bandera"]').type('Gee')
        cy.get('[data-cy="editar"]').click();
        cy.url().should('include', 'home/pais-list');
    })
})