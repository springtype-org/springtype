import {RouterOutlet} from "../RouterOutlet";
import {Routes} from "./Routes";

export interface RouterImpl {
    getParams(): any;
    getPath(): string;
    registerRoutes(routes: Routes): void;
    onLocationChange(): Promise<void>;
    disable(): void;
    enable(): void;
    navigate(path: string, params: any): void;
    registerRouterOutlet(routerOutlet: RouterOutlet): void;
    reload(): void;
    refresh(): void;
}
