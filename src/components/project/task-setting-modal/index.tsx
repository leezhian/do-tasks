/*
 * @Author: kim
 * @Date: 2023-07-30 17:09:52
 * @Description: 任务设置弹窗
 */
import { useState } from 'react'
import Modal from '@/components/shared/modal'
import { Form, DatePicker, Input, Select, Row, Col, Space } from 'antd'
import Editor from '@/components/project/editor'

interface TaskSettingModalProps {
  title?: string
  open?: boolean
  onCancel?: () => void
}

const { RangePicker } = DatePicker

const priorityOptions = [
  { label: 'P0', value: '0' },
  { label: 'P1', value: '1' },
  { label: 'P2', value: '2' },
  { label: 'P3', value: '3' },
  { label: 'P4', value: '4' },
]

function TaskSettingModal(props: TaskSettingModalProps) {
  const { title, open = false, onCancel } = props
  const [taskDetail, setTaskDetail] = useState('')

  const handleTaskDetailChange = (value: string) => {
    setTaskDetail(value)
  }

  return (
    <Modal
      title={title}
      open={open}
      wrapClassName="w-[720px]"
      onCancel={onCancel}
      destroyOnClose
    >
      <Form labelCol={{ span: 3 }} labelAlign="left">
        <Form.Item>
          <Space.Compact block>
            <Form.Item name="priority" className="mb-0 w-40">
              <Select
                bordered={false}
                options={priorityOptions}
                placeholder="选择优先级"
                size="large"
                showArrow={false}
                className="rounded-bl-lg rounded-tl-lg bg-base-300"
              />
            </Form.Item>
            <Form.Item name="name" noStyle>
              <Input size="large" placeholder="输入任务名称" />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <div className="mb-6">
          <Editor value={taskDetail} onChange={handleTaskDetailChange} />
        </div>

        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              name="datetime1"
              label="流程类型"
              labelCol={{ xs: 3, md: 6 }}
            >
              <Select
                mode="multiple"
                showArrow={false}
                placeholder="自定义或选择流程类型"
                className="max-w-[200px]"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="datetime" label="时间" labelCol={{ xs: 3, md: 5 }}>
              <RangePicker />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="person_in_charge" label="负责人">
          <Select mode="multiple" showArrow={false} placeholder="选择负责人" />
        </Form.Item>
        <Form.Item name="reviewer" label="审核人">
          <Select mode="multiple" showArrow={false} placeholder="选择审核人" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TaskSettingModal