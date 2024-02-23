import mongooseClient from 'mongoose';

export interface User{
    UserName:string,
    secret:string,
    
}

const UserSchema = new mongooseClient.Schema<User>({
    UserName:{type:'string'},
    secret:{type:'string'},
  });
  
  var UsersModel = mongooseClient.model<User>('Users', UserSchema);
  
  module.exports = UsersModel;
  