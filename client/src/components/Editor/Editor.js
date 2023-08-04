import Editor from '@monaco-editor/react';

function MonacoEditor() {
  return (
    <Editor height="60vh" language="cpp" value="cout<<'hello world';" />
  );
}

export default MonacoEditor