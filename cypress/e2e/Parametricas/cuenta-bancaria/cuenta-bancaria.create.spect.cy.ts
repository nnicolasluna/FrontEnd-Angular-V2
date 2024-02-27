describe('cuenta-bancaria template', () => {
    it('Crear cuenta-bancaria', () => {
        cy.visit('http://localhost:4200/home/cuenta-bancaria-create')
        cy.get('[formControlName="numero_cuenta"]').type('gaaa')
        const fechaHora = '2024-02-27T15:30';
        cy.get('[formControlName="fecha_apertura"]').type(fechaHora)
        cy.get('[formControlName="contrato"]').type('gaaa')
        cy.get('[formControlName="tipoCuentasBancarias"]').select('aaa');
        cy.get('[formControlName="entidadesFinancieras"]').select('Banco Fasil');
        cy.get('[formControlName="monedas"]').select('Boliviano');
        cy.get('[formControlName="agencias"]').select('pppp');
        cy.get('[data-cy="guardar"]').click();
        cy.url().should('include', 'home/cuenta-bancaria-list');

    })
})