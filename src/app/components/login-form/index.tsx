'use client';
import React from 'react';
import Link from 'next/link';
import { useActionState } from 'react';
import { authenticate } from '../../lib/actions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import { FaGithub } from 'react-icons/fa';
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineTextDecrease,
  MdOutlineTextIncrease,
  MdOutlineFormatColorText,
  MdLiveHelp,
} from 'react-icons/md';
import { fontswitch, loadSavedFontSize } from '../fontsize';
import styles from './styles.module.css';

export default function SignIn() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // Load saved preferences on mount
  React.useEffect(() => {
    setMounted(true);
    loadSavedFontSize();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const isDark = JSON.parse(savedTheme);
      setMode(isDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }, [setMode]);

  const toggleDarkMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode === 'dark'));
    document.documentElement.setAttribute('data-theme', newMode);
  };

  const handleFontSizeChange = (action: string) => {
    fontswitch(action);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className={styles.formContainer}>
        <p className="pt-4">Please log in to continue.</p>

        <form className="mt-4" action={formAction}>
          <div>
            <TextField
              fullWidth={true}
              type="text"
              variant="filled"
              label="Username"
              id="username"
              name="username"
              required={true}
              error={!!errorMessage}
              helperText={errorMessage}
              disabled={isPending}
              placeholder="Enter your username"
            />
          </div>

          <div className="mt-4">
            <TextField
              fullWidth={true}
              type="password"
              variant="filled"
              label="Password"
              id="password"
              name="password"
              disabled={isPending}
              required={true}
              error={!!errorMessage}
              helperText={errorMessage}
              placeholder="Enter your password"
            />
          </div>

          <div className="w-100 mt-5">
            <Button
              fullWidth={true}
              id="login-button"
              type="submit"
              variant="contained"
              size="large"
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Log in'}
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-5"></div>

      <Divider />

      <div className="d-flex mt-2">
        <IconButton aria-label="Switch Color Mode" onClick={toggleDarkMode}>
          {mode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
        </IconButton>
        <IconButton 
          aria-label="Smaller Fonts" 
          onClick={() => handleFontSizeChange('smaller')}
        >
          <MdOutlineTextDecrease />
        </IconButton>
        <IconButton 
          aria-label="Default Fonts" 
          onClick={() => handleFontSizeChange('reset')}
        >
          <MdOutlineFormatColorText />
        </IconButton>
        <IconButton 
          aria-label="Larger Fonts" 
          onClick={() => handleFontSizeChange('bigger')}
        >
          <MdOutlineTextIncrease />
        </IconButton>
        <div className="ml-auto"></div>
        <Link
          href="https://github.com/handtrixx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton aria-label="Link to Documentation">
            <MdLiveHelp />
          </IconButton>
        </Link>
        <Link
          href="https://github.com/handtrixx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton aria-label="Link to repository">
            <FaGithub />
          </IconButton>
        </Link>
      </div>
    </>
  );
}