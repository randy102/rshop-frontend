import React, { useState, useEffect } from 'react'
import { Button, Table, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import * as AntIcon from '@ant-design/icons'
import './grid.scss'

function getNestedPath(data, path) {
  if (!Array.isArray(path)) return data[path]
  for (let p of path) {
    data = data[p]
  }
  return data
}

export default function Grid({ data, colDef, headDef, loading = false }) {
  var [selectedRows, setSelectedRows] = useState([])
  var [selectedRowKeys, setSelectedRowKeys] = useState([])
  var searchInput

  useEffect(() => { setSelectedRowKeys([]) }, [data])

  // Filter =>
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
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
    onFilter: (value, record) =>
      getNestedPath(record, dataIndex).toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    }
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = clearFilters => {
    clearFilters();
  };
  // <= Filter

  // Sorter =>
  const sorterProp = (a, b, cd) => {
    const aVal = getNestedPath(a, cd.dataIndex)
    const bVal = getNestedPath(b, cd.dataIndex)
    if (aVal > bVal) return 1
    if (aVal < bVal) return -1
    return 0
  }
  // => Sorter

  colDef = colDef.map(cd => ({
    ...cd,
    ...getColumnSearchProps(cd.dataIndex),
    sorter: (a, b) => sorterProp(a, b, cd)
  }))

  return (
    <div>
      <div className='rui-grid-btn'>
        {headDef && headDef.map(({ icon, selection, name, onClick }) => {
          const Icon = AntIcon[icon]
          const singleError = (selection === 'single' && selectedRows.length !== 1)
          const multipleError = (selection === 'multiple' && selectedRows.length === 0)
          const isDisabled = singleError ? true : (multipleError ? true : false)

          return (
            <Button
              style={{ margin: '0 5px' }}
              key={name}
              disabled={isDisabled}
              onClick={() => onClick(selectedRows)}
              icon={<Icon />}
            >
              {name}
            </Button>
          )
        })}
      </div>

      <Table
        size='middle'
        pagination={{ defaultPageSize: 10 }}
        loading={loading}
        columns={colDef}
        dataSource={data}
        rowKey='_id'
        rowSelection={{
          type: 'checkbox',
          onChange: (keys, rows) => {
            setSelectedRows(rows)
            setSelectedRowKeys(keys)
          },
          selectedRowKeys
        }}
      />
    </div>
  )
}
