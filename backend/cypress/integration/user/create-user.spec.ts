/// <reference types="cypress" />

describe('Test suite', () => {
  describe('Fields validation', () => {
    describe('Create new user', () => {
      describe('Field name', () => {
        it('Should return an error message (The name field is required) when creating a user without sending name field.', () => {
          cy.request({
            url: '/user',
            method: 'post',
            body: {},
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The name field is required.')
        })

        it('It should return an error message (The name field must be of type string) when creating a user with the name field of type array.', () => {
          cy.request({
            url: '/user',
            method: 'post',
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
            url: '/user',
            method: 'post',
            body: {
              name: 'user 100'
            },
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The email field is required.')
        })


        it('It should return an error message (The email field must be of type string) when creating a user with the email field of type array.', () => {
          cy.request({
            url: '/user',
            method: 'post',
            body: {
              name: 'user 100',
              email: ['name', 'in', 'array']
            },
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The email field must be of type string.')
        })
      })

      describe('Academic Register field', () => {
        it('Should return an error message (The ra field must be of type string) when creating a user without sending ra field.', () => {
          cy.request({
            url: '/user',
            method: 'post',
            body: {
              name: 'user 100',
              email: 'user@provider.com'
            },
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The ra field is required.')
        })

        it('It should return an error message (The ra field must be of type string) when creating a user with the ra field of type array.', () => {
          cy.request({
            url: '/user',
            method: 'post',
            body: {
              name: 'user 100',
              email: 'user@provider.com',
              ra: 1020
            },
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The ra field must be of type string.')
        })

      })
      describe('CPF field', () => {
        it('Should return an error message (The ra field must be of type string) when creating a user without sending CPF field.', () => {
          cy.request({
            url: '/user',
            method: 'post',
            body: {
              name: 'user 100',
              email: 'user@provider.com',
              ra: '1020'
            },
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The cpf field is required.')
        })

        it('It should return an error message (The ra field must be of type string) when creating a user with the CPF field of type array.', () => {
          cy.request({
            url: '/user',
            method: 'post',
            body: {
              name: 'user 100',
              email: 'user@provider.com',
              ra: '1020',
              cpf: [12345678901]
            },
            failOnStatusCode: false
          }).its('body.message').should('eq', 'The cpf field must be of type string.')
        })
      })
    })
  })
})