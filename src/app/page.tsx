'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }
  }, []);

  return null;
}