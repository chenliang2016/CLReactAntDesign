import React from 'react';
import {Upload,Icon,message} from 'antd';
import {constant} from '../libs/constant';

class CLUploadImage extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			fileList: []
		};

		var defaultFileList = props.value;

		if (defaultFileList){
			const files = this.convertValueToFileList(defaultFileList);
			this.state  = {fileList:files};
		}
	};

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);

		var defaultFileList = nextProps.value;

		if (defaultFileList){
			const files = this.convertValueToFileList(defaultFileList);
			this.setState({fileList:files});
		}
    };

    convertValueToFileList = (defaultFileList) =>{
		//获取图片列表 start
		var files = [];

		if (defaultFileList != undefined) {
			defaultFileList.split(";").map(function (val, index) {
				var fileurl =  constant.urlPrex+val;
				files.push(
					{
						uid: index,
						name: val,
						status: 'done',
						url: fileurl,
					}
				)
			});
		}
		//获取图片列表 end

		return files;

	}

    handleChange = (info) => {

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

		} else if (info.file.status === 'removed'){
			onUploadSuccess(formItem,'');
		}

		self.setState({ fileList });
	};

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
};

export default CLUploadImage;
