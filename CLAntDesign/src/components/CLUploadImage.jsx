import React from 'react';
import {Upload,Icon,message} from 'antd';

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
		fileList = fileList.slice(-1);

		if (info.file.status === 'uploading') {
		}
		if (info.file.status === 'done') {
			fileList = fileList.map((file) => {
				if (file.response) {
					// 组件会将 file.url 作为链接进行展示
					file.url = file.response.url;
					onUploadSuccess(formItem,file.url);
				}
				return file;
			});
		} else if (info.file.status === 'error') {
			message.error("上传失败")
		} else if (info.file.status === 'removed'){
			onUploadSuccess(formItem,'');
		}
		self.setState({ fileList });
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
