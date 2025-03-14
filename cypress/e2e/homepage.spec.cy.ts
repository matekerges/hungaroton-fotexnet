describe('Homepage Test', () => {
    it('should load the homepage successfully', () => {
        // Főoldal meglátogatása
        cy.visit('http://localhost:3000');

        // Ellenőrizzük, hogy a főoldal betöltődött
        cy.get('body').should('be.visible');

        // Más ellenőrzések is hozzáadhatók itt, pl. cím ellenőrzése, elemek jelenléte stb.
        // Az alkalmazás specifikus elemei alapján
    });
}); 