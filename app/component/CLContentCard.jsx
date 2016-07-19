import React from 'react';
import {Icon} from 'antd';

class CLContentCard extends React.Component {

    static defaultProps = {
        minHeight: 737,
    }

    constructor() {
        super();
    };

    render() {

        var minHeight = this.props.minHeight;

        return (
            <div style={{padding:24,height:"100%",backgroundColor: "white",minHeight: minHeight}}>
                <div className="title"><Icon type={this.props.icon} /> {this.props.title}</div>
                <div className="divier"/>
                <div>
                {this.props.children}
                </div>
            </div>
        );
    }
}

export default CLContentCard;
