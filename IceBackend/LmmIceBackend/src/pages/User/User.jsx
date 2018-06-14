import React, { Component } from 'react';
import SimpleFormDialog from './components/SimpleFormDialog';
import LmmTable from './components/LmmTable';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import LmmOperate from './components/LmmOperate';

const GET_USERS = gql`
    query userList($page: Int!) {
      user(page: $page,size:10) {
          count,
          userlist{
            userId,
            loginName,
            loginPasw,
            name
          }
      }
  }
`

export default class User extends Component {
  static displayName = 'User';

  constructor(props) {
    super(props);
    this.state = {
      formData:{},
      formVisible:false,
      isFormEdit:false,
      currentPage:1,
    };
  }

  changeFormData = (data) => {
    
    let formData = {
      userId:data.userId,
      loginName:data.loginName,
      loginPasw:data.loginPasw,
      name:data.name
    }

    this.setState({formData:formData, formVisible:true,isFormEdit:true})
  }

  showDialog = () => {
    this.setState({formVisible:true,isFormEdit:false,formData:{}})
  }

  hideDialog = () => {
    this.setState({
      formVisible: false,
    });
  };

  render() {
    return (
      <div>
      <LmmOperate showDialog={this.showDialog} />

      <SimpleFormDialog 
      isFormEdit = {this.state.isFormEdit}
      showDialog = {this.showDialog}
      hideDialog = {this.hideDialog}
      formVisible={this.state.formVisible} 
      formData={this.state.formData} 
      reloadData = {() => {this.tableRefetch()}} />

      <Query query={GET_USERS} variables={{page:1}}>
        {({ loading, error, data, refetch, fetchMore }) => {

              this.tableRefetch = refetch;

          return <div className="user-page">
              <LmmTable 
                loading={loading}
                currentPage ={this.state.currentPage}
                total={data.user.count}
                onPageChange = {(currentPage) => {
                  fetchMore({
                    variables: {
                      page: currentPage
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      this.setState({currentPage:currentPage});
                      if (!fetchMoreResult) return prev;
                      return fetchMoreResult;
                    }
                  })
                }}
                changeFormData = {(data) => this.changeFormData(data) }  
                data={data.user.userlist} reloadData = {() => {refetch()}} />
            </div>
        }}
      </Query>
      </div>
    );
  }
}
