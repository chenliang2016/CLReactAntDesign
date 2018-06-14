import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import router from './router';

import { Feedback } from '@icedesign/base';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { createHashHistory } from 'history';
const hashHistory = createHashHistory();

const client = new ApolloClient({
  uri: '/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: async (operation) => {
    const token = await sessionStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    // if (graphQLErrors) {
    //   console.log(graphQLErrors);
    //   sendToLoggingService(graphQLErrors);
    // }
    // if (networkError) {
      hashHistory.replace('/login');
      Feedback.toast.error('网络异常');
    // }
  },
});

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
  <ApolloProvider client={client}>
  {router}
  </ApolloProvider>, ICE_CONTAINER);
