describe('Genero template', () => {
    it('Editar Genero', () => {
        cy.visit('http://localhost:4200/home/genero-list')
        cy.get('[data-cy="editar"]').eq(1).click();
        cy.get('[formControlName="nombre"]').type('A')
        cy.get('[formControlName="abreviatura"]').type('A')
        cy.get('[data-cy="editar"]').click();
        cy.url().should('include', 'home/genero-list');
    })
})