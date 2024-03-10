import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
  appName: string
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button type="button" className="text-white bg-blue-500 p-4 shadow rounded">
      {children}
    </button>
  )
}
