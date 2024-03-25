describe('Comando template', () => {
    it('Editar Comando', () => {
        cy.visit('http://localhost:4200/home')
        cy.contains('Administracion').click();
        cy.contains('Comandos').click();
        cy.get('[data-cy="editar"]').eq(1).click();
        cy.get('[formControlName="nombre"]').type('Elim')
        cy.contains('Guardar').click();  
       
    })
})