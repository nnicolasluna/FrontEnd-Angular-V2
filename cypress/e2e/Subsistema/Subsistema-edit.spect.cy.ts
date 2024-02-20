describe('Subsistema template', () => {
    it('Crear Subsistema', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="subsistemaslist"]').click();
        cy.url().should('include', 'home/subsistemalist');
        cy.get('[data-cy="SubsistemaEdit"]').eq(1).click();
        cy.url().should('include', 'home/subsistemaedit');
        cy.get('[formControlName="nombre"]').type('Borrar Persoas')

        cy.get('[data-cy="SubsistemaCreate"]').click();
        cy.url().should('include', 'home/persubsistemalistsonlist');
       
    })
})