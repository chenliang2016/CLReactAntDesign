import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

import styles from './LmmTableViewSearch.less'

class LmmTableViewSearchForm extends React.Component {

  constructor(props){
      super(props);
      this.searchValues = {} ;
      this.state = {
        expand: false,
      }
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      console.log(values);
       this.props.searchAction(values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  // To generate mock Form.Item
  getFields() {
    let fieldCount = this.props.searchFields.length;
    const count = this.state.expand ? fieldCount : 3;
    const { getFieldDecorator } = this.props.form;
    const children = [];

    const formItemLayout =  {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      } ;

    let i = 0;
    for (let searchField of this.props.searchFields){
        children.push(
            <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
              <FormItem 
              style={{height:30}}
              {...formItemLayout}
              label={`${searchField.title}`}>
                {getFieldDecorator(`${searchField.attr}`)(
                  <Input placeholder={`请输入${searchField.title}`} />
                )}
              </FormItem>
            </Col>
        );
        i++;
    }
    return children;
  }

  render() {
    return (
      <Form
        style={{borderBottom:'1px solid #eee'}}
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>{this.getFields()}
            <Col span={8} style={{ textAlign: 'left',marginTop:4 }}>
                <Button type="primary" htmlType="submit">搜索</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                重置
                </Button>
                {this.props.searchFields.length > 3 ?
                    <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                    展开 <Icon type={this.state.expand ? 'up' : 'down'} />
                    </a>:null
                }
            </Col>
        </Row>
      </Form>
    );
  }
}

const LmmTableViewSearch = Form.create()(LmmTableViewSearchForm);

export default LmmTableViewSearch;


