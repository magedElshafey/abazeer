export interface BreadcrumbItem {
    label: string;
    path: string;
    isDynamic?: boolean;
}

export interface BreadcrumbSegmentConfig {
    label: string;
}

export interface BreadcrumbContextProps {
    breadcrumbs: BreadcrumbItem[];
    pushBreadcrumb: (item: BreadcrumbItem) => void;
    popBreadcrumb: () => void;
    clearBreadcrumbs: () => void;
    updateBreadcrumb: (index: number, item: Partial<BreadcrumbItem>) => void;
    generateBreadcrumbsFromPath: (pathname: string) => Promise<void>;
    loading: boolean;
}

export interface RouteHandle {
    breadcrumb: string;
}