'use client';

import { useEffect, useState } from 'react';
import { useOSStore, WindowType } from '@/lib/store';
import { Wifi, Battery, Volume2, Search, Power, Monitor, Lock, LogOut, RotateCcw, ChevronLeft, ChevronRight, Bluetooth, Moon, Sun, Settings, User, ChevronRight as ChevronRightIcon, Terminal, Folder, Mail, FileText, LayoutGrid } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export function TopBar() {
  const [time, setTime] = useState(new Date());
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(80);
  const { setStatus, openWindow } = useOSStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps: { id: WindowType; name: string; icon: any }[] = [
    { id: 'terminal', name: 'Terminal', icon: Terminal },
    { id: 'projects', name: 'Files', icon: Folder },
    { id: 'about', name: 'Profile', icon: User },
    { id: 'contact', name: 'Contact', icon: Mail },
    { id: 'resume', name: 'Resume', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const start = startOfWeek(startOfMonth(calendarDate));
  const end = endOfWeek(endOfMonth(calendarDate));
  const calendarDays = eachDayOfInterval({ start, end });

  const QuickToggle = ({ icon: Icon, label, status, active }: { icon: any, label: string, status?: string, active?: boolean }) => (
    <div className="flex flex-col gap-1 items-center">
      <button 
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-[#E95420] text-white' : 'bg-white/10 hover:bg-white/20 text-white/90'}`}
      >
        <Icon className="w-5 h-5" />
      </button>
      <span className="text-[11px] text-white/70">{label}</span>
    </div>
  );

  return (
    <div className="h-8 bg-[#1d1d1d] flex items-center justify-between px-4 text-[13px] text-white font-normal select-none z-[100] shadow-md relative">
      <div className="flex items-center gap-2 sm:gap-6">
        <div 
          className={`hover:bg-white/10 px-2 sm:px-3 py-1 rounded transition-colors cursor-pointer font-medium text-xs sm:text-[13px] ${isActivitiesOpen ? 'bg-white/20' : ''}`}
          onClick={() => {
            setIsActivitiesOpen(!isActivitiesOpen);
            setIsCalendarOpen(false);
            setIsQuickSettingsOpen(false);
          }}
        >
          Activities
        </div>
      </div>

        <div 
          className={`absolute left-1/2 -translate-x-1/2 hover:bg-white/10 px-2 sm:px-3 py-1 rounded transition-colors cursor-pointer whitespace-nowrap text-xs sm:text-[13px] ${isCalendarOpen ? 'bg-white/20' : ''}`}
          onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
            setIsQuickSettingsOpen(false);
          }}
        >
          <span>{format(time, 'MMM d  h:mm a')}</span>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <div 
            className={`flex items-center gap-1.5 sm:gap-4 hover:bg-white/10 px-2 sm:px-3 py-1 rounded-full transition-colors cursor-pointer ${isQuickSettingsOpen ? 'bg-white/20' : ''}`}
            onClick={() => {
              setIsQuickSettingsOpen(!isQuickSettingsOpen);
              setIsCalendarOpen(false);
            }}
          >
            <div className="flex items-center gap-1.5 sm:gap-3">
              <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <Battery className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>

          <AnimatePresence>
            {isActivitiesOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsActivitiesOpen(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, x: -10, y: -5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -10, y: -5 }}
                  className="absolute top-9 left-1 sm:left-2 w-[240px] max-w-[calc(100vw-1rem)] bg-[#2d2d2d] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                >
                  <div className="p-2">
                    <div className="px-3 py-2 text-[11px] font-bold text-white/40 uppercase tracking-wider">
                      Frequent Apps
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {apps.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => {
                            openWindow(app.id);
                            setIsActivitiesOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-3 py-2 hover:bg-white/10 rounded-md transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#E95420]/20 transition-colors">
                            <app.icon className="w-4 h-4 text-white/80 group-hover:text-[#E95420] transition-colors" />
                          </div>
                          <span className="text-sm font-medium text-white/90">{app.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-1 border-t border-white/5 p-2 bg-white/5">
                    <button className="flex items-center gap-3 w-full px-3 py-2 hover:bg-white/10 rounded-md transition-colors text-white/70 group">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                        <LayoutGrid className="w-4 h-4" />
                      </div>
                      <span className="text-sm">Show Applications</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
  
            {isCalendarOpen && (
  
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsCalendarOpen(false)} 
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-9 left-1/2 -translate-x-1/2 w-[calc(100vw-1rem)] sm:w-[400px] bg-[#2d2d2d] border border-white/10 rounded-lg shadow-2xl p-4 z-50 backdrop-blur-md flex flex-col sm:flex-row gap-4 overflow-y-auto max-h-[80vh]"
              >
                {/* Notifications Side */}
                <div className="flex-1 sm:border-r border-white/10 sm:pr-4 flex flex-col items-center justify-center text-white/50 py-4 sm:py-0">
                  <span className="text-xs">No Notifications</span>
                </div>
  
                {/* Calendar Side */}
                <div className="w-full sm:w-[200px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-xs">
                      {format(calendarDate, 'MMMM yyyy')}
                    </span>
                    <div className="flex gap-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCalendarDate(subMonths(calendarDate, 1));
                        }}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCalendarDate(addMonths(calendarDate, 1));
                        }}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
  
                  <div className="grid grid-cols-7 gap-y-2 text-center text-[10px]">
                    {days.map(day => (
                      <div key={day} className="text-white/40 font-medium">{day}</div>
                    ))}
                    {calendarDays.map((day, i) => (
                      <div 
                        key={i}
                        className={`
                          py-1 rounded-full cursor-default
                          ${!isSameMonth(day, calendarDate) ? 'text-white/20' : 'text-white/80'}
                          ${isSameDay(day, new Date()) ? 'bg-orange-500 text-white font-bold' : 'hover:bg-white/10'}
                        `}
                      >
                        {format(day, 'd')}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
  
          {isQuickSettingsOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsQuickSettingsOpen(false)} 
              />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-9 right-1 sm:right-2 w-[calc(100vw-1rem)] sm:w-[320px] bg-[#2d2d2d] border border-white/10 rounded-2xl shadow-2xl z-50 backdrop-blur-xl overflow-hidden"
              >
              <div className="p-4 flex flex-col gap-6">
                {/* Sliders Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-white/70" />
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full relative group cursor-pointer">
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#E95420] rounded-full" 
                        style={{ width: `${volume}%` }}
                      />
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#E95420] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `calc(${volume}% - 6px)` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sun className="w-4 h-4 text-white/70" />
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full relative group cursor-pointer">
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#E95420] rounded-full" 
                        style={{ width: `${brightness}%` }}
                      />
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#E95420] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `calc(${brightness}% - 6px)` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Toggles Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 hover:bg-white/15 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-[#E95420] flex items-center justify-center">
                      <Wifi className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium">Wi-Fi</span>
                      <span className="text-[10px] text-white/50">Connected</span>
                    </div>
                    <ChevronRightIcon className="w-3 h-3 ml-auto text-white/30 group-hover:text-white/60" />
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 hover:bg-white/15 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Bluetooth className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium">Bluetooth</span>
                      <span className="text-[10px] text-white/50">Off</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 hover:bg-white/15 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Moon className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium">Night Light</span>
                      <span className="text-[10px] text-white/50">Off</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 hover:bg-white/15 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-[#E95420] flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium">Dark Mode</span>
                      <span className="text-[10px] text-white/50">On</span>
                    </div>
                  </div>
                </div>

                {/* Battery & System Row */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer">
                    <Battery className="w-4 h-4" />
                    <span className="text-[11px]">85% - 4h 32m remaining</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="bg-white/5 p-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <Settings className="w-4 h-4 text-white/80" />
                  </button>
                  <button 
                    onClick={() => setStatus('locked')}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <Lock className="w-4 h-4 text-white/80" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setStatus('booting')}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-white/80" />
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="w-9 h-9 rounded-full bg-[#E95420] hover:bg-[#D44413] flex items-center justify-center transition-colors"
                  >
                    <Power className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}

      </AnimatePresence>
    </div>
  );
}
