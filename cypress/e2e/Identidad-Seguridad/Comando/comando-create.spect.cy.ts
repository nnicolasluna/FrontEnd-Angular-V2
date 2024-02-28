describe('Comando template', () => {
    it('Crear Comando', () => {
        cy.visit('http://localhost:4200/home/comandocreate')
        cy.get('[formControlName="nombre"]').type('Eliminar')
        cy.get('[formControlName="descripcion"]').type('Elimar')
        cy.get('[formControlName="estado"]').select('Activado');
        cy.get('[formControlName="link"]').type('home/comandocreate')
        cy.get('[data-cy="crearcomando"]').click();
        cy.url().should('include', 'home/comandolist');
       
    })
})


