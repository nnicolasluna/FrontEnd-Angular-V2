describe('Comando template', () => {
    it('Crear Comando', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="comandoslist"]').click();
        cy.url().should('include', 'home/comandolist');
        cy.get('[data-cy="editarcomando"]').eq(1).click();
        cy.url().should('include', 'home/comandoedit');
  
        cy.get('[formControlName="uuid"]').select('CajeroCajero GOD');
        cy.get('[data-cy="editarcomando"]').click();
        cy.url().should('include', 'home/comandolist');
       
    })
})