import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { renderWithProviders } from 'test-utils'
import SignUp from './SignUp'

export const handlers = [
    rest.get('auth/login', (req, res, ctx) => {
        return res(ctx.json(''), ctx.delay(150))
    }),
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('when rendered', () => {
    it('should contain Signup form', function () {
        renderWithProviders(<SignUp />)
    })
})
