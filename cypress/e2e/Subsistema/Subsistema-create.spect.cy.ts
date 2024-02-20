describe('Subsistema template', () => {
    it('Crear Subsistema', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="subsistemaslist"]').click();
        cy.url().should('include', 'home/subsistemalist');
        cy.get('[data-cy="SubsistemaCreate"]').click();
        cy.url().should('include', 'home/subsistemacreate');
        cy.get('[formControlName="nombre"]').type('Crear Persoas')
        cy.get('[formControlName="descripcion"]').type('Crear Persoa');
        cy.get('[formControlName="link"]').type('/home/subsistemacreate');
        cy.get('[formControlName="estado"]').select('Activado');

        cy.get('[data-cy="SubsistemaCreate"]').click();
        cy.url().should('include', 'home/persubsistemalistsonlist');
       
    })
})