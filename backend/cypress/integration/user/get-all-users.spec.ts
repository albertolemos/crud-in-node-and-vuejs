/// <reference types="cypress" />

describe('Test suite', () => {
  describe('Field validation', () => {
    describe('Get all users', () => {
      it('Should return status 200 when querying all users that are in the database.', () => {
        cy.request('/users').its('status').should('eq', 200)
      })
    })
  })
})