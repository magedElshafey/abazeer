export interface BreadcrumbItem {
    label: string;
    path: string;
    isDynamic?: boolean;
}

export interface RouteHandle {
    breadcrumb: string;
}