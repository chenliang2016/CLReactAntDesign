import React from 'react';
import ReactDOM from 'react-dom';
import Simditor from 'simditor';
require('simditor/styles/simditor.css');

class CLSimditor extends React.Component{

    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
        if (nextProps.value!=undefined){
            this.editor.setValue(nextProps.value);
        }
    }

    componentDidMount() {
        this.initEditor();
    }

    initEditor(){
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
    }

    getValue() {
        return this.editor ? this.editor.getValue() : '';
    }

    _handleValueChange = (e) => {
        var changeFun = this.props.onChange;
        changeFun(this.props.name,this.getValue());
    }

    render(){

        return(
            <div>
                <textarea id="editor" placeholder="Balabala" ref='textarea' name={this.props.name} value={this.props.value}   autofocus></textarea>
            </div>
        );
    }
}

export default CLSimditor;