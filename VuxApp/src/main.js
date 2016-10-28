import Vue from 'vue'

import App from './App'
import Home from './components/HelloFromVux'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';

import InfoList from './pages/InfoList';

import InfoDetail from './pages/InfoDetail';

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)
Vue.use(VueResource);

const router = new VueRouter()

router.map({
  '/': {
    component: Home
  },
  '/infoList': {
    component: InfoList
  },
  '/infoDetail/:id': {
    component: InfoDetail
  }
})


router.start(App, '#app')

