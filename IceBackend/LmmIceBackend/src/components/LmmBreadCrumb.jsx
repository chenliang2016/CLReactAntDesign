import React, { Component } from 'react';
import { Breadcrumb } from '@icedesign/base';
import { Link} from "react-router-dom";

import { createHashHistory } from 'history';
const hashHistory = createHashHistory();

export default class LmmBreadCrumb extends Component {

  render() {
      let length = this.props.links.length;
    return (
      <div>
            <Breadcrumb>
                {
                    this.props.links.map((item,index) => {
                        if (index == 0){
                            return <Breadcrumb.Item key={index} link="">
                                    <div  style={{color:'#297bfb'}} onClick={() => {hashHistory.goBack()}}>{item.name}</div>
                            </Breadcrumb.Item>
                        }else if (length - 1 == index){
                            return <Breadcrumb.Item key={index} link="">
                            {item.name}
                            </Breadcrumb.Item>
                        }else{
                            return <Breadcrumb.Item key={index} link="">
                                {item.link != undefined ?
                                    <Link  style={{color:'#297bfb'}} to={item.link}>{item.name}</Link>
                                    :item.name
                                }
                       </Breadcrumb.Item>
                        }
                       
                    })
                }
            </Breadcrumb>
      </div>
    );
  }
}
