describe('Usuario template', () => {
    it('Crear usuario', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.contains('Administracion').click();
        cy.contains('Personas').click();
        cy.get('[data-cy="ver"]').eq(1).click();
        cy.contains('Usuario').click();
        cy.contains('Añadir Usuario').click();
        cy.get('[formControlName="usuario"]').type('xxx');
        cy.get('[formControlName="password"]').type('xxx');
        cy.get('[formControlName="correoCorporativo"]').type('admin@gambarte');
        cy.get('[formControlName="correoPersonal"]').type('nnicolasluna@gmail.com');
        cy.contains('Guardar').click();  
    })
})



