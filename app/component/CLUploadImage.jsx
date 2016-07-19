import React from 'react';
import {Upload,Icon} from 'antd';
import {Ajax} from '../common/Common';

let CLUploadImage = React.createClass({
    getInitialState: function() {
        var state = {
            fileList: []
        };
        var fileList = this.props.fileList;
    	state.fileList = fileList;
        return state;
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    },

    handleChange(info) {

    	var onUploadSuccess = this.props.onUploadSuccess;
    	var formItem = this.props.formItem;

        var self = this;
	    let fileList = info.fileList;

	    // 1. 上传列表数量的限制
	    //    只显示最近上传的一个，旧的会被新的顶掉
	    fileList = fileList.slice(-2);

	    // 2. 读取远程路径并显示链接
	    fileList = fileList.map((file) => {
	      if (file.response) {
	        // 组件会将 file.url 作为链接进行展示
	        file.url = file.response.url;
            onUploadSuccess(formItem,file.url);
	      }
	      return file;
	    });

	    // 3. 按照服务器返回信息筛选成功上传的文件
	    fileList = fileList.filter((file) => {
	      if (file.response) {
	        return file.response.status === 'success';
	      }
	      return true;
	    });
	    // this.setState({ fileList });
	    this.state.fileList = fileList;
	  },

    render() {
        const uploadProps = {
		  action: '/api/media/upload',
		  listType: 'picture-card',
		  fileList:this.state.fileList,
		  onChange: this.handleChange,
		  name:'pic'
		};

        return (
        	<Upload {...uploadProps}>
        	<Icon type="plus" />
        	<div className="ant-upload-text">上传照片</div>
        	</Upload>
        );
    }
});

export default CLUploadImage;
