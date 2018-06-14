/* eslint no-plusplus:0 */
import React, { Component } from 'react';
import { Table, Pagination,Loading} from '@icedesign/base';
import IceContainer from '@icedesign/container';

import { Mutation } from 'react-apollo';

export default class LmmBaseTable extends Component {
  static displayName = 'SelectableTable';

  constructor(props) {
    super(props);

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

  renderOperator = (value, index, record) => {

    if (this.props.renderCustomOperate){
        return this.props.renderCustomOperate;
    }

    return (
      <div>
        <a onClick={() => {this.props.editForm(record)}}>编辑</a>
        <Mutation 
          onCompleted={() =>{
            this.props.reloadData()
          }}
          mutation={this.props.deleteQL}>
          {(deleteAction, { data }) => (
          <a
            style={styles.removeBtn}
            onClick={() => 
                this.props.deleteOperate(deleteAction,record)}
          >
            删除
          </a>
        )}
        </Mutation>

        {this.props.otherButtons?
          this.props.otherButtons.map((item) => {
            return <a 
            key={item.key}
            style={styles.otherBtn}
            onClick={() => {item.action(record)}}>{item.title}</a>
          }):null
        }
        
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
              {
                  this.props.columns.map(item => {
                     return  <Table.Column  key={item.name} title={item.title} dataIndex={item.name} width={120} />
                  })
              }
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
  otherBtn: {
    marginLeft: 10,
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
