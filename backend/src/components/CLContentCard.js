import React from 'react';
import {Icon} from 'antd';
import styles from './CLContentCard.less';

class CLContentCard extends React.Component {

    static defaultProps = {
        minHeight: 737,
    };

    constructor() {
        super();
    };

    render() {
        const minHeight = this.props.minHeight;
        const mHeight =  parseInt(minHeight);
        return (
            <div style={{padding:24,height:"100%",backgroundColor: "white",minHeight: mHeight}}>
                <div className={styles.cardtitle}><Icon type={this.props.icon} /> {this.props.title}</div>
                <div className={styles.carddivier}/>
                <div>
                {this.props.children}
                </div>
            </div>
        );
    }
}

export default CLContentCard;
