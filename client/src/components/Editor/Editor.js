import Editor from '@monaco-editor/react';

function MonacoEditor() {
  return (
    <Editor height="100vh" language="javascript" value="console.log('Hello, World!');" />
  );
}

export default MonacoEditor