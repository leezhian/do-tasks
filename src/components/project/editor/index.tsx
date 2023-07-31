/*
 * @Author: kim
 * @Date: 2023-07-31 14:01:32
 * @Description: 编辑器
 */
import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { tinyAPIKey } from '@/helpers/config'

export interface TaskEditorProps {
  height?: number
  value?: string
  onChange?: (value: string, editor: any) => void
}

function TaskEditor(props: TaskEditorProps) {
  const { height = 320, value, onChange } = props
  const editorRef = useRef<any>(null)

  return (
    <Editor
      apiKey={tinyAPIKey}
      value={value}
      onEditorChange={onChange}
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height: height,
        menubar: false,
        resize: false,
        language: 'zh_CN',
        font_size_input_default_unit: 'px',
        plugins: ['advlist', 'lists', 'charmap', 'table', 'wordcount', 'image', 'code'],
        toolbar: 'bold italic forecolor backcolor fontsizeinput lineheight | table code | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image'
      }}
    />
  )
}

export default TaskEditor
