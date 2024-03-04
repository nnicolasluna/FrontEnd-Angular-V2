describe('ocupacion template', () => {
    it('Crear ocupacion', () => {
        cy.visit('http://localhost:4200/home/ocupacion-create')
        cy.get('[formControlName="nombre"]').type('Veterinario')
        cy.get('[formControlName="descripcion"]').type('Vet')
        cy.get('[data-cy="crear-ocupacion"]').click();
        cy.url().should('include', 'home/ocupacion-list');

    })
})