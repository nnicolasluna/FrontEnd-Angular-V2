describe('Estado Civil template', () => {
    it('Editar Estado Civil', () => {
        cy.visit('http://localhost:4200/home/estado-civil-list')
        cy.get('[data-cy="editar"]').eq(2).click();
        cy.get('[formControlName="nombre"]').type('A')
        cy.get('[formControlName="abreviatura"]').type('A')
        cy.get('[data-cy="editar"]').click();
        cy.url().should('include', 'home/estado-civil-list');
    })
})