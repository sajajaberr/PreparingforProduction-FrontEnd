/* global describe, it, cy, beforeEach */

describe("Create Set Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
    cy.get('[id="cardSetPage"]').click();
  });

  it("Happy Path - Create Set Form submits successfully with valid title", () => {
    cy.get('[data-cy="set_form"]')
      .should("exist")
      .invoke("removeClass", "notVisible");
    cy.get('[data-cy="set_form"] input[name="titleInput"]').type(
      "New Flashcards Set"
    );
    cy.get('[data-cy="set_form"] input[type="submit"]').click();
    cy.contains("New Flashcards Set").should("exist");
  });

  it("Unhappy Path - Create Set Form shows error on empty submission", () => {
    cy.get('[data-cy="set_form"]')
      .should("exist")
      .invoke("removeClass", "notVisible");
    cy.get('[data-cy="set_form"] input[type="submit"]').click();
    cy.contains("TITLE CANNOT BE EMPTY").should("be.visible");
  });
});

describe("Add Card Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
    cy.get('[id="cardSetPage"]').click();
    // cy.get('[data-cy="1"]').click();
    // cy.get('[class="cardPageContainer"]').should("exist");
    // cy.get("div").invoke("removeClass", "notVisible");
  });

  it("Happy Path - Add Card Form submits successfully for all cards", () => {
    cy.get('[class="cardSets"]').then(($sets) => {
      const count = $sets.length;

      for (let i = 1; i <= count; i++) {
        cy.get(`[data-cy="${i}"]`).click();

        cy.get('[class="cardPageContainer"]').should("exist");
        cy.get("div").invoke("removeClass", "notVisible");

        cy.get('[data-cy="card_form"] input[name="termInput"]').type(
          `Term ${i}`
        );
        cy.get('[data-cy="card_form"] input[name="descriptionInput"]').type(
          `Description ${i}`
        );
        cy.get('[data-cy="card_form"] input[type="submit"]').click();

        cy.contains(`Term ${i}`).should("exist");
        cy.contains(`Description ${i}`).should("exist");

        cy.get('[id="cardSetPage"]').click();
      }
    });
  });

  it("Unhappy Path - shows error on empty term and description in each set", () => {
    cy.visit("http://localhost:1234");
    cy.get('[id="cardSetPage"]').click();

    cy.get(".cardSets").then(($sets) => {
      const count = $sets.length;
      for (let i = 1; i <= count; i++) {
        cy.get(`[data-cy="${i}"]`).click();
        cy.get(".cardPageContainer").should("exist");
        cy.get("div").invoke("removeClass", "notVisible");
        cy.get('[data-cy="card_form"] input[type="submit"]').click();
        cy.contains("TERM AND DESCRIPTION CANNOT BE EMPTY").should(
          "be.visible"
        );
        cy.get('[id="cardSetPage"]').click();
      }
    });
  });

  it("Unhappy Path - shows error on empty term", () => {
    cy.visit("http://localhost:1234");
    cy.get('[id="cardSetPage"]').click();

    cy.get(".cardSets").then(($sets) => {
      const count = $sets.length;
      for (let i = 1; i <= count; i++) {
        cy.get(`[data-cy="${i}"]`).click();
        cy.get(".cardPageContainer").should("exist");
        cy.get("div").invoke("removeClass", "notVisible");
        cy.get('[data-cy="card_form"] input[name="descriptionInput"]').type(
          "Artificial Intelligence"
        );
        cy.get('[data-cy="card_form"] input[type="submit"]').click();
        cy.contains("TERM CANNOT BE EMPTY").should("be.visible");
        cy.get('[id="cardSetPage"]').click();
      }
    });
  });

  it("Unhappy Path - shows error on empty description", () => {
    cy.visit("http://localhost:1234");
    cy.get('[id="cardSetPage"]').click();

    cy.get(".cardSets").then(($sets) => {
      const count = $sets.length;
      for (let i = 1; i <= count; i++) {
        cy.get(`[data-cy="${i}"]`).click();
        cy.get(".cardPageContainer").should("exist");
        cy.get("div").invoke("removeClass", "notVisible");
        cy.get('[data-cy="card_form"] input[name="termInput"]').type("AI");
        cy.get('[data-cy="card_form"] input[type="submit"]').click();
        cy.contains("DESCRIPTION CANNOT BE EMPTY").should("be.visible");
        cy.get('[id="cardSetPage"]').click();
      }
    });
  });
});
