export default function classNames (mainClass: string, mods?: Record<string, boolean>, additional?: string[]): string{
    return [
        mainClass,
        ...additional,
        Object.entries(mods).filter(([, bool]) => bool).map(([cls]) => cls)
    ].join(' ')
}