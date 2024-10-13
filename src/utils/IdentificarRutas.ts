export function isRutaActiva(currentPath: string, targetPath: string) {
    const normalizedCurrentPath = currentPath.length > 1 && currentPath.endsWith("/")
        ? currentPath.slice(0, -1)
        : currentPath;

    return (
        normalizedCurrentPath === targetPath ||
        (targetPath !== '/dashboard' && normalizedCurrentPath.startsWith(targetPath + '/'))
    );
}


export function isRutaExacta(currentPath: string, targetPath: string) {
    const normalizedCurrentPath = currentPath.length > 1 && currentPath.endsWith("/")
        ? currentPath.slice(0, -1)
        : currentPath;

    const normalizedTargetPath = targetPath.length > 1 && targetPath.endsWith("/")
        ? targetPath.slice(0, -1)
        : targetPath;

    return normalizedCurrentPath === normalizedTargetPath;
}
