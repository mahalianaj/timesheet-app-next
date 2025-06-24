'use client';

import { createContext, useContext, useState } from 'react';

type NavigationGuardContextType = {
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (val: boolean) => void;
};

const NavigationGuardContext = createContext<NavigationGuardContextType>({
  hasUnsavedChanges: false,
  setHasUnsavedChanges: () => {},
});

export function NavigationGuardProvider({ children }: { children: React.ReactNode }) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <NavigationGuardContext.Provider value={{ hasUnsavedChanges, setHasUnsavedChanges }}>
      {children}
    </NavigationGuardContext.Provider>
  );
}

export function useNavigationGuard() {
  return useContext(NavigationGuardContext);
}
