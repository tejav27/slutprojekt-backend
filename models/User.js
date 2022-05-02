const {Model, DataTypes, ENUM} = require('sequelize')
const connection = require('../database/connection')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()


class User extends Model{
  static async authenticate(email, password){
    if(!email || !password){
      throw new Error('Invalid Credentials')
  }
    const user = await User.findOne({where: {email}})
    if(!user){
      throw new Error('Invalid email')
    }
    if(!bcrypt.compareSync(password, user.password)){
      throw new Error('Invalid password')
    }else{
      let token = await jwt.sign({
        userId: user.userId,
        role:user.role
    }, process.env.JWT_SECRET, {expiresIn: '1d'})

    const {email,userName,role} = user
    const userData = {email,userName,role}

    return {token}
    }
  }
}

  User.init(
    {
      userName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId:{
          type: DataTypes.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true
      },
      password:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      role:{
          type:DataTypes.ENUM('admin','worker','client'),
          allowNull:false
      }
    },
    {
      sequelize: connection,
      modelName: 'User',
      timestamps: false
    }
  )

  module.exports = User