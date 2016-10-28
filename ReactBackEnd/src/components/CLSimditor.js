import React from 'react';
import ReactDOM from 'react-dom';
import Simditor from 'simditor';
require('simditor/styles/simditor.css');

class CLSimditor extends React.Component{

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);

        const value = nextProps.value;
        if (value) {

            if (this.getValue() !== value){
                this.editor.setValue(value);
            }
        }
    };



    componentDidMount() {
        this.initEditor();
    }

    initEditor = ()=>{
        var textbox = ReactDOM.findDOMNode(this.refs.textarea);
        this.editor = new Simditor({
            textarea: textbox,
            toolbar:[
                'title','bold','italic','underline','strikethrough','fontScale','color',
                'ol' , 'ul' , 'blockquote','code' , 'table','link','image','hr' , 'indent',
                'outdent','alignment'
            ],
            upload:{
                url:"/api/media/simditorUploadImage",
                params: null,
                connectionCount: 3,
                leaveConfirm: 'Uploading is in progress, are you sure to leave this page?'
            }
        });
        this.editor.on('valuechanged', this._handleValueChange);
    };

    getValue = () => {
        return this.editor ? this.editor.getValue() : '';
    };

    _handleValueChange = (e) => {
        var changeFun = this.props.onValueChange;
        changeFun(this.getValue());
    };

    render(){
        return(
            <div>
                <textarea id="editor" placeholder="输入内容" ref='textarea' name={this.props.name} ></textarea>
            </div>
        );
    }
}

export default CLSimditor;