import React from 'react';
import DynamicTableSheetPage from './components/DynamicTableSheetPage.jsx';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // Ant Design CSS

/**
 * Demo App showcasing the DynamicTableSheetPage component
 */
const App = () => {
  // Example data change handler
  const handleDataChange = (data) => {
    console.log('Table data changed:', data);
    // Here you could save to localStorage, send to an API, etc.
  };

  // Example initial data
  const sampleData = [
    { key: 'row-0', A: 'Hello', B: 'World', C: '123', D: 'Sample', E: 'Data' },
    { key: 'row-1', A: 'React', B: 'Antd', C: '456', D: 'Google', E: 'Sheets' },
    { key: 'row-2', A: 'Dynamic', B: 'Table', C: '789', D: 'Component', E: 'Demo' },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          // Customize Ant Design theme to match Google Sheets
          colorPrimary: '#1a73e8',
          borderRadius: 4,
          fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
      }}
    >
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', color: '#202124', marginBottom: '30px' }}>
          Dynamic Table Sheet Demo
        </h1>
        
        {/* Example 1: Basic usage with default settings */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#5f6368', marginBottom: '15px' }}>Basic Usage</h2>
          <DynamicTableSheetPage 
            onDataChange={handleDataChange}
          />
        </div>

        {/* Example 2: With initial data and custom dimensions */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#5f6368', marginBottom: '15px' }}>With Initial Data</h2>
          <DynamicTableSheetPage 
            initialData={sampleData}
            initialRows={15}
            initialColumns={8}
            onDataChange={handleDataChange}
            style={{ maxWidth: '1200px' }}
          />
        </div>

        {/* Example 3: Larger table for scrolling demo */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#5f6368', marginBottom: '15px' }}>Large Table (Scrolling Demo)</h2>
          <DynamicTableSheetPage 
            initialRows={25}
            initialColumns={15}
            onDataChange={handleDataChange}
            style={{ height: '500px' }}
          />
        </div>

        {/* Usage instructions */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          marginTop: '40px'
        }}>
          <h3 style={{ color: '#202124', marginBottom: '15px' }}>How to Use:</h3>
          <ul style={{ color: '#5f6368', lineHeight: '1.6' }}>
            <li><strong>Edit Cells:</strong> Click on any cell to start editing. Press Enter or click outside to save.</li>
            <li><strong>Add Rows:</strong> Click the "Add Row" button to add a new row at the bottom.</li>
            <li><strong>Add Columns:</strong> Click the "Add Column" button to add a new column on the right.</li>
            <li><strong>Delete Rows:</strong> Hover over the row number and click the delete icon.</li>
            <li><strong>Delete Columns:</strong> Hover over the column header and click the delete icon.</li>
            <li><strong>Edit Headers:</strong> Click on any column header (A, B, C, etc.) to rename it.</li>
            <li><strong>Keyboard Navigation:</strong> Use Tab to move between cells, Enter to confirm edits, Escape to cancel.</li>
          </ul>
          
          <h4 style={{ color: '#202124', marginTop: '20px', marginBottom: '10px' }}>Component Props:</h4>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '4px', 
            fontSize: '13px',
            overflow: 'auto',
            color: '#202124'
          }}>
{`<DynamicTableSheetPage
  initialData={null}           // Optional: Pre-populate with data
  initialRows={10}             // Number of rows to start with
  initialColumns={5}           // Number of columns to start with  
  onDataChange={(data) => {}}  // Optional: Called when data changes
  className=""                 // Optional: Additional CSS class
  style={{}}                   // Optional: Inline styles
/>`}
          </pre>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;