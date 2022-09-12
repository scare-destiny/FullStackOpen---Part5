describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Zhenka Venger',
			username: 'zhenka',
			password: 'salainen',
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('Login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('Login').click()
			cy.get('#username').type('zhenka')
			cy.get('#password').type('salainen')
			cy.get('#login-button').click()

			cy.contains('Zhenka Venger logged in')
		})

		it('fails with wrong credentials', function () {
			cy.contains('Login').click()
			cy.get('#username').type('zhenka')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()

			cy.get('.error').contains('wrong username or password')
			cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
		})
	})
	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'zhenka', password: 'salainen' })
		})

		it('A blog can be created', function () {
			cy.contains('new blog').click()

			cy.get('#newTitle').type('Wonderful Day')
			cy.get('#newAuthor').type('Steven King')
			cy.get('#newUrl').type('http://localhost:3000/')
			cy.contains('save').click()

			cy.contains('Wonderful Day Steven King')
		})
		describe('and a blog exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'Barvinky',
					author: 'Mykola Stus',
          url: 'slavaukraine.com',
          likes: 0
				})
			})
			it('a user can like a blog', function () {
				cy.contains('show').click()
				cy.contains('like').click()

				cy.contains('likes: 1')
			})
			it('a user can delete a blog', function () {
				cy.contains('show').click()
        cy.contains('delete').click()
        
        cy.get('html').should('not.contain', 'Barvinky Mykola Stus')
      })
      it('other users cannot delete the blog', function () {
        const user = {
          name: 'Han',
          username: 'chengishan',
          password: 'bro',
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.login({ username: 'chengishan', password: 'bro' })

        cy.contains('show').click()
        cy.contains('delete').click()

        cy.get('html').should('contain', 'Barvinky Mykola Stus')
      })
    })
    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Barvinky',
          author: 'Mykola Stus',
          url: 'slavaukraine.com',
          likes: 0
        })
        cy.createBlog({
          title: 'Selo i lyudy',
          author: 'Franko',
          url: 'slavaukraine.com',
          likes: 20
        })
        cy.createBlog({
          title: 'Groznyy',
          author: 'Huy',
          url: 'slavaukraine.com',
          likes: 99
        })
      })
      it.only('blogs are ordered according to likes', function () {
        cy.get('.blog').eq(0).should('contain', 'Groznyy Huy')
        cy.get('.blog').eq(2).should('contain', 'Barvinky Mykola Stus')
			})
    })
	})
})
