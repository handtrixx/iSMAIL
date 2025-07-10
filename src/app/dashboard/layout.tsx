'use server';
import React from 'react';
import MiniDrawer from '@/app/ui/navigation';

export default async function Layout({ children }) {
  return <MiniDrawer />;
}
