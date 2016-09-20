/**
 * Created by jf on 16/1/14.
 */

import reqwest from 'reqwest';
import * as _ from 'lodash';

class TableModel {

  showTotal(total) {
    return `共 ${total} 条`;
  }

  constructor(url, callback) {
    this.url = url;
    this.data = [];
    this.p = {};
    this.pagination = {
      current: 1,
      pageSize: 10,
      showTotal: this.showTotal,
      size : "middle",
      model: this
    };
    this.loading = false;
    this.callback = callback;
  }

  tableChange(pagination, filters, sorter) {
    const params = pagination.model.p;
    params.sortField = sorter.field;
    params.sortOrder = sorter.order;
    params.page = pagination.current++;
    for (let key in filters) {
      params[key] = filters[key];
    }
    console.log(params);
    pagination.model.fetch(params);
  }



  fetch(params = {}) {
    const base = {
      size: this.pagination.pageSize,
      page: this.pagination.current
    };

    params = _.extend(base, params);
    this.p = params;
    this.pagination.current = params.page;
    this.loading = true;
    var self = this;
    reqwest({
      url: this.url,
      method: 'get',
      data: params,
      type: 'json',
      success: (result) => {
        self.pagination.total = result.count;
        self.data = result.rows;
        self.loading = false;
        if (typeof self.callback == 'function') {
          self.callback(self);
        }
      }
    });
  }
}

class Ajax {
  static get(url, data = {}) {
    return reqwest({
      url: url,
      type: 'json',
      method: 'get',
      data: data
    });
  }

  static post(url, data = {}) {
    return reqwest({
      url: url,
      type: 'json',
      method: 'post',
      data: data
    });
  }
}

function SearchForm() {
  return function (target) {
  };
}

class StringUtil {
   static replaceAll(s,s1,s2){
　　    return s.replace(new RegExp(s1,"gm"),s2);
　　}
}

export {TableModel, Ajax, SearchForm,StringUtil};
