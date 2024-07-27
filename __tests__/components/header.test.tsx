import { render } from '@testing-library/react'

import { Header } from '@/components/header'

describe('<Header />', () => {
  it('should be render', () => {
    const { getByText } = render(<Header loading={false} />)

    expect(getByText('CTRL + S to save')).toBeInTheDocument()
  })
})
