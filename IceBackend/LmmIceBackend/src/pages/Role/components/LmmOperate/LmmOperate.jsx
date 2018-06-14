import React, { Component } from 'react';
import { Grid, Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;
import LmmTreeSelect from '../../../../components/LmmTreeSelect';

export default class LmmOperate extends Component {

  render() {
    return (
      <IceContainer>
        <Row>
            <Col xxs="6" s="4" l="2" style={styles.label}>
                  选择角色:{' '}
            </Col>
            <Col>
                <LmmTreeSelect 
                  treeData = {this.props.treeData}
                  handleChange={(value) => {
                    this.props.reloadData(value);
                }} />
            </Col>
            <Col style={{
                  display: 'flex',
                  alignItems: 'right',
                  justifyContent: 'flex-end',}}>
                  <Button type="primary" onClick={this.props.showDialog}>
                    新增角色
                  </Button>
            </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  label: { lineHeight: '28px', paddingRight: '10px' },
};
