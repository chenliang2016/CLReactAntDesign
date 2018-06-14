import React, { Component } from 'react';
import { Dialog, Grid, Input,TreeSelect } from '@icedesign/base';

import {
    FormBinder as IceFormBinder,
    FormError as IceFormError,
  } from '@icedesign/form-binder';

const { Row, Col } = Grid;

import { enquireScreen } from 'enquire-js';

export class LmmFormInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isMobile: false,
        };
      }

    componentDidMount(){
        this.enquireScreenRegister();
    }
    
    enquireScreenRegister = () => {
        const mediaCondition = 'only screen and (max-width: 720px)';
    
        enquireScreen((mobile) => {
          this.setState({
            isMobile: mobile,
          });
        }, mediaCondition);
    };

      render(){
        const { isMobile } = this.state;
        return <Row style={styles.formRow}>
            <Col span={`${isMobile ? '6' : '3'}`}>
            <label style={styles.formLabel}>{this.props.title}</label>
            </Col>
            <Col span={`${isMobile ? '18' : '16'}`}>
            <IceFormBinder
                required
                message={this.props.errorMsg}
            >
                <Input
                name={this.props.attName}
                style={styles.input}
                placeholder={this.props.placeholder}
                />
            </IceFormBinder>
            <IceFormError name={this.props.attName} />
            </Col>
        </Row>
      }
    
}

export class LmmFormTreeSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isMobile: false,
        };
      }

    componentDidMount(){
        this.enquireScreenRegister();
    }
    
    enquireScreenRegister = () => {
        const mediaCondition = 'only screen and (max-width: 720px)';
    
        enquireScreen((mobile) => {
          this.setState({
            isMobile: mobile,
          });
        }, mediaCondition);
    };

      render(){
        const { isMobile } = this.state;
        return <Row style={styles.formRow}>
        <Col span={`${isMobile ? '6' : '3'}`}>
          <label style={styles.formLabel}>{this.props.title}</label>
        </Col>
        <Col span={`${isMobile ? '18' : '16'}`}>
          <IceFormBinder
            required
            message={this.props.errorMsg}
          >
              <TreeSelect
                  name={this.props.attName}
                  dataSource={this.props.treeData}
                  treeDefaultExpandAll
                  hasClear
                  autoWidth
                  style={{ width: 200 }}
              >
              </TreeSelect>
          </IceFormBinder>
          <IceFormError name={this.props.attName} />
        </Col>
        </Row>
      }

}

const styles = {
    formRow: { marginTop: 20 },
    input: { width: '100%' },
    formLabel: { lineHeight: '26px' },
    label: { lineHeight: '28px', paddingRight: '10px' },
};