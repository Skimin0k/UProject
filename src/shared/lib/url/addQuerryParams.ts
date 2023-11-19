export const getQuerryParams = (params: Record<string, string>) => {
    const existingParams = new URLSearchParams()
    Object.entries(params).forEach(([name, value]) => {
        existingParams.set(name, value)
    })
    return `?${existingParams.toString()}`
}
export const addQuerryParams = (params: string) => {
    window.history.pushState(null, '', params)
}