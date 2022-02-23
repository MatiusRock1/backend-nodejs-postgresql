
const UserService = require('../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');
const service = new UserService();


class AuthService{

  async getUser(email, password){

    const user = await service.findbyEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }
  async signToken(user){

    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload,config.JWTSecret);
    return{
      user,
      token
    };
  }
  async sendmail(email){
    const user = await service.findbyEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.fromEmail,
        pass: config.fromEmailPass
      }
    });
    await transporter.sendMail({
      from: 'jorgetrujillo@matius-rock.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Este es un nuevo correo", // Subject line
      text: "Hola santi", // plain text body
      html: "<b>Hola santi</b>", // html body
    });
    return { message : 'mail sent'};
  }

}
module.exports = AuthService;
