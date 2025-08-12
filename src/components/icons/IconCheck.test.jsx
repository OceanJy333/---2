import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import IconCheck from './IconCheck'

describe('IconCheck component', () => {
  it('renders a check icon', () => {
    const { container } = render(<IconCheck />)
    const svg = container.querySelector('svg')
    
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
  })
})