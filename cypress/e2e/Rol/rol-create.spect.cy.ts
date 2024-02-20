describe('Rol template', () => {
    it('Crear Rol', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="roleslist"]').click();
        cy.url().should('include', 'home/rolelist');
         // Crear rolea
        cy.get('[data-cy="rolcreate"]').click();
        cy.url().should('include', 'home/rolecreate');
        cy.get('[formControlName="nombre"]').type('Cajero')
        cy.get('[formControlName="descripcion"]').type('Cajero')
        cy.get('[formControlName="estado"]').select('Activado');
        cy.get('[data-cy="Addsubsistema"]').click();
        cy.get('[formControlName="uuid"]').select('Contaduria');
        cy.get('[data-cy="crearrol"]').click();
     /*    cy.url().should('include', 'home/personlist'); */
       
    })
})