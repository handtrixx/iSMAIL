'use client';
import styles from './styles.module.css';

interface ButtonProps {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  size?: 'small' | 'medium' | 'large';
  shape?: 'rectangle' | 'circle';
  id?: string;
  type?: 'submit' | 'button' | 'reset';
  onClickAction?: () => void;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = 'filled',
  size = 'medium',
  shape = 'rectangle',
  label = '',
  id = undefined,
  type = 'button',
  icon = null,
  onClickAction,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const buttonShape = shape === 'circle' ? 'btnRound' : 'btnRect';
  const title = label || "Button";

  const buttonClasses = [
    styles[buttonShape],
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      id={id}
      aria-label={label}
      title={title}
      type={type}
      onClick={onClickAction}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
}

export default Button;