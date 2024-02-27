describe('Menu template', () => {
    it('Crear Menu', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="menuslist"]').click();
        cy.url().should('include', 'home/menulist');
        // Crear rolea
        cy.get('[data-cy="agregarmenu"]').click();
        cy.url().should('include', 'home/menucreate');
        cy.get('[formControlName="nombre"]').type('Cajero')
        cy.get('[formControlName="descripcion"]').type('Cajero')
        cy.get('[formControlName="link"]').type('google.com')
        cy.get('[formControlName="estado"]').select('Activado');
        cy.get('[formControlName="uuid"]').select('Contaduria');
        cy.get('[data-cy="crearmenu"]').click();
        cy.url().should('include', 'home/menulist');

    })
})