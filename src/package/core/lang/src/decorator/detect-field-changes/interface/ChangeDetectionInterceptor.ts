export interface ChangeDetectionInterceptor {
    (props: any, name: string|number|symbol, value: any): boolean|void;
}