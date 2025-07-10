'use client';
import { MdLogout, MdFace } from 'react-icons/md';
import { handleSignOut } from '@/app/lib/actions';
import { CortexButton } from '@/cortex-react/input/buttons';
import styles from './styles.module.css';

interface ProfileDropdownProps {
  username: string;
  shortname: string;
  role: string;
  isDropdownOpen: boolean;
  toggleDropdownAction: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export default function ProfileDropdown({
  username,
  shortname,
  role,
  isDropdownOpen,
  toggleDropdownAction,
  dropdownRef,
}: ProfileDropdownProps) {
  return (
    <div
      className={styles.userDropdownContainer + ' ml-auto'}
      ref={dropdownRef}
    >
      <CortexButton
        shape="circle"
        style="btnPrimaryWhite"
        onClickAction={toggleDropdownAction}
        id="dropdown-basic"
        type="button"
        aria-label="User Menu"
        aria-expanded={isDropdownOpen}
        label={shortname}
      />

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className={styles.userDropdownMenu}>
          <div className={styles.userDropdownItem + ' disabled'}>
            <MdFace size="24px" />
            {username}
          </div>
          <div className={styles.userDropdownItem + ' disabled'}>
            <div>
              <small>{role}</small>
            </div>
          </div>
          <hr className="divider"></hr>
          <button className={styles.userDropdownItem} onClick={handleSignOut}>
            <MdLogout size="24px" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
