export interface BreadcrumbItem {
    label: string;
    path: string;
    isDynamic?: boolean;
    queryKey?: string[];
    parameter?: string
}

export interface RouteHandle {
    breadcrumb: string;
    queryKey?: string[];
}