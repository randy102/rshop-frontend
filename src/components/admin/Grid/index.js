import React, { useState, useEffect } from 'react'
import { Button, Table, Input, Space, Modal } from 'antd'
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import * as AntIcon from '@ant-design/icons'
import './grid.scss'

function getNestedPath(data, path) {
  if (!Array.isArray(path)) return data[path]
  for (let p of path) {
    data = data[p]
  }
  return data
}

const HEAD_DATA = {
  create: {
    icon: 'PlusOutlined',
    name: 'Thêm'
  },
  refresh: {
    icon: 'RedoOutlined',
    name: 'Tải lại'
  },
  detail: {
    icon: 'EyeOutlined',
    name: 'Chi tiết',
    selection: 'single'
  },
  read: {
    icon: 'EyeOutlined',
    name: 'Chi tiết',
    selection: 'single'
  },
  update: {
    icon: 'EditOutlined',
    name: 'Sửa',
    selection: 'single'
  },
  delete: {
    icon: 'DeleteOutlined',
    name: 'Xóa',
    selection: 'multiple',
    confirm: true
  }
}

export default function Grid({pagination=true, data, colDef, headDef, loading = false, expandRender, showSelection = true }) {
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  var searchInput

  useEffect(() => { setSelectedRowKeys([]) }, [data])

  // Filter =>
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { searchInput = node }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => getNestedPath(record, dataIndex).toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => visible && setTimeout(() => searchInput.select())
  });
  function handleSearch(selectedKeys, confirm, dataIndex) { confirm() }
  function handleReset(clearFilters) { clearFilters() }
  // <= Filter

  // Sorter =>
  const getSorterProps = (cd) => ({
    sorter: (a, b) => {
      const aVal = getNestedPath(a, cd.dataIndex)
      const bVal = getNestedPath(b, cd.dataIndex)
      if (aVal > bVal) return 1
      if (aVal < bVal) return -1
      return 0
    }
  })
  // => Sorter

  colDef = colDef.map(cd => ({
    ...cd,
    ...getColumnSearchProps(cd.dataIndex),
    ...getSorterProps(cd)
  }))

  return (
    <div>
      {headDef?.length && <div className='rui-grid-btn'>
        <Space>
          {headDef && headDef.map(({disabled=false, icon, selection, name, onClick, type, confirm, confirmMessage, loading = false }) => {
            icon = icon || HEAD_DATA[type]?.icon
            name = name || HEAD_DATA[type]?.name
            selection = selection || (type && HEAD_DATA[type].selection)
            confirm = confirm || HEAD_DATA[type]?.confirm

            const Icon = AntIcon[icon]
            const singleError = (selection === 'single' && selectedRows.length !== 1)
            const multipleError = (selection === 'multiple' && selectedRows.length === 0)
            const isDisabled = disabled || singleError ? true : (multipleError ? true : false)

            function confirmClick(cb) {
              Modal.confirm({
                title: confirmMessage || 'Bạn có chắc muốn thực hiện hành động này?',
                icon: <ExclamationCircleOutlined />,
                onOk:() => cb(selectedRows, setSelectedRows)
              })
            }
            return (
              <Button
                loading={loading}
                key={name}
                disabled={isDisabled}
                onClick={() => confirm ? confirmClick(onClick) : onClick(selectedRows, setSelectedRows)}
                icon={Icon && <Icon />}
              >
                {name}
              </Button>
            )
          })}
        </Space>
      </div>}

      <Table
        size='middle'
        showSorterTooltip={false}
        pagination={pagination && { defaultPageSize: 10 }}
        loading={loading}
        columns={colDef}
        dataSource={data}
        rowKey='_id'
        expandedRowRender={expandRender}
        locale={{
          emptyText: 'Không có dữ liệu'
        }}
        rowSelection={ showSelection && {
          type: 'checkbox',
          onChange: (keys, rows) => {
            setSelectedRows(rows)
            setSelectedRowKeys(keys)
          },
          selectedRowKeys,
          preserveSelectedRowKeys: false
        }}
      />
    </div>
  )
}
