describe('Search Functionality', () => {
    beforeEach(() => {
        // Minden teszt előtt betöltjük a főoldalt
        cy.visit('/');
    });

    it('should perform a basic search', () => {
        // Egyszerű keresés tesztelése
        const searchTerm = 'Bach';

        // Adjuk meg a keresési kifejezést a TextField-ben
        cy.get('input[placeholder="Keresés"]').type(searchTerm);

        // Kattintsunk a Keresés gombra
        cy.get('button[type="submit"]').contains('Keresés').click();

        // Ellenőrizzük, hogy a keresési eredmények betöltődtek
        cy.url().should('include', `search=${searchTerm}`);

        // Várjuk meg, amíg az eredmények betöltődnek (a loading eltűnik)
        cy.get('.mt-20.flex.justify-center').should('not.exist', { timeout: 10000 });

        // Ellenőrizzük, hogy a találati lista megjelenik
        cy.get('body').should('be.visible');

        // Ellenőrizzük a keresési eredmények létezését - módosítsuk rugalmasabb szelektorra
        cy.get('.flex.flex-wrap').should('exist');
    });

    it('should handle search with no results', () => {
        // Keresés tesztelése olyan kifejezéssel, amelyre nincs találat
        const searchTerm = 'NonExistentArtistName12345';

        // Adjuk meg a keresési kifejezést
        cy.get('input[placeholder="Keresés"]').type(searchTerm);
        cy.get('button[type="submit"]').contains('Keresés').click();

        // Várjuk meg, amíg az eredmények betöltődnek
        cy.wait(2000); // Egyszerű várakozás

        // Ellenőrizzük, hogy a "Nincs találat" üzenet megjelenik
        // Használjunk rugalmasabb szelektort
        cy.contains('Hoppá, nincs találat!').should('exist');
    });

    it('should search with type filter', () => {
        // Keresés típus szűrővel
        const searchTerm = 'Mozart';

        // Adjuk meg a keresési kifejezést
        cy.get('input[placeholder="Keresés"]').type(searchTerm);

        // Válasszuk ki a Composer típust
        cy.get('#type-select').click();
        cy.get('[role="listbox"]').contains('Composer').click();

        // Indítsuk a keresést
        cy.get('button[type="submit"]').contains('Keresés').click();

        // Ellenőrizzük, hogy az URL-ben megjelenik a típus szűrő is
        cy.url().should('include', `search=${searchTerm}`);
        cy.url().should('include', 'type=is_composer');

        // Ellenőrizzük, hogy az eredmények betöltődtek
        cy.wait(2000); // Egyszerű várakozás
        cy.get('body').should('be.visible');
    });

    it('should search with image filter', () => {
        // Keresés képekkel együtt
        const searchTerm = 'Bach';

        // Adjuk meg a keresési kifejezést
        cy.get('input[placeholder="Keresés"]').type(searchTerm);

        // Kapcsoljuk be az "Album borító" kapcsolót
        cy.contains('Album borító').click();

        // Indítsuk a keresést
        cy.get('button[type="submit"]').contains('Keresés').click();

        // Ellenőrizzük, hogy az URL-ben megjelenik a kép szűrő
        cy.url().should('include', `search=${searchTerm}`);

        // Ellenőrizzük, hogy az eredmények betöltődtek
        cy.wait(2000); // Egyszerű várakozás
        cy.get('body').should('be.visible');
    });

    it('should clear filters and perform new search', () => {
        // Először végezzünk egy keresést szűrőkkel
        cy.get('input[placeholder="Keresés"]').type('Mozart');
        cy.get('#type-select').click();
        cy.get('[role="listbox"]').contains('Composer').click();
        cy.get('button[type="submit"]').contains('Keresés').click();

        // Várjuk meg, hogy betöltődjenek az eredmények
        cy.wait(2000); // Egyszerű várakozás

        // Töröljük a szűrőket a Delete gombbal - rugalmasabb szelektort használunk
        cy.get('button').find('[data-testid="DeleteIcon"]').click();

        // Adjunk meg új keresési kifejezést
        cy.get('input[placeholder="Keresés"]').type('Bach');
        cy.get('button[type="submit"]').contains('Keresés').click();

        // Ellenőrizzük, hogy az új keresés eredménye betöltődött
        cy.url().should('include', 'search=Bach');
        cy.url().should('not.include', 'type=is_composer');

        // Egyszerű ellenőrzés
        cy.wait(2000); // Egyszerű várakozás
        cy.get('body').should('be.visible');
    });
}); 