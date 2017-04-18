import React from 'react';
import {Upload,Icon,message} from 'antd';
import {constant} from 'utils/constant';

import fetchUtil from 'utils/fetchUtil';

import {Qiniu} from 'utils/qiniuUtil'

import request from 'superagent-bluebird-promise'
import moment from 'moment';

class CLUploadImageToQiniu extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			fileList: []
		};

		this.uploadUrl = 'http://upload.qiniu.com'
        if (window.location.protocol === 'https:') {
          this.uploadUrl = 'https://up.qbox.me/'
        }

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
				var fileurl =  val;
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

   _customRequest = (options) => {
      console.log(options.file);
      fetchUtil.get(`/api/zhende/qiniu/token`)
  			.then((rs) => {
		   	this.uploadFile(options.file,rs.data.token);
  		}, e => {
  		});
   }

   uploadFile = (file,token) => {
	   	var self = this;

	   	var onUploadSuccess = this.props.onUploadSuccess;
    	var formItem = this.props.formItem;

		if (!file || file.size === 0) return null;

		const time =  moment()
        const timeString =   time.format("YYYYMMDDHHmmss");
		
		var key = "shop/"+timeString+".jpg";

        var r = request
            .post(this.uploadUrl)
            .field('key', key)
            .field('token', token)
            .field('x:filename', file.name)
            .field('x:size', file.size)
            .attach('file', file, file.name)
            .set('Accept', 'application/json')
			 .then(function(res) {
				onUploadSuccess(formItem,"https://appimage.1688zdw.com/"+key);
				file.url = "https://appimage.1688zdw.com/"+key;
				let fileList = [file];
				self.setState({ fileList });
			}, function(error) {
				console.log(error);
			});
   }

    render() {
        const uploadProps = {
			action: '/api/media/uploadToQiniu',
			listType: 'picture-card',
			fileList:this.state.fileList,
      		customRequest:this._customRequest,
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

export default CLUploadImageToQiniu;
