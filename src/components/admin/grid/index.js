import React, { useState } from 'react'
import { Button, Table, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import './grid.scss'

export default function Grid({ data, colDef }) {
  const [selectedRows, setSelectedRows] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput
  
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  const sorterProp = (a,b,cd) => {
    console.log({a,b,cd})
    if( a[cd.dataIndex] > b[cd.dataIndex] ) return 1
    if( a[cd.dataIndex] < b[cd.dataIndex]) return -1
    return 0
  }

  colDef = colDef.map(cd => ({...cd, ...getColumnSearchProps(cd.dataIndex), sorter: (a,b) => sorterProp(a,b,cd)}))

  return (
    <div>
      <div className='rui-grid-btn'>
        <Button>Thêm</Button>
        <Button>Sửa</Button>
        <Button>Xóa</Button>
      </div>
      <Table
        columns={colDef}
        dataSource={data}
        rowKey='_id'
        rowSelection={{
          type: 'checkbox',
          onChange: (_, rows) => setSelectedRows(rows)
        }}
      />
    </div>
  )
}
