describe('Testing form inputs',()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000")
    });
    it("adding text to inputs and submits the form", ()=>{

        //testing for input type fields

        //add data-cy=name to the form.js label under the name field or email or whatever form field is needed.

        cy.get('[data-cy=name]').type("Eric").should("have.value","Eric");

        cy.get('[data-cy=name]').clear();

         cy.get('[data-cy=email]').type("email@email.com").should("have.value","email@email.com")
         cy.get('[data-cy=email]').clear();
         //text area test

         cy.get('[data-cy=password]').type("Sample text goes here").should("have.value","Sample text goes here");


         //checkbox testing

         cy.get('[data-cy=terms]').check().should("be.checked");

         //submit form testing

        //  cy.get('[data-cy=submit]').click();

       

    });
});