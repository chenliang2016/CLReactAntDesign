import React from 'react';
import styles from './CLTopMenu.less';

const CLTopMenu = ({icon,title,onClickMenu}) => {
    return  <div onClick={() => onClickMenu()} className={styles.menuContainer}>
                <img src={icon} className={styles.menuIcon}/>
                <span className={styles.menuTitle}>{title}</span>
            </div>
}

export default CLTopMenu;
