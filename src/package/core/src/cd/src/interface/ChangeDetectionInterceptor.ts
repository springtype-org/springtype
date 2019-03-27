export interface ChangeDetectionInterceptor {
    (props: any, name: string|number|symbol, value: any, instance?: any): boolean|void;
}