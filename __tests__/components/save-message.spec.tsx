import { render } from '@testing-library/react'

import { SaveMessage } from '@/components/save-message'

describe('<Header />', () => {
  it('should be render', () => {
    const { getByText } = render(
      <SaveMessage>
        <></>
      </SaveMessage>,
    )

    expect(getByText('CTRL + S to save')).toBeInTheDocument()
  })
})
