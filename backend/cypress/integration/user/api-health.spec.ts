/// <reference types="cypress" />

describe('Test suite', () => {
  describe('Fields validation', () => {
    describe('API Health', () => {
      it('Should return status 200 when querying API status.', () => {
        cy.request('/health').its('status').should('eq', 200)
      })
    })
  })
})