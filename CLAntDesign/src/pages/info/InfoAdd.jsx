import React from 'react';
import ReactDOM from 'react-dom';
import Simditor from 'simditor';
require('simditor/styles/simditor.css');

class InfoAdd extends React.Component{

    componentDidMount() {
        var textbox = ReactDOM.findDOMNode(this.refs.textarea);
        // this.editor.on("valuechanged", (e, src) => {
        //     this.props.fields.body.onChange(this.editor.getValue());
        // });

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
    }

    render(){
        return(
            <div>
                <textarea id="editor" placeholder="Balabala" ref='textarea'   autofocus></textarea>
            </div>
        );
    }
}

export default InfoAdd;