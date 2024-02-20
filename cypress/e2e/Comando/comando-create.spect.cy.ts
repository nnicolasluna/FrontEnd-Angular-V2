describe('Comando template', () => {
    it('Crear Comando', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="comandoslist"]').click();
        cy.url().should('include', 'home/comandolist');
        cy.get('[data-cy="crearcomando"]').click();
        cy.url().should('include', 'home/comandocreate');
        cy.get('[formControlName="nombre"]').type('Eliminar')
        cy.get('[formControlName="descripcion"]').type('Elimar')
        cy.get('[formControlName="estado"]').select('Activado');
        cy.get('[formControlName="link"]').type('home/comandocreate')
        cy.get('[data-cy="crearcomando"]').click();
        cy.url().should('include', 'home/comandolist');
       
    })
})