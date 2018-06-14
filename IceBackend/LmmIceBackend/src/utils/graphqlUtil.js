import { Feedback } from '@icedesign/base';

import { createHashHistory } from 'history';
const hashHistory = createHashHistory();

import gql from "graphql-tag";

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const graphqlUtil = {};

graphqlUtil.query = async (queryString) => {
    try {
        let graphqlRequest = new Promise((resolve,reject) => {
            client
            .query({
                query: gql`
                ${queryString}
                `
            })
            .then(result => {
                let data = result.data;
                resolve(data);
            }).catch((error) => {
                Feedback.toast.error('网络异常');
                hashHistory.replace('/login');
            })
            
        })
        return graphqlRequest;
    } catch (e) {
        throw new Error("网络请求异常");
    }
};

graphqlUtil.queryWithParams = async (queryString,params) => {
    try {
        let graphqlRequest = new Promise((resolve,reject) => {
            client
            .query(
                {
                    query:queryString,
                    variables:params,
                    fetchPolicy: 'network-only'
                })
            .then(result => {
                let data = result.data;
                resolve(data);
            }).catch((error) => {
                Feedback.toast.error('网络异常');
                hashHistory.replace('/login');
            })
            
        })
        return graphqlRequest;
    } catch (e) {
        throw new Error("网络请求异常");
    }
};

graphqlUtil.mutation = async (mutationString,params) => {
    try {
        let graphqlRequest = new Promise((resolve,reject) => {
            client
            .mutate({
                mutation: gql`
                ${mutationString}
                `
            },{
                variables:params,
            })
            .then(result => {
                let data = result.data;
                resolve(data);
            }).catch((error) => {
                Feedback.toast.error('网络异常');
                hashHistory.replace('/login');
            })
        })
        return graphqlRequest;
    } catch (e) {
        throw new Error("网络请求异常");
    }
};



export default graphqlUtil;