import { memo, useMemo, useState } from 'react'
import type { CodeComponent } from 'react-markdown/lib/ast-to-react'
// Available language https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_HLJS.MD
const capitalizationLanguageNameMap: Record<string, string> = {
  sql: 'SQL',
  javascript: 'JavaScript',
  java: 'Java',
  typescript: 'TypeScript',
  vbscript: 'VBScript',
  css: 'CSS',
  html: 'HTML',
  xml: 'XML',
  php: 'PHP',
  python: 'Python',
  yaml: 'Yaml',
  mermaid: 'Mermaid',
  markdown: 'MarkDown',
  makefile: 'MakeFile',
}
function getCorrectCapitalizationLanguageName(language: string) {
  if (!language)
    return 'Plain'

  if (language in capitalizationLanguageNameMap)
    return capitalizationLanguageNameMap[language]

  return language.charAt(0).toUpperCase() + language.substring(1)
}
const CodeBlock: CodeComponent = memo(({ inline, className, children, ...props }) => {
  const [isSVG, setIsSVG] = useState(true)
  const match = /language-(\w+)/.exec(className || '')
  const language = match?.[1]
  const languageShowName = getCorrectCapitalizationLanguageName(language || '')

  // Use `useMemo` to ensure that `SyntaxHighlighter` only re-renders when necessary
  return useMemo(() => {
    return (!inline && match)
      ? (
          <div>
            <div
              className="flex justify-between h-8 items-center p-1 pl-3 border-b"
              style={{
                borderColor: 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="text-[13px] text-gray-500 font-normal">{languageShowName}</div>
              <div style={{ display: 'flex' }}>
                {language === 'mermaid'
                && (
                  <SVGBtn
                    isSVG={isSVG}
                    setIsSVG={setIsSVG}
                  />
                )}
                <CopyBtn
                  className="mr-1"
                  value={String(children).replace(/\n$/, '')}
                  isPlain
                />
              </div>
            </div>
            {(language === 'mermaid' && isSVG)
              ? (<Flowchart PrimitiveCode={String(children).replace(/\n$/, '')} />)
              : (
                  <SyntaxHighlighter
                    {...props}
                    style={atelierHeathLight}
                    customStyle={{
                      paddingLeft: 12,
                      backgroundColor: '#fff',
                    }}
                    language={match[1]}
                    showLineNumbers
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                )}
          </div>
        )
      : (
          <code {...props} className={className}>
            {children}
          </code>
        )
  }, [children, className, inline, isSVG, language, languageShowName, match, props])
})

CodeBlock.displayName = 'CodeBlock'
