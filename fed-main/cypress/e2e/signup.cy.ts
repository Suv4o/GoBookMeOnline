describe('signup', () => {
  before(() => {
    cy.exec('sleep 1')
    cy.exec('npm run database:firebase:drop:test')
    cy.visit('/')
    cy.reload(true)
  })

  it('successful user sighup mobile phone', () => {
    cy.get('[data-testid="Sign up"]').click()
    cy.url().should('include', '/signup')
    cy.get('[data-testid="Full Name"]').type('Foo Bar')
    cy.get('[data-testid="Phone or Email"]').type('+61411111111')
    cy.get('[data-testid="Create a user"]').submit()
    cy.url().should('include', '/phone-verification')
    cy.get('[data-testid="Default Notification"]').should('be.visible')
    cy.get('[data-testid="Notification title"]').should('contain', 'Send')
    cy.get('[data-testid="Notification message"]').should(
      'contain',
      'A verification code has been sent to your mobile number.'
    )
    cy.get('[data-testid="Close Notification"]').click()
    cy.wait(3000)
    cy.get('[data-testid="Verification Code"]').type('221288')
    cy.intercept(Cypress.env('BACKEND_URL') + '/user/signup-phone').as('signupPhone')
    cy.wait('@signupPhone')
    cy.url().should('include', '/?successfully-signed=true')
    cy.url().should('include', '/')
    cy.get('[data-testid="Default Notification"]').should('be.visible')
    cy.get('[data-testid="Notification title"]').should('contain', 'Successfully Signed In!')
    cy.get('[data-testid="Notification message"]').should(
      'contain',
      'Your have been signed in. Make your next booking now!'
    )
    cy.get('[data-testid="Close Notification"]').click()
    cy.get('[data-testid="User Initials Desktop"]').click()
    cy.get('[data-testid="Sign out"]').click()
    cy.get('[data-testid="Sign up"]').should('be.visible')
  })

  it('successful user sighup email', () => {
    cy.get('[data-testid="Sign up"]').click()
    cy.url().should('include', '/signup')
    cy.get('[data-testid="Full Name"]').type('Foo Bar')
    cy.get('[data-testid="Phone or Email"]').type('test@test.com')
    cy.intercept(Cypress.env('BACKEND_URL') + '/user/signup-email').as('signupEmail')
    cy.get('[data-testid="Create a user"]').submit()
    cy.wait('@signupEmail')
    cy.intercept(Cypress.env('BACKEND_URL') + '/user/email-verification').as('sendVerificationEmail')
    cy.wait('@sendVerificationEmail')
    cy.wait(3000)
    cy.url().should('include', '/email-verification')
    // cy.get('[data-testid="Notification title"]').should('contain', 'Send')
    // cy.get('[data-testid="Notification message"]').should(
    //   'contain',
    //   'A verification code has been sent to your mobile number.'
    // )
  })
})
