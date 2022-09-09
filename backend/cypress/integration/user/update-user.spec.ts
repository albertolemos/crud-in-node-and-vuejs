/// <reference types="cypress" />

describe('Test suite', () => {
  describe('Fields validation', () => {
    describe('Update user', () => {
      describe('Field name', () => {
        it('Should return an error message (The name field is required) when creating a user without sending name field.', () => {
          cy.request({
            url: '/user/1',
            method: 'put',
            body: {},
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The name field is required.')
        })

        it('It should return an error message (The name field must be of type string) when creating a user with the name field of type array.', () => {
          cy.request({
            url: '/user/1',
            method: 'put',
            body: {
              name: ['name', 'in', 'array']
            },
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The name field must be of type string.')
        })
      })

      describe('E-mail field', () => {
        it('Should return an error message (The email field must be of type string) when creating a user without sending email field.', () => {
          cy.request({
            url: '/user/1',
            method: 'put',
            body: {
              name: 'user 100'
            },
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The email field is required.')
        })

        it('It should return an error message (The email field must be of type string) when creating a user with the email field of type array.', () => {
          cy.request({
            url: '/user/1',
            method: 'put',
            body: {
              name: 'user 100',
              email: ['name', 'in', 'array']
            },
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The email field must be of type string.')
        })
      })
    })
  })
})