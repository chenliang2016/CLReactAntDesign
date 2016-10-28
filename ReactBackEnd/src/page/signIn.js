import React from 'react';
import styles from './signIn.less';
import { message ,Spin} from 'antd';
import userLoginAction from '../actions/loginAction';
import { connect } from 'react-redux'

@connect(
    state => ({
        loginState: state.login.loginState,
    })
)
class SignIn extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    handleSubmit = (e) => {
        e.preventDefault();

        var username = this.refs.name.value
        var password = this.refs.pass.value

        const { dispatch } = this.props
        dispatch(userLoginAction(username,password));
    };


    render() {

        let loading = false;
        if (this.props.loginState==="no"){
            loading=false;
        }else if(this.props.loginState==="start"){
            loading=true;
        }else if(this.props.loginState==="success"){
            loading=false;
        }else if(this.props.loginState==="fail"){
            loading=false;
        }

        return <div className={styles.LoginContainer}>
                  <section className={styles.container}>
                      <Spin spinning={loading}>
                            <h2>后台管理登录</h2>
                            <form onSubmit={this.handleSubmit}>
                                <input className={styles.input} type="text" ref="name" placeholder="请输入用户名"/>
                                <input className={styles.input} type="password" ref="pass" placeholder="请输入密码"/>
                                <button onClick={this.handleSubmit}>登录</button>
                            </form>
                      </Spin>
                 </section>
            </div>
    }
}

export default SignIn;

