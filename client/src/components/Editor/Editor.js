import React from 'react';
import Editor from '@monaco-editor/react';

function MonacoEditor({ onChange }) {
  const cppCode = '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}';
  const handleCodeChange = (value, event) => {
    // Call the onChange callback if provided
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <Editor height="60vh" language="cpp" value={cppCode} onChange={handleCodeChange} />
  );
}

export default MonacoEditor;