'use client';
import { useState } from 'react';
import {
  MdOutlineClose,
  MdInfo,
  MdWarning,
  MdError,
  MdCheckCircle,
} from 'react-icons/md';
import CortexButton from '@/cortex-react/input/buttons';
import styles from './styles.module.css';

interface BannerProps {
  type?: string;
  dismisable?: boolean;
  children?: React.ReactNode;
}

export function CortexBanner({
  type = 'basic',
  dismisable = true,
  children = '',
}: BannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  // If banner is dismissed, return nothing
  if (isDismissed) {
    return null;
  }

  let bannerTypeClass = 'bannerBasic';
  let bannerIcon = 'info';
  let iconColor = 'var(--bbraun-blue-80)';

  switch (type) {
    case 'basic':
      bannerTypeClass = 'bannerBasic';
      bannerIcon = 'info';
      iconColor = 'var(--bbraun-blue-80)';
      break;
    case 'info':
      bannerTypeClass = 'bannerInfo';
      bannerIcon = 'info';
      iconColor = 'var(--bbraun-blue-80)';
      break;
    case 'warning':
      bannerTypeClass = 'bannerWarning';
      bannerIcon = 'warning';
      iconColor = 'var(--bbraun-warning)';
      break;
    case 'error':
      bannerTypeClass = 'bannerError';
      bannerIcon = 'error';
      iconColor = 'var(--bbraun-red-80)';
      break;
  }

  // Function to render the appropriate icon
  const renderIcon = () => {
    switch (bannerIcon) {
      case 'info':
        return <MdInfo size="24px" color={iconColor} />;
      case 'warning':
        return <MdWarning size="24px" color={iconColor} />;
      case 'error':
        return <MdError size="24px" color={iconColor} />;
      case 'success':
        return <MdCheckCircle size="24px" color={iconColor} />;
      default:
        return <MdInfo size="24px" color={iconColor} />;
    }
  };
  // Function to handle dismiss
  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className={`${styles.banner} ${styles[bannerTypeClass]}`}>
      <div className={styles.bannerIconContainer}>{renderIcon()}</div>
      <div className={styles.bannerContentContainer}>
        <div className={styles.bannerText}>{children}</div>
      </div>
      <div className={styles.bannerDismissContainer}>
        {dismisable && (
          <div onClick={handleDismiss}>
            <CortexButton
              icon={<MdOutlineClose size="24px" />}
              shape="circle"
              style="btnGhostGray"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CortexBanner;
