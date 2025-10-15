export interface BreadcrumbItem {
    label: string;
    path: string;
    isDynamic?: boolean;
    queryKey?: string[];
    parameter?: string;
    display_attribute?: string;
}

export interface RouteHandle {
    breadcrumb: string;
    queryKey?: string[];
    display_attribute?: string;
}