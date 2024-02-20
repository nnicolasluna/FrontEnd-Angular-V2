describe('persona template', () => {
    it('Editar Personas', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="personaslist"]').click();
        cy.url().should('include', 'home/personlist');
        cy.get('[data-cy="personaver"]').eq(1).click();
        cy.url().should('include', 'home/personprofile');
        // Editar Persona
        cy.get('[data-cy="personaeditar"]').click();
        cy.get('[formControlName="primer_apellido"]').type('Mamani');
        cy.get('[data-cy="personaedit"]').click();
    })
})
