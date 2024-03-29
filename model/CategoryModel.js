const pool = require('../DbConnection/db');
const SELECT_ALL_CATEGORY ='SELECT * FROM category';
const moment = require('moment');
const localTime = moment().format('YYYY-MM-DD HH:mm:ss');
let  CATEGORY_MODEL = () => {};
CATEGORY_MODEL.prototype = {
//_ mean no need any return
get_category:_ =>{
  return new Promise((resolve,reject)=>{
    pool.query(SELECT_ALL_CATEGORY,(err,result)=>{
        if(err) throw err
         else resolve(result);
      });
  })
},
add_category:body=>{
  let category_data = body;
  const INSERT_CATEGORY_QUERY = `INSERT INTO category (category_lists,status,date) VALUES('${category_data.category_lists}',1,'${localTime}')`;

     return new Promise((resolve,reject)=>{
         pool.query(INSERT_CATEGORY_QUERY,(err,result)=>{
             //console.log(result);
             if(err) reject(err);
              resolve(result);
         })
     })
  },
edit_category :(id,body)=>{
    const CATEGORY_EDIT_QUERY = "UPDATE category SET category_lists = ?,date = ? WHERE category_id = ? ";
    return new Promise((resolve,reject)=>{
     pool.query(CATEGORY_EDIT_QUERY,[body.category_name_1,localTime,id],(err,results)=>{
         if(err) reject(err);
         console.log(body.userName);
         resolve(results);
         
     })
    })
},
remove_category :id =>{
  console.log(id);
 const CATEGORY_REMOVE_QUERY = "UPDATE category SET status = ? , date = ? WHERE category_id = ? ";
 return new Promise((resolve,reject)=>{
     pool.query(CATEGORY_REMOVE_QUERY,[0,localTime,id],(err,results)=>{
         if(err) reject(err);
         resolve(results);
     })
 })

}
}

module.exports = CATEGORY_MODEL.prototype;