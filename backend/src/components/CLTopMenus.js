import React from 'react';
import styles from './CLTopMenu.less';
import CLTopMenu from 'components/CLTopMenu'

class CLTopMenus extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            selectMenu:-1,
        }
    }

    onClickMenu = (id,i) => {
        this.setState({selectMenu:i});
        this.props.onClickMenu(id);
    }

    render() {
        return <div className={styles.topMenuCotainer}>
        {this.props.menus.map((item,i) => {
            return <CLTopMenu 
                key={i}
                isOnFoucs = {this.state.selectMenu == i? true:false}
                onClickMenu = {() => {this.onClickMenu(item.id,i)}}
                title={item.title} />
        })}
        </div>
    }
    
}

export default CLTopMenus;


