describe('Comando template', () => {
    it('Crear Comando', () => {
        cy.visit('http://localhost:4200/home/comandolist')
        cy.get('[data-cy="editar"]').eq(0).click();
        cy.get('[data-cy="editarcomando"]').click();
        cy.url().should('include', 'home/comandolist');
       
    })
})