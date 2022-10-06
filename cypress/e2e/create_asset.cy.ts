describe("when user visits create asset", () => {
    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });

    // beforeEach(() => {
    //     cy.visit("");
    //     cy.restoreLocalStorage();
    // });

    // it.skip('it should create tags', function () {
    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.visit('http://localhost:3000/create_asset');
    //     cy.get(':nth-child(6) > div.w-full.form-control > textarea').type('one two three');
    //     cy.get(':nth-child(3) > .badge-primary').should('have.text', 'xone');
    //     cy.get(':nth-child(3) > .badge-error').should('have.text', 'xtwo');
    //     cy.get(':nth-child(3) > .badge-accent').should('have.text', 'xthree');
    //     /* ==== End Cypress Studio ==== */
    // });

    it("sad", () => {
        cy.visit("/create_asset");
        /* ==== Generated with Cypress Studio ==== */
        cy.get('form.w-full > :nth-child(1) > .w-full').clear('F');
        cy.get('form.w-full > :nth-child(1) > .w-full').type('Fabulaser');
        cy.get('.sec-md > .section-container').click();
        cy.get(':nth-child(3) > .flex-auto > span.label-text').click();
        cy.get(':nth-child(3) > .radio').check();
        cy.get('.mb-3').click();
        cy.get('#dropzone-file').click();
        cy.get(':nth-child(6) > .form-control > .w-full').click();
        cy.get('.badge-primary > .btn').click();
        cy.get(':nth-child(6) > .form-control > .w-full').click();
        cy.get('#react-select-13-placeholder').click();
        cy.get('#react-select-13-option-1').click();
        cy.get('.md\\:col-start-8').click();
        cy.get(':nth-child(9) > .w-full').clear('12');
        cy.get(':nth-child(9) > .w-full').type('12');
        cy.get('.gap-2 > :nth-child(1) > .w-full').clear('F');
        cy.get('.gap-2 > :nth-child(1) > .w-full').type('Fatto');
        cy.get('#react-select-11-placeholder').click();
        cy.get('#react-select-11-input').clear();
        cy.get('#react-select-11-input').type('online{enter}');
        cy.get(':nth-child(5) > .w-full').clear('gi');
        cy.get(':nth-child(5) > .w-full').type('git.com/miao');
        cy.get('.css-qc6sy-singleValue').click();
        cy.get('.gap-2 > :nth-child(1) > .w-full').clear('Fatto');
        cy.get(':nth-child(9) > .w-full').clear('12');
        cy.get(':nth-child(9) > .w-full').type('12');
        cy.get(':nth-child(2) > .border > .css-v2jqz2-control').click();
        cy.get('#react-select-11-input').clear();
        cy.get('.md\\:col-start-8').click();
        cy.get(':nth-child(2) > .border > .css-v2jqz2-control > .css-etm973-ValueContainer').click();
        cy.get('.md\\:col-start-8').click();
        /* ==== End Cypress Studio ==== */
    });

    // it('Should see contributors', () => {
    //     cy.visit('/create_asset')
    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get('.relative > .w-full').clear('p');
    //     cy.get('.relative > .w-full').type('p');
    //     cy.get(':nth-child(8) > .select > option').should('have.value', '061KG1HB4P3GXVEMZJD6D3EB78');
    //     /* ==== End Cypress Studio ==== */
    // });

    // /* ==== Test Created with Cypress Studio ==== */
    // it('it should create a new asset', function() {
    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.visit('http://localhost:3000/create_asset');
    //     cy.get('form.w-full > :nth-child(1) > .w-full').clear('C');
    //     cy.get('form.w-full > :nth-child(1) > .w-full').type('Asset');
    //     cy.get('textarea[name="textarea"]').type('new asset')
    //     cy.get(':nth-child(2) > .radio').check();
    //     cy.get(':nth-child(5) > .w-full').clear('re');
    //     cy.get(':nth-child(5) > .w-full').type('repo/repo');
    //     cy.get(':nth-child(6) > .form-control > .w-full').click();
    //     cy.get('form.w-full > .grid > :nth-child(1) > .w-full').clear('l');
    //     cy.get('form.w-full > .grid > :nth-child(1) > .w-full').type('location');
    //     cy.get('form.w-full > .grid > :nth-child(2) > .w-full').clear();
    //     cy.get('form.w-full > .grid > :nth-child(2) > .w-full').type('location');
    //     cy.get(':nth-child(9) > .w-full').clear('1');
    //     cy.get(':nth-child(9) > .w-full').type('1');
    //     /* ==== End Cypress Studio ==== */
    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get('form.w-full > .btn').should('be.enabled');
    //     cy.get('form.w-full > .btn').should('have.text', 'Save');
    //     cy.get('form.w-full > .btn').click();
    //     cy.get('form.w-full > .btn').should('have.text', 'Go to the asset');
    //     cy.get('form.w-full > .btn').should('be.visible');
    //     /* ==== End Cypress Studio ==== */
    // });

    /* ==== Test Created with Cypress Studio ==== */
});
