describe('tipo-cuenta-bancaria template', () => {
    it('Editar tipo-cuenta-bancaria', () => {
        cy.visit('http://localhost:4200/home/tipo-cuenta-bancaria-list')
        cy.get('[data-cy="editar"]').eq(0).click();
        cy.get('[formControlName="nombre"]').type('gaaaa')
        cy.get('[formControlName="abreviatura"]').type('gaaaa')
        cy.get('[formControlName="descripcion"]').type('gaaaa')
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/tipo-cuenta-bancaria-list');

    })
})