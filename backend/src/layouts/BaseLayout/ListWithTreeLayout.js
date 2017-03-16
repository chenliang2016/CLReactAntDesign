/**
 * Created by cl on 2016/10/27.
 */
import React from 'react';
import {
    Row,
    Col,
} from 'antd';
import styles from "./ListWithTreeLayout.less";
import CLTree from "../../components/CLTree";

class ListWithTreeLayout extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span="4">
                        <div className={styles.treeLayout}>
                            <div className={styles.treeTitle}>
                                {this.props.treeTitle}
                                <div className={styles.treeDes}>
                                    {this.props.treeTitleDes}
                                </div>
                            </div>
                            <CLTree treeUrl={this.props.treeUrl} treeNode={this.props.treeNode}
                                    onSelect={this.props.onSelect}/>
                        </div>
                    </Col>
                    <Col span="20" style={{backgroundColor: 'white'}}>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ListWithTreeLayout;