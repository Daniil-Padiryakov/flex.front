import { render } from '@testing-library/react'
import SignIn from './SignIn'
import { AppDispatch } from '../../../../store/store'

jest.mock('../../../../store/reducers/thunks/auth', () => ({
    login: jest.fn(),
}))

jest.mock('../../../../store/reducers/AuthSlice', () => ({
    authSlice: jest.fn(),
}))

jest.mock('../../../../store/store', () => ({
    store: jest.fn(),
    useAppDispatch: jest.fn(),
}))

const dispatch: AppDispatch = jest.fn()

describe('when rendered', () => {
    it('should contain Signin form', function () {
        const { getByText } = render(<SignIn />)
        expect(getByText('Username:')).toBeInTheDocument()
        expect(getByText('Password:')).toBeInTheDocument()
        expect(getByText('Login')).toBeInTheDocument()
    })
})
