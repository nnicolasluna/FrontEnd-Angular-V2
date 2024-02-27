describe('corte template', () => {
    it('Crear corte', () => {
        cy.visit('http://localhost:4200/home/corte-list')
        cy.get('[data-cy="editar"]').eq(0).click();
        cy.get('[formControlName="valor"]').type('1')
        cy.get('[formControlName="orden"]').type('1')
        cy.get('[formControlName="monedas"]').select('Boliviano');
        cy.get('[formControlName="tipoCortes"]').select('Gaaaaa');
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/corte-list');

    })
})