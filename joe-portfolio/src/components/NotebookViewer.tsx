import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

interface NotebookCell {
  cell_type: 'code' | 'markdown';
  source: string[];
  execution_count?: number | null;
  outputs?: NotebookOutput[];
}

interface NotebookOutput {
  output_type: 'stream' | 'execute_result' | 'display_data' | 'error';
  text?: string[];
  data?: {
    'text/plain'?: string[];
    'text/html'?: string[];
    'image/png'?: string[];
    'image/jpeg'?: string[];
    'image/svg+xml'?: string[];
    'text/markdown'?: string[];
  };
  name?: 'stdout' | 'stderr';
  ename?: string;
  evalue?: string;
  traceback?: string[];
}

interface NotebookData {
  cells: NotebookCell[];
  metadata: {
    language_info?: {
      name: string;
    };
  };
}

interface NotebookViewerProps {
  content: string;
}

const NotebookViewer: React.FC<NotebookViewerProps> = ({ content }) => {
  const codeRefs = useRef<(HTMLElement | null)[]>([]);

  let notebook: NotebookData;
  try {
    notebook = JSON.parse(content);
  } catch (e) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-semibold">Invalid notebook format</p>
        <p className="text-red-500 text-sm mt-2">{JSON.stringify(e)}</p>
      </div>
    );
  }

  const getLanguage = () => {
    return notebook.metadata?.language_info?.name || 'python';
  };

  useEffect(() => {
    codeRefs.current.forEach((el) => {
      if (el) {
        Prism.highlightElement(el);
      }
    });
  }, [notebook]);

  const renderSource = (source: string[]) => {
    return source.join('');
  };

  const renderOutput = (output: NotebookOutput, index: number) => {
    // Helper function to validate and clean base64 data
    const cleanBase64 = (data: string[]): string => {
      const joined = data.join('').replace(/\s/g, '');
      // Validate base64 length (should be multiple of 4)
      const padded = joined.padEnd(Math.ceil(joined.length / 4) * 4, '=');
      return padded;
    };

    if (output.output_type === 'stream') {
      const text = output.text?.join('') || '';
      return (
        <div
          key={index}
          className={`mt-2 p-3 rounded text-sm font-mono whitespace-pre-wrap overflow-x-auto ${
            output.name === 'stderr'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-gray-50 text-gray-700 border border-gray-200'
          }`}
        >
          {text}
        </div>
      );
    }

    if (output.output_type === 'error') {
      return (
        <div
          key={index}
          className="mt-2 p-3 bg-red-50 text-red-700 border border-red-200 rounded"
        >
          <div className="font-bold">{output.ename}: {output.evalue}</div>
          <pre className="mt-2 text-sm whitespace-pre-wrap overflow-x-auto">
            {output.traceback?.join('\n')}
          </pre>
        </div>
      );
    }

    if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
      const data = output.data;

      // PNG Image output
      if (data?.['image/png'] && data['image/png'].length > 0) {
        try {
          const imageData = cleanBase64(data['image/png']);
          return (
            <div key={index} className="mt-3">
              <img
                src={`data:image/png;base64,${imageData}`}
                alt="Notebook output"
                className="max-w-full h-auto border border-gray-300 rounded-lg shadow-sm bg-white"
                style={{ maxHeight: '600px' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  console.error('Failed to load PNG image');
                }}
              />
            </div>
          );
        } catch (err) {
          console.error('Error processing PNG image:', err);
          return null;
        }
      }

      // JPEG Image output
      if (data?.['image/jpeg'] && data['image/jpeg'].length > 0) {
        try {
          const imageData = cleanBase64(data['image/jpeg']);
          return (
            <div key={index} className="mt-3">
              <img
                src={`data:image/jpeg;base64,${imageData}`}
                alt="Notebook output"
                className="max-w-full h-auto border border-gray-300 rounded-lg shadow-sm bg-white"
                style={{ maxHeight: '600px' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  console.error('Failed to load JPEG image');
                }}
              />
            </div>
          );
        } catch (err) {
          console.error('Error processing JPEG image:', err);
          return null;
        }
      }

      // SVG Image output
      if (data?.['image/svg+xml'] && data['image/svg+xml'].length > 0) {
        const svgData = data['image/svg+xml'].join('').trim();
        return (
          <div key={index} className="mt-3">
            <div
              className="border border-gray-300 rounded-lg shadow-sm bg-white overflow-auto"
              style={{ maxHeight: '600px' }}
              dangerouslySetInnerHTML={{ __html: svgData }}
            />
          </div>
        );
      }

      // HTML output
      if (data?.['text/html'] && data['text/html'].length > 0) {
        const htmlContent = data['text/html'].join('');
        return (
          <div
            key={index}
            className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded overflow-auto"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        );
      }

      // Markdown output
      if (data?.['text/markdown'] && data['text/markdown'].length > 0) {
        return (
          <div key={index} className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data['text/markdown'].join('')}
            </ReactMarkdown>
          </div>
        );
      }

      // Plain text output
      if (data?.['text/plain'] && data['text/plain'].length > 0) {
        const text = data['text/plain'].join('');
        // Check if it looks like a DataFrame or table
        const hasTableStructure = text.includes('|') && text.includes('---');
        const hasDataFrameStructure = text.trim().split('\n').length > 5;

        return (
          <div key={index} className="mt-2">
            {hasTableStructure || hasDataFrameStructure ? (
              <div className="overflow-x-auto">
                <div
                  className="text-sm font-mono whitespace-pre"
                  style={{
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  {text}
                </div>
              </div>
            ) : (
              <pre className="p-3 bg-gray-50 text-gray-700 border border-gray-200 rounded text-sm whitespace-pre-wrap overflow-x-auto">
                {text}
              </pre>
            )}
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="jupyter-notebook space-y-4">
      {notebook.cells.map((cell, cellIndex) => {
        if (cell.cell_type === 'code') {
          const source = renderSource(cell.source);
          return (
            <div key={cellIndex} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* Code Cell Header */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2 flex items-center space-x-2 border-b border-gray-200">
                <span className="text-xs font-bold text-gray-500">[{cell.execution_count || ' '}]</span>
                <span className="text-xs font-medium text-gray-600 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Code Cell
                </span>
              </div>

              {/* Code Content */}
              <div className="p-4 bg-white">
                <pre className="!bg-white !p-0 !m-0">
                  <code
                    ref={(el) => (codeRefs.current[cellIndex] = el)}
                    className={`language-${getLanguage()} text-sm leading-relaxed`}
                    style={{
                      display: 'block',
                      overflowX: 'auto',
                      padding: '0',
                      margin: '0',
                      fontSize: '13px',
                      lineHeight: '1.6'
                    }}
                  >
                    {source}
                  </code>
                </pre>
              </div>

              {/* Outputs */}
              {cell.outputs && cell.outputs.length > 0 && (
                <div className="p-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
                  {cell.outputs.map((output, outputIndex) =>
                    renderOutput(output, outputIndex)
                  )}
                </div>
              )}
            </div>
          );
        }

        if (cell.cell_type === 'markdown') {
          const source = renderSource(cell.source);
          return (
            <div key={cellIndex} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
              <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-code:text-blue-600 prose-pre:bg-gray-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {source}
                </ReactMarkdown>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default NotebookViewer;
