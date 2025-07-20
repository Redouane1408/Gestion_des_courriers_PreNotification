import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from '@/components/ui/toggle'

describe('Toggle Component', () => {
  it('renders correctly', () => {
    render(<Toggle>Click me</Toggle>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies the correct default classes', () => {
    render(<Toggle>Test</Toggle>)
    const toggle = screen.getByText('Test')
    expect(toggle).toHaveClass('inline-flex')
    expect(toggle).toHaveClass('items-center')
  })

  it('applies variant classes correctly', () => {
    render(<Toggle variant="outline">Outline</Toggle>)
    const toggle = screen.getByText('Outline')
    expect(toggle).toHaveClass('border')
    expect(toggle).toHaveClass('border-input')
  })

  it('applies size classes correctly', () => {
    render(<Toggle size="sm">Small</Toggle>)
    const toggle = screen.getByText('Small')
    expect(toggle).toHaveClass('h-9')
    expect(toggle).toHaveClass('px-2.5')
  })

  it('handles pressed state', async () => {
    const user = userEvent.setup()
    render(<Toggle>Toggle me</Toggle>)
    const toggle = screen.getByText('Toggle me')
    
    // Initial state should not have the 'on' data attribute
    expect(toggle).not.toHaveAttribute('data-state', 'on')
    
    // Click the toggle
    await user.click(toggle)
    
    // After clicking, it should have the 'on' data attribute
    expect(toggle).toHaveAttribute('data-state', 'on')
  })
})