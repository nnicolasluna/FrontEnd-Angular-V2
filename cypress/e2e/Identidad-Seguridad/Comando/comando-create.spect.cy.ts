describe('Comando template', () => {
    it('Crear Comando', () => {
        cy.contains('Administracion').click();
        cy.contains('Comandos').click();
        cy.contains('Agregar').click();
        cy.get('[formControlName="nombre"]').type('Eliminar')
        cy.get('[formControlName="descripcion"]').type('Elimar')
        cy.get('[formControlName="estado"]').select('Activado');
        cy.get('[formControlName="link"]').type('home/comandocreate')
        cy.contains('Guardar').click();  
    })
})


