//const { execute } = require('@angular-devkit/build-angular/src/builders/extract-i18n');
const mysql = require('mysql2');
require('dotenv').config();

var pool = mysql.createPool({
    connectionLimit: 200,
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.BD_PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true
    }
})

exports.execute = (query,params=[])=>{
  return new Promise((resolve,reject)=>{
    pool.query(query,params,(error,result,fields)=>{
      if(error){
        reject(error)
      }
      else{
        resolve(result)
      }
    })
  })
}

exports.pool = pool
