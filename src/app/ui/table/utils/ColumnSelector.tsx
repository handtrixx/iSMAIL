import React from 'react';
import CortexButton from '@/cortex-react/input/buttons';
import { MdViewColumn } from 'react-icons/md';
import styles from '../styles.module.css';

interface ColumnSelectorProps {
  table: any;
  showColumnSelector: boolean;
  setShowColumnSelector: (show: boolean) => void;
}

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  table,
  showColumnSelector,
  setShowColumnSelector,
}) => (
  <div className={styles.columnSelectorWrapper + ' mr-1'}>
    <div onClick={() => setShowColumnSelector(!showColumnSelector)}>
      <CortexButton
        shape="circle"
        style="btnGhostGray"
        icon={<MdViewColumn size="24px" />}
      />
    </div>

    {showColumnSelector && (
      <>
        <div
          className={styles.overlay}
          onClick={() => setShowColumnSelector(false)}
        />
        <div className={styles.columnSelector}>
          <div className={styles.columnSelectorHeader}>Show/Hide Columns</div>
          <div className={styles.columnSelectorContent}>
            {table.getAllLeafColumns().map((column: any) => (
              <div
                key={column.id}
                className={styles.columnSelectorItem}
                onClick={() => column.toggleVisibility()}
              >
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={() => {}}
                  className={styles.columnCheckbox}
                />
                <span className={styles.columnLabel}>
                  {column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    )}
  </div>
);