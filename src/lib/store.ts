import { create } from 'zustand';

export type WindowType = 'terminal' | 'projects' | 'about' | 'contact' | 'settings' | 'resume' | 'imageViewer';

export interface WindowState {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface OSState {
  status: 'booting' | 'desktop' | 'locked';
  bootProgress: number;
  activeWindowId: WindowType | null;
  windows: Record<WindowType, WindowState>;
  terminalQueue: { id: WindowType | null; cmd: string } | null;
  resumeSection: string | null;
  imageUrl: string | null;
  
  // Actions
  setStatus: (status: OSState['status']) => void;
  setBootProgress: (progress: number | ((prev: number) => number)) => void;
  openWindow: (id: WindowType, section?: string, imageUrl?: string) => void;
  queueAppLaunch: (id: WindowType) => void;
  queueTerminalCommand: (cmd: string) => void;
  clearTerminalQueue: () => void;
  closeWindow: (id: WindowType) => void;
  minimizeWindow: (id: WindowType) => void;
  maximizeWindow: (id: WindowType) => void;
  focusWindow: (id: WindowType) => void;
  setResumeSection: (section: string | null) => void;
  setImageUrl: (url: string | null) => void;
}

const initialWindows: Record<WindowType, WindowState> = {
  terminal: { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 100 },
  projects: { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 101 },
  about: { id: 'about', title: 'Profile', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 105 },
  contact: { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 102 },
  resume: { id: 'resume', title: 'Resume', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 103 },
  settings: { id: 'settings', title: 'Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 104 },
  imageViewer: { id: 'imageViewer', title: 'Image Viewer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 100 },
};

export const useOSStore = create<OSState>((set, get) => ({
  status: 'booting',
  bootProgress: 0,
  activeWindowId: null,
  windows: initialWindows,
  terminalQueue: null,
  resumeSection: null,
  imageUrl: null,

    setStatus: (status) => set((state) => {
      if (status === 'booting' || status === 'locked') {
        // Reset windows when booting or locking
        return { 
          status,
          windows: Object.keys(state.windows).reduce((acc, id) => ({
            ...acc,
            [id]: { ...state.windows[id as WindowType], isOpen: false, isMinimized: false, isMaximized: false }
          }), {} as Record<WindowType, WindowState>),
          activeWindowId: null,
          terminalQueue: null
        };
      }
      return { status };
    }),

  setBootProgress: (progress) => set((state) => ({ 
    bootProgress: typeof progress === 'function' ? progress(state.bootProgress) : progress 
  })),

  openWindow: (id, section, imageUrl) => set((state) => {
    const maxZ = Math.max(...Object.values(state.windows).map(w => w.zIndex), 100);
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: maxZ + 1 }
      },
      activeWindowId: id,
      resumeSection: section || null,
      imageUrl: imageUrl || null
    };
  }),

    queueAppLaunch: (id) => set((state) => {
      const maxZ = Math.max(...Object.values(state.windows).map(w => w.zIndex), 100);
      return { 
        terminalQueue: { id, cmd: `./launch-${id}.sh` },
        windows: {
          ...state.windows,
          terminal: { ...state.windows.terminal, isOpen: true, isMinimized: false, zIndex: maxZ + 1 }
        },
        activeWindowId: 'terminal'
      };
    }),

    queueTerminalCommand: (cmd) => set((state) => {
      const maxZ = Math.max(...Object.values(state.windows).map(w => w.zIndex), 100);
      return {
        terminalQueue: { id: null, cmd },
        windows: {
          ...state.windows,
          terminal: { ...state.windows.terminal, isOpen: true, isMinimized: false, zIndex: maxZ + 1 }
        },
        activeWindowId: 'terminal'
      };
    }),

    clearTerminalQueue: () => set({ terminalQueue: null }),

  closeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: false, isMinimized: false, isMaximized: false }
    },
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true }
    },
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
    }
  })),

  focusWindow: (id) => set((state) => {
    const maxZ = Math.max(...Object.values(state.windows).map(w => w.zIndex), 100);
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: false, zIndex: maxZ + 1 }
      },
      activeWindowId: id
    };
  }),

  setResumeSection: (section) => set({ resumeSection: section }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
}));
