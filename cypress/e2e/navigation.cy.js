/* global describe, it, cy, beforeEach */
/* eslint-env cypress */

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  it('navigates to Card Set page when "Card Set" is clicked', () => {
    cy.url().get('[id="cardSetPage"]').click();
  });

  it('navigates to About page when "About" is clicked', () => {
    cy.url().get('[id="aboutPage"]').click();
  });

  it('navigates to Home page when "Home" is clicked', () => {
    cy.url().get('[id="homePage"]').click();
  });
});
