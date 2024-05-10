describe('Login', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-testid="Login_image"]').should('exist')
    cy.get('[data-testid="Login_image_1"]').should('exist')
    cy.get('[data-testid="text-title"]').should('exist').should('have.text', "Welcome to Distress")
    cy.get('[data-testid="text-paragraph"]').should('exist').should('have.text', "Swift and reliable emergency responses: your safety is our priority. Trust us for quick assistance when you need it most.")
    cy.get('[type="checkbox"]').check()
    cy.get('[data-testid="checkbox-desc"]').should('exist').should('have.text','I want to receive emails about events, product updates and company announcements.')
    cy.get('[data-testid="terms-condition-desc"]').should('exist').should('have.text','By creating an account, you agree to our terms and conditions andprivacy policy.')
    cy.get('button').click()

    cy.intercept('GET', '/api/auth/session').as('fetchRequest')

    cy.log('Waiting for fetch request...')

    cy.wait('@fetchRequest', { timeout: 10000 }).then((interception) => {
      if (interception && interception.response && interception.response.statusCode === 200) {
        
        cy.getCookie('next-auth.session-token.value').then((cookie) => {
          if (cookie) {
            cy.log('Session cookie found:', cookie)
          } else {
            console.error('Session cookie not found')
          }
        })
        cy.log('Fetch request successful. Redirecting...')
        cy.visit('http://localhost:3000/')
        
      } else {
        console.error('Fetch request failed or intercepted data is undefined')
      }
    })
  })
})
