export class CaseTransformer {

    static kebabToCamelCase(name: string): string {
        return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    static camelToKebabCase(name: string): string {
        return name.replace(/[A-Z]/g, (g) => '-' + g[0].toLowerCase());
    }

    static camelCaseToColonCase(name: string): string {
        return name.replace(/[A-Z]/g, (g) => ':' + g[0].toLowerCase());
    }
}