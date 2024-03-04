describe('Usuario template', () => {
    it('Crear usuario', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="personaslist"]').click();
        cy.url().should('include', 'home/personlist');
        cy.get('[data-cy="personaver"]').eq(1).click();
        cy.url().should('include', 'home/personprofile');
        /* cy.get('[data-cy="usuariover"]').click(); */
        cy.get('[aria-posinset="4"]').click();
        cy.get('[data-cy="usuariocreate"]').click();
        cy.get('[formControlName="usuario"]').type('admin');
        cy.get('[formControlName="password"]').type('admin');
        cy.get('[formControlName="correoCorporativo"]').type('admin@gambarte');
        cy.get('[formControlName="correoPersonal"]').type('nnicolasluna@gmail.com');
        cy.get('[formControlName="estado"]').select('Activado');
        cy.get('[data-cy="usuariocreate"]').click();
    })
})



