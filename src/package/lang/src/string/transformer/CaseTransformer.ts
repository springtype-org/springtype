export class CaseTransformer {

    static kebabToCamelCase(name: string): string {
        return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
}