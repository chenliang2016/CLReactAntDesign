/* eslint no-plusplus:0 */
import React, { Component } from 'react';
import { Table, Loading, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';

import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const DELETE_USER = gql`
   mutation DeleteUser($userId: Int!) {
      deleteUser(userId: $userId) {
        loginName
      }
    }
`;
export default class LmmTable extends Component {
  static displayName = 'SelectableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids) => {
        console.log('ids', ids);
        this.setState({
          selectedRowKeys: ids,
        });
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records);
      },
      // 支持针对特殊行进行定制
      getProps: (record) => {
        return {
          disabled: record.id === 100306660941,
        };
      },
    };

    this.state = {
      selectedRowKeys: [],
      dataSource: [],
      currentPage:1,
    };

    this.page = 1;
  }

  onPageChange = (current) => {
     this.setState({currentPage:current});
     this.props.onPageChange(current);
  }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  deleteSelectedKeys = () => {
    const { selectedRowKeys } = this.state;
    console.log('delete keys', selectedRowKeys);
  };

  deleteItem = (record) => {
    const { userId } = record;
  };

  renderOperator = (value, index, record) => {
    return (
      <div>
        <a onClick={() => {this.props.changeFormData(record)}}>编辑</a>
        <Mutation 
          onCompleted={() =>{
            this.props.reloadData()
          }}
          mutation={DELETE_USER}>
          {(DeleteUser, { data }) => (
          <a
            style={styles.removeBtn}
            onClick={() => DeleteUser({variables:{userId:record.userId}})}
          >
            删除
          </a>
        )}
        </Mutation>
      </div>
    );
  };

  render() {
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer>
         <Loading visible={this.props.loading} shape="fusion-reactor" color="#297BFB">
              <Table
                dataSource={this.props.data}
              >
                <Table.Column title="登录名" dataIndex="loginName" width={120} />
                <Table.Column title="用户名" dataIndex="name" width={120} />
                <Table.Column
                  title="操作"
                  cell={this.renderOperator}
                  lock="right"
                  width={120}
                />
              </Table>
          </Loading>    
          <div style={styles.pagination}>
            <Pagination 
            total={this.props.total}
            current={this.props.currentPage} 
            onChange={this.onPageChange} />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  batchBtn: {
    marginRight: '10px',
  },
  IceContainer: {
    marginBottom: '20px',
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  removeBtn: {
    marginLeft: 10,
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
