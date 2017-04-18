### form表单熟悉

```
  const formProps = {
	    visible: this.props.formVisible,
	    edit: this.props.formedit,
	    formData: this.props.formdata,
	    formItems: formItems,
	    formValueName:"title",//title:使用lable的值作为form表单的值，使用value的值作为form表单的值
	    onClose: this.formClose,
	    dateFormatList: ['start', 'end'],//需要格式化的字段名
	    deleteFormItemList:['createAt'],//需要删除的字段名
	    updateUrl: '/api/zhende/activity/update',
	    addUrl: '/api/zhende/activity/add'
  };

```

### formItems 属性

树结构

```

{
            type: "TreeSelect",
            title: "选择区域",
            arrname: "area",
            treeUrl: "/api/zhende/area/listByPid",
            treeSelectFormTitle: "name",//value，跟title同时设置时需要
            rootKey:"101",
            treeNode: {
                title: 'name',
                key: 'name',
                pkey: 'pid'
            },
            require: true
}, 
        
```

文本

```
		{
            type: "Input",
            title: "菜单名称",
            arrname: "name",
            require: true
        },
        
```

下拉选择

```

  {
    type: "Select",
    title: "活动类别",
    arrname: "activityType",
    require: true,
    selectOptions:[
      {name:"新人大礼包",
      value:"0",},
      {name:"周期性活动礼包",
      value:"1",}
    ],
  },

```

时间

```
  {
    type: "DatePicker",
    title: "活动开始时间",
    arrname: "start",
    require: true
  }

```


## 操作

```
showForm = () => {
  const {
    dispatch
  } = this.props;
  dispatch(formAdd());
};

deleteHandle = (record) => {
    const currentCityName = this.props.currentCityName;
    const self = this;
    const {
        dispatch
    } = this.props;
    return function() {
        confirm({
            title: '提示',
            content: '确认删除？',
            onOk() {
                dispatch(deleteActivity(record.id,currentCityName));
            },
            onCancel() {}
        });
    };
};

editHandle = (record, index) => {
    const {
        dispatch
    } = this.props;
    return function() {
        dispatch(formEdit(record));
    };
};

formClose = (d) => {
  const {
    dispatch
  } = this.props;
  dispatch(formHide());
  if (d) {
    dispatch(getList(1));
  }
};

```