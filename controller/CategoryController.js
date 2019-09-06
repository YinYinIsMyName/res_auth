const category_model = require('../model/CategoryModel');
const jwt = require('jsonwebtoken');
const key = 'mynewkey';
let CATEGORY_CONTROLLER = () => {};

CATEGORY_CONTROLLER.prototype = {

  category_get:async(req,res,next)=>{
   
   await jwt.verify(req.token, `${key}`,(err)=>{
    if(err){
        res.status(403).send({
           success:false,
           message:"Youre forbidden!You haven't logged in yet"
        })
             
      }
     else{
      var promise = category_model.get_category();
      promise.then(result=>{
        return res.send({
           success:true,
           data:result
        });
      }).catch(err=>res.send(err));
      }
})
        
        
    },
  category_add:(req,res,next)=>{
      //console.log(req.body.user);
      //like these object,have to be typed in postman
          const {category_lists} = req.body;
           //console.log(req.body);
           const promise = category_model.add_category(req.body);
            promise.then(data =>{
                res.send({
                   status:true, 
                   result:data
                  });
            })
            .catch(err=>console.log(err));
      
  },
  category_edit :(req,res,next)=>{
    const id = req.params.id;
    const {category_name_1} = req.body;
    const promise = category_model.edit_category(parseInt(id),req.body);
     promise.then(data=>{
         console.log(data);
         res.send({
             status:true,
             message:`You have updated at id = ${id}`,
             result:data
         })
         .catch(err=>console.log(err));
     })
},
   category_remove :(req,res,next)=>{
   const removed_id = req.params.id;
   const promise = category_model.remove_category(removed_id);
   console.log(promise);
   promise.then(data=>{
       res.send({
            message:"your selected category has been removed",
            result:data
       })
  })
  .catch(err=>res.send(err));

}

}

module.exports = CATEGORY_CONTROLLER.prototype;