import * as React from 'react'
import { FieldError } from 'react-hook-form'

type FieldWrapperProps = {
    className?: string
    children: React.ReactNode
    error?: FieldError | undefined
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className'>

export const FieldWrapper = (props: FieldWrapperProps) => {
    const { className, error, children } = props
    return (
        <div>
            <div>{children}</div>
            {error?.message && (
                <div
                    role="alert"
                    aria-label={error.message}
                    className={className}
                    style={{
                        marginTop: 4,
                        marginBottom: 0,
                        marginRight: 14,
                        marginLeft: 14,
                        fontSize: '0.75rem',
                        color: '#d32f2f'
                    }}
                >
                    {error.message}
                </div>
            )}
        </div>
    )
}
