// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2022-2023 Dyne.org foundation <foundation@dyne.org>.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

describe("LocationMenu component", () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  it("should change the language to french", () => {
    cy.visit("/");

    // Getting "fr" language
    // (The order of languages in included in LocationMenu.tsx)
    getMenu().select(2);
    cy.wait(2000);
    cy.url().should("include", "/fr");
  });

  it("should check that text between two languages is different", () => {
    // Getting text from a button
    const item = "#homeTitle";

    cy.get(item).then(el => {
      // Saving text from an item, in order to check its change
      const text = el.text();

      // Getting "de" lang
      getMenu().select(1);
      cy.wait(2000);
      cy.url().should("include", "/de");

      // Getting text again from the same item
      cy.get(item).then(el => {
        // Checking that they're different
        expect(el.text()).not.to.eq(text);
      });
    });
  });
});

function getMenu() {
  return cy.get("select");
}

function getTitle() {
  return cy.get("div.mt-40").get(".logo");
}
