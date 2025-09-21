# DynamicTableSheetPage Component

A React component that simulates a Google Sheets-like experience using Ant Design components. This component provides a fully interactive spreadsheet interface with editable cells, dynamic row/column management, and Google Sheets-inspired styling.

## Features

- ✅ **Editable Cells**: Click any cell to edit, save on blur/enter, cancel with escape
- ✅ **Dynamic Rows**: Add and remove rows with confirmation dialogs
- ✅ **Dynamic Columns**: Add and remove columns with automatic lettering (A, B, C...)
- ✅ **Header Editing**: Click column headers to rename them
- ✅ **Resizable Columns**: Columns support resizing (via Ant Design Table)
- ✅ **Scrolling**: Supports horizontal and vertical scrolling for large tables
- ✅ **Google Sheets Styling**: Matches Google Sheets aesthetics closely
- ✅ **Keyboard Navigation**: Tab, Enter, Escape key support
- ✅ **Row Numbering**: Automatic row numbering with delete functionality
- ✅ **Local State Management**: No backend required, pure local state

## Installation

```bash
npm install react react-dom antd
```

## Usage

### Basic Usage

```jsx
import React from 'react';
import { DynamicTableSheetPage } from './path/to/DynamicTableSheetPage';
import 'antd/dist/reset.css';

function App() {
  return (
    <DynamicTableSheetPage />
  );
}
```

### Advanced Usage with Props

```jsx
import React from 'react';
import { DynamicTableSheetPage } from './path/to/DynamicTableSheetPage';
import 'antd/dist/reset.css';

function App() {
  const handleDataChange = (data) => {
    console.log('Table data changed:', data);
    // Save to localStorage, send to API, etc.
  };

  const initialData = [
    { key: 'row-0', A: 'Hello', B: 'World', C: '123' },
    { key: 'row-1', A: 'React', B: 'Component', C: '456' },
  ];

  return (
    <DynamicTableSheetPage
      initialData={initialData}
      initialRows={15}
      initialColumns={8}
      onDataChange={handleDataChange}
      style={{ maxWidth: '1200px', margin: '0 auto' }}
      className="my-custom-sheet"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialData` | `Array<Object>` | `null` | Pre-populated data for the table. Should be array of objects with `key` property |
| `initialRows` | `number` | `10` | Initial number of rows to display |
| `initialColumns` | `number` | `5` | Initial number of columns to display |
| `onDataChange` | `function` | `null` | Callback function called whenever data changes. Receives updated data array |
| `className` | `string` | `''` | Additional CSS class name for the component wrapper |
| `style` | `object` | `{}` | Inline styles for the component wrapper |

## Data Structure

The component uses the following data structure:

```javascript
[
  {
    key: 'row-0',      // Required: unique identifier for the row
    A: 'Cell A1',      // Column A value
    B: 'Cell B1',      // Column B value
    C: 'Cell C1',      // Column C value
    // ... more columns as needed
  },
  {
    key: 'row-1',
    A: 'Cell A2',
    B: 'Cell B2',
    C: 'Cell C2',
  },
  // ... more rows
]
```

## Styling

The component comes with Google Sheets-inspired CSS. You can customize the appearance by:

1. **CSS Classes**: Use the `className` prop to add your own CSS class
2. **CSS Variables**: Override the CSS custom properties in your stylesheet
3. **Ant Design Theme**: Use Ant Design's ConfigProvider to customize colors and fonts

### Custom Styling Example

```css
.my-custom-sheet {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.my-custom-sheet .sheet-table .ant-table-thead > tr > th {
  background-color: #e3f2fd;
  color: #1565c0;
}
```

## Integration with Rails

To integrate with a Rails application:

1. Add the React component files to your Rails asset pipeline or use Webpack
2. Install the required npm packages
3. Create a Rails view that renders a container for the React component
4. Initialize the React component in your JavaScript

### Rails Integration Example

```erb
<!-- app/views/sheets/show.html.erb -->
<div id="dynamic-table-root" 
     data-initial-data="<%= @sheet_data.to_json %>"
     data-sheet-id="<%= @sheet.id %>">
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('dynamic-table-root');
    const initialData = JSON.parse(container.dataset.initialData);
    const sheetId = container.dataset.sheetId;
    
    // Initialize React component
    ReactDOM.render(
      React.createElement(DynamicTableSheetPage, {
        initialData: initialData,
        onDataChange: (data) => {
          // Send data to Rails backend
          fetch(`/sheets/${sheetId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
            },
            body: JSON.stringify({ sheet_data: data })
          });
        }
      }),
      container
    );
  });
</script>
```

## Development

### Run Demo

```bash
cd react-components
npm install
npm run dev
```

This will start a development server at `http://localhost:3000` with a demo of the component.

### Build for Production

```bash
npm run build
```

## Browser Support

- Chrome (recommended for best Google Sheets-like experience)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use in commercial and personal projects.

## Troubleshooting

### Common Issues

**Component not rendering**: Make sure you've imported Ant Design CSS:
```jsx
import 'antd/dist/reset.css';
```

**Styles not applied**: Ensure the CSS file is imported:
```jsx
import './DynamicTableSheetPage.css';
```

**Performance issues with large tables**: Consider implementing virtualization for tables with > 1000 rows/columns.

### Need Help?

- Check the demo in `src/App.jsx` for usage examples
- Review the component props and data structure above
- Look at the CSS classes for custom styling options