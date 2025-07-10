'use client';
import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from '@tanstack/react-table';

import CortexButton from '@/cortex-react/input/buttons';
import styles from './styles.module.css';
import {
  MdArrowUpward,
  MdArrowDownward,
  MdOutlineFilterAlt,
  MdFilterAltOff,
  MdViewColumn,
  MdRefresh,
} from 'react-icons/md';

// Import utility functions
import { formatTimestampToDate, isValidUrl } from './utils/utils';
import { ExportDropdown } from './utils/ExportDropdown';
import { ColumnSelector } from './utils/ColumnSelector';

// Types
interface Row {
  [key: string]: any;
}

interface DataTableProps {
  data: Row[];
  isLoading?: boolean;
}

const columnHelper = createColumnHelper<Row>();

// Custom filter function that only filters with 3+ characters
const customGlobalFilter = (row: any, columnId: string, value: string) => {
  if (!value || value.length < 3) return true;
  
  const searchValue = value.toLowerCase();
  return Object.values(row.original).some((cellValue: any) =>
    String(cellValue).toLowerCase().includes(searchValue)
  );
};

// Custom column filter function
const customColumnFilter = (row: any, columnId: string, value: string) => {
  if (!value || value.length < 3) return true;
  
  const cellValue = String(row.getValue(columnId)).toLowerCase();
  return cellValue.includes(value.toLowerCase());
};

// Simple components
const SortButton: React.FC<{ column: any }> = ({ column }) => (
  <div className="ml-auto" onClick={() => column.toggleSorting()}>
    {column.getIsSorted() === 'asc' ? (
      <CortexButton
        shape="circle"
        style="btnPrimaryGray"
        icon={<MdArrowUpward size="24px" color="var(--bbraun-active)" />}
      />
    ) : column.getIsSorted() === 'desc' ? (
      <CortexButton
        shape="circle"
        style="btnPrimaryGray"
        icon={<MdArrowDownward size="24px" color="var(--bbraun-active)" />}
      />
    ) : (
      <CortexButton
        shape="circle"
        style="btnPrimaryGray"
        icon={<MdArrowDownward size="24px" />}
      />
    )}
  </div>
);

const FilterButton: React.FC<{ 
  column: any; 
  columnKey: string;
  openFilter: string | null;
  setOpenFilter: (key: string | null) => void;
}> = ({ column, columnKey, openFilter, setOpenFilter }) => {
  const [inputValue, setInputValue] = useState('');
  const isOpen = openFilter === columnKey;
  const hasFilter = column.getFilterValue();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    column.setFilterValue(value);
  };

  return (
    <>
      <div
        className="z-index-2"
        onClick={() => setOpenFilter(isOpen ? null : columnKey)}
      >
        <CortexButton
          shape="circle"
          style="btnPrimaryGray"
          icon={
            <MdOutlineFilterAlt 
              size="24px" 
              color={hasFilter ? "var(--bbraun-active)" : undefined} 
            />
          }
        />
      </div>
      {isOpen && (
        <div className={styles.filterContainer}>
          <input
            type="text"
            className={styles.filterInput}
            value={inputValue}
            onChange={handleInputChange}
            placeholder=""
            autoFocus
          />
        </div>
      )}
    </>
  );
};

const CellRenderer: React.FC<{ value: any; columnKey: string }> = ({ value, columnKey }) => {
  if (columnKey.toLowerCase() === 'creation date') {
    return <span className={styles.cellContent}>{formatTimestampToDate(value)}</span>;
  }

  if (columnKey.toLowerCase() === 'link' && value && isValidUrl(String(value))) {
    return (
      <span className={styles.cellContent}>
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkCell}
        >
          {String(value)}
        </a>
      </span>
    );
  }

  return <span className={styles.cellContent}>{value}</span>;
};

function CortexTable({ data, isLoading = false }: DataTableProps) {
  // Simple state management
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [globalFilterInput, setGlobalFilterInput] = useState('');

  // Create columns
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    return Object.keys(data[0]).map(key =>
      columnHelper.accessor(key, {
        header: ({ column }) => (
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
            <SortButton column={column} />
            <FilterButton 
              column={column} 
              columnKey={key}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
            />
          </div>
        ),
        cell: info => <CellRenderer value={info.getValue()} columnKey={key} />,
        filterFn: customColumnFilter,
      })
    );
  }, [data, openFilter]);

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: customGlobalFilter,
  });

  // Global filter handler
  const handleGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterInput(value);
    setGlobalFilter(value);
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSorting([]);
    setColumnFilters([]);
    setGlobalFilter('');
    setGlobalFilterInput('');
    setOpenFilter(null);
  };

  if (!data || data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No data available</h3>
        <p>There are no records to display</p>
      </div>
    );
  }

  return (
    <>
      {/* Toolbar */}
      <div className={styles.tableToolbar + ' mb-2 d-flex align-items-center'}>
        <div className="mr-2">
          <input
            type="text"
            value={globalFilterInput}
            onChange={handleGlobalFilterChange}
            placeholder=""
            className={styles.filterGlobal}
            disabled={isLoading}
          />
        </div>
        <div className={styles.infoText}>
          Showing {table.getRowModel().rows.length} of {data.length} entries
          {globalFilter && globalFilter.length >= 3 && ` (filtered by "${globalFilter}")`}
        </div>
        
        <div className="ml-auto d-flex">
          <CortexButton
            shape="circle"
            onClickAction={() => window.location.reload()}
            style="btnGhostGray"
            icon={<MdRefresh size="24px" />}
            disabled={isLoading}
          />
          
          <ColumnSelector
            table={table}
            showColumnSelector={showColumnSelector}
            setShowColumnSelector={setShowColumnSelector}
          />
          
          <CortexButton
            shape="circle"
            onClickAction={resetAllFilters}
            style="btnGhostGray"
            icon={<MdFilterAltOff size="24px" />}
            disabled={isLoading}
          />
          
          <ExportDropdown
            table={table}
            showExportDropdown={showExportDropdown}
            setShowExportDropdown={setShowExportDropdown}
          />
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper} style={{ opacity: isLoading ? 0.6 : 1 }}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className={styles.headerRow}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className={styles.headerCell}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={styles.tbody}>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${styles.bodyRow} ${
                    index % 2 === 0 ? styles.evenRow : styles.oddRow
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className={styles.bodyCell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CortexTable;