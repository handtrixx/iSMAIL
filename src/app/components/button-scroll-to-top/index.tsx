'use client';
import React from 'react';
import Link from 'next/link';
import { MdKeyboardArrowUp } from 'react-icons/md';
import styles from './styles.module.css';

export default function ScrollToTopButton() {


  return (
    // Add this as a temporary test button
  

    <Link
      type="button"
      className={styles.scrollToTopButton}
      href="#content"
      aria-label="Scroll to top"
    >
      <MdKeyboardArrowUp size="24px" />
    </Link>
 
  );
}