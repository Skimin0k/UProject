import React, {ErrorInfo, ReactNode} from 'react'

interface ErrorBoundaryProps {
    children: ReactNode,
}
interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.

        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo)
    }

    render() {
        const {children} = this.props
        const {hasError} = this.state

        if (hasError) {
            // You can render any custom fallback UI
            // eslint-disable-next-line i18next/no-literal-string
            return <h1>Error</h1>
        }
        return <>{children}</>
    }
}

export default ErrorBoundary