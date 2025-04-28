export default function classNames(
    mainClass: string,
    mods?: Record<string, boolean>,
    additional?: (string | undefined)[]
): string {

    mods = mods ?? {}
    additional = additional ?? []

    return [
        mainClass,
        ...additional.filter(Boolean),
        Object.entries(mods)
            .filter(([, bool]) => bool)
            .map(([cls]) => cls)
    ].join(' ')
}