/// <reference types="cypress" />

describe('Test suite', () => {
  describe('Field validation', () => {
    describe('Get one specific user', () => {
      it('Should return status 404 when querying the id of a user that does not exist in the database.', () => {
        cy.request({
          url: '/user/100',
          failOnStatusCode: false
        }).its('body').should('have.length', 0)
      })

      it('Should return status 200 when querying the id of a user that is in the database.', () => {
        cy.request({
          url: '/user/1',
          failOnStatusCode: false
        }).its('status').should('eq', 200)
      })
    })
  })
})