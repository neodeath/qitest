import React, { useState, useCallback, useRef } from 'react';
import { Table, Input, Button, Space, Typography, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import './DynamicTableSheetPage.css';

const { Title } = Typography;

/**
 * DynamicTableSheetPage Component
 * 
 * A React component that simulates a Google Sheets-like experience using Ant Design.
 * 
 * Features:
 * - Editable cells (click to edit, save on blur/enter)
 * - Add/remove rows and columns dynamically
 * - Column header editing
 * - Resizable columns
 * - Scrolling for large tables
 * - Google Sheets-like styling
 * 
 * Props:
 * @param {Object} initialData - Initial table data (optional)
 * @param {number} initialRows - Initial number of rows (default: 10)
 * @param {number} initialColumns - Initial number of columns (default: 5)
 * @param {Function} onDataChange - Callback when data changes (optional)
 * @param {string} className - Additional CSS class (optional)
 * @param {Object} style - Inline styles (optional)
 * 
 * Usage:
 * ```jsx
 * <DynamicTableSheetPage 
 *   initialRows={15}
 *   initialColumns={8}
 *   onDataChange={(data) => console.log('Data changed:', data)}
 * />
 * ```
 */
const DynamicTableSheetPage = ({
  initialData = null,
  initialRows = 10,
  initialColumns = 5,
  onDataChange = null,
  className = '',
  style = {}
}) => {
  // Generate initial data
  const generateInitialData = useCallback((rows, columns) => {
    if (initialData) return initialData;
    
    return Array.from({ length: rows }, (_, rowIndex) => {
      const row = { key: `row-${rowIndex}` };
      Array.from({ length: columns }, (_, colIndex) => {
        const columnKey = String.fromCharCode(65 + colIndex);
        row[columnKey] = '';
      });
      return row;
    });
  }, [initialData]);

  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState(() => 
    generateInitialData(initialRows, initialColumns)
  );
  const [editingHeader, setEditingHeader] = useState(null);

  // Handle cell value changes
  const handleCellChange = useCallback((rowIndex, columnKey, value) => {
    const newDataSource = [...dataSource];
    newDataSource[rowIndex] = {
      ...newDataSource[rowIndex],
      [columnKey]: value
    };
    setDataSource(newDataSource);
    
    if (onDataChange) {
      onDataChange(newDataSource);
    }
  }, [dataSource, onDataChange]);

  // Generate initial column structure
  const generateColumns = useCallback((numColumns) => {
    return Array.from({ length: numColumns }, (_, index) => {
      const columnKey = String.fromCharCode(65 + index); // A, B, C, etc.
      return {
        key: columnKey,
        title: columnKey,
        dataIndex: columnKey,
        width: 120,
        resizable: true,
        render: (text, record, rowIndex) => (
          <EditableCell
            value={text || ''}
            onChange={(value) => handleCellChange(rowIndex, columnKey, value)}
            placeholder={`${columnKey}${rowIndex + 1}`}
          />
        ),
      };
    });
  }, [handleCellChange]);

  // Initialize columns after handleCellChange is defined
  React.useEffect(() => {
    if (columns.length === 0) {
      setColumns(generateColumns(initialColumns));
    }
  }, [columns.length, generateColumns, initialColumns]);

  // Add new row
  const addRow = useCallback(() => {
    const newRow = { key: `row-${dataSource.length}` };
    columns.forEach(col => {
      newRow[col.key] = '';
    });
    setDataSource([...dataSource, newRow]);
  }, [dataSource, columns]);

  // Remove row
  const removeRow = useCallback((rowIndex) => {
    const newDataSource = dataSource.filter((_, index) => index !== rowIndex);
    setDataSource(newDataSource);
  }, [dataSource]);

  // Add new column
  const addColumn = useCallback(() => {
    const newColumnIndex = columns.length;
    const columnKey = String.fromCharCode(65 + newColumnIndex);
    
    const newColumn = {
      key: columnKey,
      title: columnKey,
      dataIndex: columnKey,
      width: 120,
      resizable: true,
      render: (text, record, rowIndex) => (
        <EditableCell
          value={text || ''}
          onChange={(value) => handleCellChange(rowIndex, columnKey, value)}
          placeholder={`${columnKey}${rowIndex + 1}`}
        />
      ),
    };

    const newColumns = [...columns, newColumn];
    setColumns(newColumns);

    // Add empty values for the new column in all existing rows
    const newDataSource = dataSource.map(row => ({
      ...row,
      [columnKey]: ''
    }));
    setDataSource(newDataSource);
  }, [columns, dataSource, handleCellChange]);

  // Remove column
  const removeColumn = useCallback((columnKey) => {
    const newColumns = columns.filter(col => col.key !== columnKey);
    setColumns(newColumns);

    const newDataSource = dataSource.map(row => {
      const { [columnKey]: removed, ...rest } = row;
      return rest;
    });
    setDataSource(newDataSource);
  }, [columns, dataSource]);

  // Handle column header editing
  const handleHeaderEdit = useCallback((columnKey, newTitle) => {
    const newColumns = columns.map(col => 
      col.key === columnKey ? { ...col, title: newTitle } : col
    );
    setColumns(newColumns);
    setEditingHeader(null);
  }, [columns]);

  // Enhanced columns with header editing and delete functionality
  const enhancedColumns = columns.map(col => ({
    ...col,
    title: (
      <div className="column-header">
        {editingHeader === col.key ? (
          <Input
            size="small"
            defaultValue={col.title}
            onBlur={(e) => handleHeaderEdit(col.key, e.target.value)}
            onPressEnter={(e) => handleHeaderEdit(col.key, e.target.value)}
            autoFocus
            className="header-input"
          />
        ) : (
          <Space>
            <span 
              onClick={() => setEditingHeader(col.key)}
              className="header-title"
            >
              {col.title}
            </span>
            <Popconfirm
              title="Delete this column?"
              onConfirm={() => removeColumn(col.key)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="column-delete-icon" />
            </Popconfirm>
          </Space>
        )}
      </div>
    ),
  }));

  // Add row index column and row actions
  const finalColumns = [
    {
      key: 'rowIndex',
      title: '#',
      width: 60,
      fixed: 'left',
      render: (text, record, index) => (
        <div className="row-index">
          <span>{index + 1}</span>
          <Popconfirm
            title="Delete this row?"
            onConfirm={() => removeRow(index)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="row-delete-icon" />
          </Popconfirm>
        </div>
      ),
    },
    ...enhancedColumns,
  ];

  return (
    <div className={`dynamic-table-sheet ${className}`} style={style}>
      <div className="sheet-header">
        <Title level={3}>Dynamic Table Sheet</Title>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={addRow}
            size="small"
          >
            Add Row
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={addColumn}
            size="small"
          >
            Add Column
          </Button>
        </Space>
      </div>
      
      <div className="sheet-container">
        <Table
          columns={finalColumns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 'max-content', y: 400 }}
          size="small"
          bordered
          className="sheet-table"
          components={{
            body: {
              cell: EditableCellWrapper,
            },
          }}
        />
      </div>
      
      <div className="sheet-info">
        <Space>
          <span>{dataSource.length} rows × {columns.length} columns</span>
        </Space>
      </div>
    </div>
  );
};

// Editable cell component
const EditableCell = ({ value, onChange, placeholder }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  const handleEdit = () => {
    setEditing(true);
    setInputValue(value);
  };

  const handleSave = () => {
    setEditing(false);
    onChange(inputValue);
  };

  const handleCancel = () => {
    setEditing(false);
    setInputValue(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  if (editing) {
    return (
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        size="small"
        placeholder={placeholder}
        className="cell-input"
      />
    );
  }

  return (
    <div 
      className="cell-display" 
      onClick={handleEdit}
      title="Click to edit"
    >
      {value || <span className="cell-placeholder">{placeholder}</span>}
    </div>
  );
};

// Wrapper for table cell to handle resizing
const EditableCellWrapper = (props) => {
  return <td {...props} />;
};

export default DynamicTableSheetPage;