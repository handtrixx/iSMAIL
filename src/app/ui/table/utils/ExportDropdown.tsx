import React from 'react';
import CortexButton from '@/cortex-react/input/buttons';
import { MdFileDownload } from 'react-icons/md';
import styles from '../styles.module.css';
import { formatTimestampToDate } from './utils';

interface ExportDropdownProps {
  table: any;
  showExportDropdown: boolean;
  setShowExportDropdown: (show: boolean) => void;
}

export const ExportDropdown: React.FC<ExportDropdownProps> = ({
  table,
  showExportDropdown,
  setShowExportDropdown,
}) => {
  const exportToCSV = () => {
    const pageTitle = document.title || 'export';
    const visibleColumns = table.getAllLeafColumns().filter((col: any) => col.getIsVisible());
    const headers = visibleColumns.map((col: any) => col.id);
    const rows = table.getRowModel().rows.map((row: any) =>
      visibleColumns.map((col: any) => {
        const value = row.getValue(col.id);
        return col.id.toLowerCase() === 'creation date' ? formatTimestampToDate(value) : value;
      })
    );

    const csvContent = [headers.join(','), ...rows.map((row: any) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageTitle}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    setShowExportDropdown(false);
  };

  const exportToJSON = () => {
    const pageTitle = document.title || 'export';
    const visibleColumns = table.getAllLeafColumns().filter((col: any) => col.getIsVisible());
    const exportData = table.getRowModel().rows.map((row: any) => {
      const rowData: any = {};
      visibleColumns.forEach((col: any) => {
        const value = row.getValue(col.id);
        rowData[col.id] = col.id.toLowerCase() === 'creation date' ? formatTimestampToDate(value) : value;
      });
      return rowData;
    });

    const jsonContent = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageTitle}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    setShowExportDropdown(false);
  };

  return (
    <div className={styles.columnSelectorWrapper}>
      <div onClick={() => setShowExportDropdown(!showExportDropdown)}>
        <CortexButton style="btnPrimaryPurple" label="Export" />
      </div>

      {showExportDropdown && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setShowExportDropdown(false)}
          />
          <div className={styles.exportDropdown}>
            <div className={styles.columnSelectorHeader}>Export Options</div>
            <div className={styles.columnSelectorContent}>
              <div className={styles.columnSelectorItem} onClick={exportToCSV}>
                <span className={styles.columnLabel + ' d-flex align-items-center'}>
                  <MdFileDownload size="16px" />
                  Download CSV
                </span>
              </div>
              <div className={styles.columnSelectorItem} onClick={exportToJSON}>
                <span className={styles.columnLabel + ' d-flex align-items-center'}>
                  <MdFileDownload size="16px" />
                  Download JSON
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};