import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import IconCross from './IconCross'

describe('IconCross component', () => {
  it('renders a cross icon', () => {
    const { container } = render(<IconCross />)
    const svg = container.querySelector('svg')
    
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
  })
})