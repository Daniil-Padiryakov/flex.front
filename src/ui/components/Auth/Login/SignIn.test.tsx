import { render } from '@testing-library/react'
import SignIn from './SignIn'

describe('when rendered', () => {
    it('should contain Signin form', function () {
        const { getByText } = render(<SignIn />)
    })
})
