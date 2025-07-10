'use client';
import styles from './styles.module.css';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface InputTextProps {
  name: string;
  label?: string;
  type?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  alert?: string;
  hasError?: boolean;
  placeholder?: string;
  onChangeAction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  variant?: 'filled' | 'outlined'; // Added Material Design 3 variants
}

interface InputSelectProps {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
  onChangeAction?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  values: object;
  selected: string;
  placeholder?: string;
  variant?: 'filled' | 'outlined'; // Added Material Design 3 variants
}

export function BasicInput({
  name,
  label = 'Input Field',
  type = 'text',
  icon = null,
  disabled = false,
  required = false,
  minLength = undefined,
  alert = '',
  value = undefined,
  onChangeAction = () => {},
  placeholder,
  hasError = false,
  variant = 'filled', // Default to filled for MD3
}: InputTextProps) {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={name} className={styles.inputLabel}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputGroup}>
        <input
          id={name}
          name={name}
          className={`${styles.inputText} ${styles[variant]} ${icon ? styles.hasIcon : ''} ${hasError ? styles.hasError : ''}`}
          type={type}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChangeAction}
          placeholder={placeholder}
          {...(type === 'password' && minLength ? { minLength } : {})}
        />
        {icon && <div className={styles.inputIcon}>{icon}</div>}
      </div>
      {alert && <div className={styles.inputAlert}>{alert}</div>}
    </div>
  );
}

export function BasicSelect({
  name,
  label = undefined,
  disabled = false,
  required = false,
  hasError = false,
  onChangeAction = () => {},
  values,
  selected,
  placeholder = 'Select an option',
  variant = 'filled', // Default to filled for MD3
}: InputSelectProps) {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={name} className={styles.inputLabel}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputGroup}>
        <select
          id={name}
          name={name}
          className={`${styles.inputSelect} ${styles[variant]} ${hasError ? styles.hasError : ''}`}
          disabled={disabled}
          required={required}
          value={selected}
          onChange={onChangeAction}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {Object.entries(values).map(([key, value]) => (
            <option key={key} value={key}>
              {String(value)}
            </option>
          ))}
        </select>
        <div className={styles.selectIcon}>
          <MdKeyboardArrowDown size="24px" />
        </div>
      </div>
    </div>
  );
}

export default BasicInput;