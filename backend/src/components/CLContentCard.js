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
            <div style={{padding:24}}>
                <div className={styles.cardtitle}><Icon type={this.props.icon} /> {this.props.title}</div>
                <div className={styles.carddivier}/>
                {this.props.children}
            </div>
        );
    }
}

export default CLContentCard;
