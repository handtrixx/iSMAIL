'use client';
import Link from 'next/link';
import styles from './styles.module.css';

interface TabsProps {
  availableTabs: { label: string; id: string; link: string }[];
  activeTab?: string;
}

export function CortexTabs({ availableTabs, activeTab }: TabsProps) {
  return (
    <div className={styles.tabWrapper}>
      {availableTabs.map(tab => (
        <Link
          className={`${styles.tabContainer} ${activeTab === tab.id ? styles.active : ''}`}
          key={tab.id}
          href={tab.link}
        >
          <div
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          >
            {tab.label}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CortexTabs;

