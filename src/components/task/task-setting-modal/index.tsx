/*
 * @Author: kim
 * @Date: 2023-07-30 17:09:52
 * @Description: 任务设置弹窗
 */
import { useState } from 'react'
import { Form, DatePicker, Input, Row, Col, Space } from 'antd'
import { _get } from '@/helpers/request'
import Modal from '@/components/shared/modal'
import Editor from '@/components/task/editor'
import PrioritySelect from '@/components/task/task-setting-modal/priority-select'
import ProcessTypeSelect from '@/components/task/task-setting-modal/process-type-select'
import MemberSelect from '@/components/task/task-setting-modal/member-select'

interface TaskSettingModalProps {
  title?: string
  open?: boolean
  onCancel?: () => void
}

const { RangePicker } = DatePicker

const formRules = {
  priority: [{
    required: true,
    message: '请选择优先级'
  }],
  title: [{
    required: true,
    message: '请输入任务名称'
  }],
  process_type: [{
    required: true,
    message: '请选择流程类型'
  }],
  datetime: [{
    required: true,
    message: '请选择任务开始/结束时间'
  }],
  person_in_charge: [{
    required: true,
    message: '请设置负责人'
  }],
  reviewer: [{
    required: true,
    message: '请设置审核人'
  }]
}

function TaskSettingModal(props: TaskSettingModalProps) {
  const { title, open = false, onCancel } = props
  const [taskDetail, setTaskDetail] = useState('')
  const [form] = Form.useForm()

  const handleTaskDetailChange = (value: string) => {
    setTaskDetail(value)
  }

  const handleOk = async () => {
    const res = await form.validateFields()
    console.log(res);
    
  }

  return (
    <Modal
      title={title}
      open={open}
      wrapClassName="w-[720px]"
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form labelCol={{ span: 3 }} labelAlign="left" form={form} requiredMark={false}>
        <Form.Item noStyle>
          <Space.Compact block>
            <Form.Item name="priority" className="w-40" rules={formRules.priority}>
              <PrioritySelect />
            </Form.Item>
            <Form.Item name="title" className="w-full" rules={formRules.title}>
              <Input size="large" placeholder="输入任务名称" />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item name="content">
          <Editor value={taskDetail} onChange={handleTaskDetailChange} />
        </Form.Item>

        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              name="process_type"
              label="流程类型"
              labelCol={{ xs: 3, md: 6 }}
              rules={formRules.process_type}
            >
              <ProcessTypeSelect />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="datetime" label="时间" labelCol={{ xs: 3, md: 5 }} rules={formRules.datetime}>
              <RangePicker />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="person_in_charge" label="负责人" rules={formRules.person_in_charge}>
          <MemberSelect placeholder="选择负责人" />
        </Form.Item>
        <Form.Item name="reviewer" label="审核人" rules={formRules.reviewer}>
          <MemberSelect placeholder="选择审核人" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TaskSettingModal
