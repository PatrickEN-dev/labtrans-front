"use client";

import React from "react";

interface NoSSRProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente para evitar renderização no servidor de componentes
 * que podem causar problemas de hidratação devido a extensões de browser
 */
export function NoSSR({ children, fallback = null }: NoSSRProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div suppressHydrationWarning>{fallback}</div>;
  }

  return <div suppressHydrationWarning>{children}</div>;
}
