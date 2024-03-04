describe('Rol template', () => {
    it('Editar Rol', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="roleslist"]').click();
        cy.url().should('include', 'home/rolelist');
        cy.get('[data-cy="roleditar"]').eq(0).click();
        // Crear rolea
        cy.url().should('include', 'home/roledit');
        cy.get('[formControlName="nombre"]').type('Cajero GOD')
        cy.get('[formControlName="estado"]').select('Desactivado');

        cy.get('[data-cy="guardarroleditado"]').click();
        cy.url().should('include', 'home/rolelist');

    })
})