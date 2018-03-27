const Service = require('egg').Service;
class BaseService extends Service {

    async query(sqlString){
        return await this.app.mysql.query(sqlString);
    }

    async delete(tableName,params) {
        const result = await this.app.mysql.delete(tableName, params);
        return result;
    }

    async add(tableName,data){
        const result = await this.app.mysql.insert(tableName, data);
        const insertSuccess = result.affectedRows === 1;
        return insertSuccess;
    }
    
    async update(tableName,data,whereParams){
        const result = await this.app.mysql.update(tableName,data, {
            where:whereParams,
        });
        const updateSuccess = result.affectedRows === 1;
        return updateSuccess;
    }

    async updateNormal(tableName,data){
        const result = await this.app.mysql.update(tableName,data);
        const updateSuccess = result.affectedRows === 1;
        return updateSuccess;
    }
}

module.exports = BaseService;