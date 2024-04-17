describe('persona template', () => {
    it('Visita login', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Personas').click();
        cy.contains('Agregar').click();
         // Crear Persona
        cy.get('[formControlName="nombres"]').type('Joel')
        cy.get('[formControlName="primer_apellido"]').type('Luna')
        cy.get('[formControlName="segundo_apellido"]').type('valdivia')
        cy.get('[formControlName="estadosCiviles"]').select('Soltero')
        cy.get('[formControlName="fecha_nacimiento"]').clear().type('1994-02-04')
        cy.get('[formControlName="lugar_nacimiento"]').type('La Paz')
        cy.get('[formControlName="generos"]').select('Masculino')
        cy.get('[formControlName="ocupaciones"]').select('Profesor')
        cy.get('[formControlName="celular"]').type('31313113')
        cy.contains('Guardar').click();  
    })
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