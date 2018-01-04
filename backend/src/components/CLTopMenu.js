import React from 'react';
import styles from './CLTopMenu.less';

const CLTopMenu = ({isOnFoucs,icon,title,onClickMenu}) => {
    return  <div onClick={() => onClickMenu()} className={isOnFoucs? styles.menuContainerFoucs: styles.menuContainerNormal}>
                <span className={isOnFoucs?styles.menuTitleFoucs:styles.menuTitleNormal}>{title}</span>
            </div>
}

export default CLTopMenu;
