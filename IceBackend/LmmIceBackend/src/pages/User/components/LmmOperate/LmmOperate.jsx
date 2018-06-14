import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';

export default class LmmOperate extends Component {
  render() {
    return (
      <IceContainer>
        <Button type="primary" onClick={this.props.showDialog}>
          新增用户
        </Button>
      </IceContainer>
    );
  }
}

