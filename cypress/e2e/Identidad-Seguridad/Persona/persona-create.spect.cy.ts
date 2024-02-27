describe('persona template', () => {
    it('Visita login', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="personaslist"]').click();
        cy.url().should('include', 'home/personlist');
         // Crear Persona
        cy.get('[data-cy="personacreate"]').click();
        cy.url().should('include', 'home/personcreate');
        cy.get('[formControlName="nombres"]').type('debb')
        cy.get('[formControlName="primer_apellido"]').type('Luna')
        cy.get('[formControlName="segundo_apellido"]').type('valdivia')
        cy.get('[formControlName="estado_civil"]').type('soltera')
        cy.get('[formControlName="fecha_nacimiento"]').clear().type('1994-02-04')
        cy.get('[formControlName="lugar_nacimiento"]').type('La Paz')
        cy.get('[formControlName="genero"]').type('Masculino')
        cy.get('[formControlName="ocupacion"]').type('mas')
        cy.get('[formControlName="celular"]').type('31313113')
        cy.get('[data-cy="crearpersona"]').click();
        cy.url().should('include', 'home/personlist');
       
    })
})