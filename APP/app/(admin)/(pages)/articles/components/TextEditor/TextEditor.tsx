'use client'
import React, { useState } from 'react'
import './stylesheets/texteditor.css'
import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'; // Tilføjet
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';

function MyOnChangePlugin({ onChange }) {
    const [editor] = useLexicalComposerContext(); // Hook nu fundet
    useEffect(() => {
      return editor.registerUpdateListener(({editorState}) => {
        onChange(editorState);
      });
    }, [editor, onChange]);
    return null;
  }

export default function TextEditor() {
    const exampleTheme = {
        ltr: 'ltr',
        rtl: 'rtl',
        paragraph: 'editor-paragraph',
        quote: 'editor-quote',
        heading: {
          h1: 'editor-heading-h1',
          h2: 'editor-heading-h2',
          h3: 'editor-heading-h3',
          h4: 'editor-heading-h4',
          h5: 'editor-heading-h5',
          h6: 'editor-heading-h6',
        },
        list: {
          nested: {
            listitem: 'editor-nested-listitem',
          },
          ol: 'editor-list-ol',
          ul: 'editor-list-ul',
          listitem: 'editor-listItem',
          listitemChecked: 'editor-listItemChecked',
          listitemUnchecked: 'editor-listItemUnchecked',
        },
        hashtag: 'editor-hashtag',
        image: 'editor-image',
        link: 'editor-link',
        text: {
          bold: 'editor-textBold',
          code: 'editor-textCode',
          italic: 'editor-textItalic',
          strikethrough: 'editor-textStrikethrough',
          subscript: 'editor-textSubscript',
          superscript: 'editor-textSuperscript',
          underline: 'editor-textUnderline',
          underlineStrikethrough: 'editor-textUnderlineStrikethrough',
        },
        code: 'editor-code',
        codeHighlight: {
          atrule: 'editor-tokenAttr',
          attr: 'editor-tokenAttr',
          boolean: 'editor-tokenProperty',
          builtin: 'editor-tokenSelector',
          cdata: 'editor-tokenComment',
          char: 'editor-tokenSelector',
          class: 'editor-tokenFunction',
          'class-name': 'editor-tokenFunction',
          comment: 'editor-tokenComment',
          constant: 'editor-tokenProperty',
          deleted: 'editor-tokenProperty',
          doctype: 'editor-tokenComment',
          entity: 'editor-tokenOperator',
          function: 'editor-tokenFunction',
          important: 'editor-tokenVariable',
          inserted: 'editor-tokenSelector',
          keyword: 'editor-tokenAttr',
          namespace: 'editor-tokenVariable',
          number: 'editor-tokenProperty',
          operator: 'editor-tokenOperator',
          prolog: 'editor-tokenComment',
          property: 'editor-tokenProperty',
          punctuation: 'editor-tokenPunctuation',
          regex: 'editor-tokenVariable',
          selector: 'editor-tokenSelector',
          string: 'editor-tokenSelector',
          symbol: 'editor-tokenProperty',
          tag: 'editor-tokenProperty',
          url: 'editor-tokenOperator',
          variable: 'editor-tokenVariable',
        },
      };

      function onError(error) {
        console.error(error);
      }
      
        const initialConfig = {
          namespace: 'MyEditor',
          theme: exampleTheme,
          onError,
        };

        const [editorState, setEditorState] = useState();
        function onChange(editorState) {
          setEditorState(editorState);
        }
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder='Enter some text...'
                placeholder={
                  <div className="editor-placeholder">Enter some text...</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
        </div>
      </div>
    </LexicalComposer>
  )
}
