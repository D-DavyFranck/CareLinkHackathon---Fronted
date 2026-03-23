'use client';

import * as React from 'react';
import { MoonIcon, SunIcon, DesktopIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center bg-secondary p-1 rounded-lg">
        <div className="p-1.5 rounded-md text-muted-foreground">
          <SunIcon className="w-4 h-4" />
        </div>
        <div className="p-1.5 rounded-md text-muted-foreground">
          <MoonIcon className="w-4 h-4" />
        </div>
        <div className="p-1.5 rounded-md text-muted-foreground">
          <DesktopIcon className="w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-secondary p-1 rounded-lg">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md transition-all ${
          theme === 'light' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <SunIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md transition-all ${
          theme === 'dark' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <MoonIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md transition-all ${
          theme === 'system' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <DesktopIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
