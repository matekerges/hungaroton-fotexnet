/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<void>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<void>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Egyedi parancsok definiálása, amelyeket a tesztekben használhatunk

// Példa: Bejelentkezési parancs
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

// Példa: Művész keresés
Cypress.Commands.add('searchArtist', (artistName: string) => {
    cy.get('input[type="search"]').type(artistName);
    cy.get('button[type="submit"]').click();
});

// Példa: Műfaj szűrés
Cypress.Commands.add('filterByGenre', (genre: string) => {
    cy.get('select#genre-filter').select(genre);
});

// TypeScript definíciók hozzáadása az egyedi parancsokhoz
declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<Element>
            searchArtist(artistName: string): Chainable<Element>
            filterByGenre(genre: string): Chainable<Element>
        }
    }
}

export { };