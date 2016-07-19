import React from 'react';
import {Button,Upload,Icon} from 'antd';
import {Ajax,StringUtil} from '../common/Common';
import {constant} from '../common/constant';

let CLUploadFiles = React.createClass({
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

    	var onFilesChangeSuccess = this.props.onFilesChangeSuccess;
		var formItem = this.props.formItem;

        var self = this;
	    let fileList = info.fileList;

	    var fileurls = "";

	    // 2. 读取远程路径并显示链接
	    fileList = fileList.map((file) => {
	    	if (file.response) {
	        // 组件会将 file.url 作为链接进行展示
	        	file.url = file.response.url;
	   		}

		    if (fileurls=="") {
		    	fileurls += file.url;
		    }else{
		    	fileurls += ";" + file.url;
		    }
	      return file;
	    });


	    fileurls = StringUtil.replaceAll(fileurls,constant.urlPrex,"");

        onFilesChangeSuccess(formItem,fileurls);

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
		  action: '/api/media/uploadFiles',
		  fileList:this.state.fileList,
		  onChange: this.handleChange,
		  multiple: true
		};

        return (
        	<Upload {...uploadProps}>
		      <Button type="ghost">
		        <Icon type="upload" /> 点击上传
		      </Button>
		    </Upload>
        );
    }
});

export default CLUploadFiles;
