import React, { Component } from 'react';
import { Button, Grid, Upload, Input,TreeSelect,Icon,Tag } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';

const { CropUpload } = Upload;

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

class LmmCustomUpload extends Component {
  constructor(props) {
    super(props);

    let fileList = this.setFileList(props.value);

    this.state = {
      value: props.value,
      fileList:fileList,
    };
  }

  setFileList = (value) => {
    let fileList = [{
      status: "done",
      downloadURL:value,
      fileURL:value,
      imgURL:value
    }]
    return fileList;

  }

  normFile = info => {
    if (info.file.status === "uploading") {
      console.log("正在上传文件，请稍后！");
    }
    if (info.file.status === "error") {
      console.log("上传文件出错，请重新上传！");
    }
    if (info.file.status === "done") {
      console.log("上传文件成功！");
    }

    if (info.fileList && info.fileList.length) {
      return info.fileList;
    }
    return [];
  };

  componentWillReceiveProps(nextProps) {
    let fileList = this.setFileList(nextProps.value);
    // 注意在上层 FormBinder 更新 value 之后，将组件内部 value 更新
    this.setState({
      value: nextProps.value,
      fileList:fileList,
    });
  }

  onChange = info => {
    console.log(info);
    // if (info.file.response != undefined){
    //   if(info.file.response.status == 'success')
    //   {
    //     if (this.props.onChange) {
    //       this.props.onChange(info.file.response.url);
    //     }
    //   }
    // }
  };

  beforeCrop = (file) => {
    console.log("beforeCrop callback : ", file);

    // 返回 `false` 的方式
    if (file.size > 1024 * 1024 * 3) {
      Dialog.alert({
        content: "图片尺寸超过最大限制 3MB，请重新选择！",
        closable: false,
        title: "裁剪提醒"
      });
      return false;
    }

    // 返回 `promise` 的方式
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width <= 1200) {
            resolve();
          } else {
            Dialog.alert({
              content: `图片宽度为${
                img.width
              }px, 超过最大限制 1200px，请重新选择！`,
              closable: false,
              title: "裁剪提醒"
            });
            reject(); // resolve(false) 也能阻断流程
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  onCrop = (dataUrl) => {
    console.log("onCrop callback : ", dataUrl);
  }

  beforeUpload = (file) => {
    console.log("beforeUpload callback : ", file);
  }

  onSuccess = (res, dataUrl) => {
    console.log("onSuccess callback : ", res);

    if (res.status == "success" ){
        // this.setState({value:res.url})
        this.props.onChange(res.url);
    }

  }

  onClear = () => {
    this.props.onChange('');
  }

  render() {


    let isvaluenull = false;

    if (this.state.value == undefined || this.state.value == ""){
      isvaluenull = true;
    }

        return (
          <div>
          {!isvaluenull?
            <Button  onClick = {this.onClear}  type="primary" style={{ margin: 0,marginBottom: "15px" }}>
              清除图片
            </Button>:null
          }
          <CropUpload
            action="/api/upload" // 该接口仅作测试使用，业务请勿使用
            preview
            previewList={[80, 60, 40]}
            minCropBoxSize={100}
            beforeCrop={this.beforeCrop}
            onCrop={this.onCrop}
            beforeUpload={this.beforeUpload}
            onChange={this.onChange}
            onSuccess={this.onSuccess}
          >
        {/* CropUpload 内嵌的标签会成为呼出系统弹窗的 trigger */}
        <div >
          {isvaluenull?
            <div style={styles.uploadBorder}>
              <Icon type="add" size='large' />
              <div style={{marginTop:'20px'}}>
              上传图片
              </div>
            </div>
            :
            <img
                src={this.state.value}
                width="100px"
                height="100px"
            />
          }
        </div>
        {/* trigger end */}
      </CropUpload>
      </div>
    );
  }
}

//图片上传控件
export class LmmFormUploadImage extends Component {

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
          name={this.props.attName}
          required
          message={this.props.errorMsg}
        >
            <LmmCustomUpload />
        </IceFormBinder>
        <IceFormError name={this.props.attName} />
      </Col>
      </Row>
    }

}

class CustomChooseIcon extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.icons = [
      'home',
      'home2',
      'menu',
      'bangzhu',
      'cascades',
      'activity',
      'qrcode',
      'edit',
      'coupons',
      'repair',
      'shopcar',
      'search',
      'message',
      'notice',
      'yonghu',
      'shop',
      'chart',
      'ol-list',
      'ul-list',
      'task',
      'guanbi',
      'question',
      'mail',
    ];
  }


  componentWillReceiveProps(nextProps) {
    // 注意在上层 FormBinder 更新 value 之后，将组件内部 value 更新
    this.setState({
      value: nextProps.value,
    });
  }

  onChange = (selected,value) => {
    if (selected){
      this.props.onChange(value);
    }else{
      this.props.onChange('');
    }
  }

  renderIcon = (type, idx) => {
    return (
      <div 
      style={{
        display: 'inline-block',
        minWidth: '50px',
        marginBottom: '15px',
        cursor: 'pointer'
      }}
      key={idx}>
        <Tag onSelect={(selected) => {
          this.onChange(selected,type)}} shape="selectable" selected={this.state.value == type}>
          <FoundationSymbol type={type} />
        </Tag>
        </div>
    );
  };

  render(){
    console.log(this.state.value);
    return <div>
          {this.icons.map(this.renderIcon)}
    </div>
  }
}

//图标选择控件
export class LmmFormChooseIcon extends Component {

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
          name={this.props.attName}
          required
          message={this.props.errorMsg}
        >
            <CustomChooseIcon />
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
    uploadBorder :{
      flexDirection: 'column',
      width:'100px',
      height:'100px',
      border: '1px dashed #c4c6cf',
      backgroundColor: '#fff',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'border-color .3s ease',
      display: 'inline-block',
      verticalAlign: top,
      paddingTop: '20px',
      marginTop: '5px',
    }
};