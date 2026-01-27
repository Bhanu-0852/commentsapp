import {render, screen} from '@testing-library/react'
import App from './App'

test('renders comments heading', () => {
  render(<App />)
  expect(screen.getByText(/comments/i)).toBeInTheDocument()
})
