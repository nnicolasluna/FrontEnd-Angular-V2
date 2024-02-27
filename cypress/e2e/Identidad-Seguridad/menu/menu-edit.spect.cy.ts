describe('Menu template', () => {
    it('Editar Menu', () => {
        cy.visit('http://localhost:4200/home')
        cy.url().should('include', 'home');
        cy.get('[data-cy="Administracion"]').click();
        cy.get('[data-cy="menuslist"]').click();
        cy.url().should('include', 'home/menulist');
        cy.get('[data-cy="editarmenu"]').eq(1).click();
        cy.url().should('include', 'home/menuedit');
        cy.get('[formControlName="nombre"]').type('Cajero GOD')
        cy.get('[formControlName="link"]').type('amazon.com')
        cy.get('[formControlName="estado"]').select('Desactivado');
        cy.get('[data-cy="guardarEditarmenu"]').click();
        cy.url().should('include', 'home/menulist');

    })
})