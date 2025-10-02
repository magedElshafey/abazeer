import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { segmentConfig } from "../config/segmentConfig";
import type { BreadcrumbContextProps, BreadcrumbItem } from "../types/breadcrumb.types";


// Context
const BreadcrumbContext = createContext<BreadcrumbContextProps | undefined>(undefined);

// Provider Props
interface BreadcrumbProviderProps {
  children: React.ReactNode;
}

// Provider Component
export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Generate breadcrumbs from pathname
  const generateBreadcrumbsFromPath = useCallback(async (pathname: string) => {
    setLoading(true);
    
    try {
      const segments = pathname.split('/').filter(Boolean);
      const newBreadcrumbs: BreadcrumbItem[] = [
        { label: "home", path: "/" }
      ];

      let currentPath = "";
      
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;
        
        // Check if segment has configuration
        const config = segmentConfig[segment];
        
        if (config) {
          newBreadcrumbs.push({
            label: config.label,
            path: currentPath
          });
        } else {
          // Fallback for unknown segments - convert to lowercase for translation key
          const fallbackLabel = segment.toLowerCase().replace(/-/g, '_');
          newBreadcrumbs.push({
            label: fallbackLabel,
            path: currentPath
          });
        }
      }
      
      setBreadcrumbs(newBreadcrumbs);
    } catch (error) {
      console.error('Error generating breadcrumbs:', error);
    } finally {
      setLoading(false);
    }
  }, []);


  // Actions
  const pushBreadcrumb = useCallback((item: BreadcrumbItem) => {
    setBreadcrumbs(prev => [...prev, item]);
  }, []);

  const popBreadcrumb = useCallback(() => {
    setBreadcrumbs(prev => prev.slice(0, -1));
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbs([]);
  }, []);

  const updateBreadcrumb = useCallback((index: number, item: Partial<BreadcrumbItem>) => {
    setBreadcrumbs(prev => 
      prev.map((breadcrumb, i) => 
        i === index ? { ...breadcrumb, ...item } : breadcrumb
      )
    );
  }, []);

  // Generate breadcrumbs when location changes
  useEffect(() => {
    generateBreadcrumbsFromPath(location.pathname);
  }, [location.pathname, generateBreadcrumbsFromPath]);

  const contextValue: BreadcrumbContextProps = {
    breadcrumbs,
    pushBreadcrumb,
    popBreadcrumb,
    clearBreadcrumbs,
    updateBreadcrumb,
    generateBreadcrumbsFromPath,
    loading
  };

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

// Hook
export const useBreadcrumb = (): BreadcrumbContextProps => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};

export default BreadcrumbProvider;
