import React from 'react';
import {
	Icon,
	Row,
	Col
} from 'antd';
import styles from './CLContentCard.less';

class CLContentCardWithClose extends React.Component {

	static defaultProps = {
		minHeight: 737,
	};

	constructor() {
		super();
	};

	render() {
		const minHeight = this.props.minHeight;
		const mHeight = parseInt(minHeight);
		return (
			<div style={{padding:24,height:"100%",backgroundColor: "white",minHeight: mHeight}}>
                <div className={styles.cardtitle}>
					<Row>
	                    <Col span={12}>
	                        <Icon type={this.props.icon} /> {this.props.title}
	                    </Col>
	                    <Col>
	                    	<div className={styles.close}  >
	                    		<a onClick={this.props.onCloseCard} ><Icon type="close" /> </a>
	                    	</div>
	                    </Col>
	                </Row>
                </div>
                <div className={styles.carddivier}/>
                <div>
                {this.props.children}
                </div>
            </div>
		);
	}
}

export default CLContentCardWithClose;