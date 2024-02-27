describe('ciudad template', () => {
    it('Editar ciudad', () => {
        cy.visit('http://localhost:4200/home/ciudad-list')
        cy.get('[data-cy="editar"]').eq(0).click();
        cy.get('[formControlName="nombre"]').type('Gaaaaa')
        cy.get('[formControlName="abreviatura"]').type('Gaaaaa')
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/ciudad-list');
    })
})