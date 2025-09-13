import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

interface DeviceInfo {
  isNative: boolean;
  platform: string;
  isOnline: boolean;
}

export const useDevice = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isNative: false,
    platform: 'web',
    isOnline: navigator.onLine
  });

  useEffect(() => {
    setDeviceInfo({
      isNative: Capacitor.isNativePlatform(),
      platform: Capacitor.getPlatform(),
      isOnline: navigator.onLine
    });

    const handleOnline = () => setDeviceInfo(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setDeviceInfo(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return deviceInfo;
};