import React from 'react';
import { Menu,Icon,Breadcrumb,Dropdown,Row,Col} from 'antd';
const SubMenu = Menu.SubMenu;

class CLComplexMenu extends React.Component {
    render() {
        return (
              <SubMenu key="{this.props.key}" title={<span><Icon type="appstore" />{this.props.title}</span>}>
                  {this.props.menus.map(function(menu) {
                    return <Menu.Item key={menu.key}><Link to={menu.to}>{menu.title}</Link></Menu.Item>;
                  })}
              </SubMenu>
        );
    }
}

export default CLComplexMenu;
