describe('persona template', () => {
    it('Editar Personas', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Personas').click();
        cy.get('[data-cy="ver"]').eq(1).click();
        // Editar Persona
        cy.contains('Editar Datos Personales').click();
        cy.get('[formControlName="primer_apellido"]').type('Mamani');
        cy.contains('Guardar').click();  ;
    })
})
