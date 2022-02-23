
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

  async sendRecovery(email){
    const user = await service.findbyEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.JWTSecret, {expiresIn: '15min'});
    const link = `http://localhost:3000/view/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.fromEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email para recuperar contrase;a", // Subject line
      html: `<b>ingresa a este link para recuperar la contrase;a => ${link}</b>`, // html body
    };
    const rta = await this.sendmail(mail);
    return rta;
  }
  async sendmail(infomail){

    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.fromEmail,
        pass: config.fromEmailPass
      }
    });
    await transporter.sendMail(infomail);
    return { message : 'mail sent'};
  }
  async changePassword(token,newPassword){
    try {
      const payload = jwt.verify(token,config.JWTSecret);
      const user = await service.findOne(payload.sub);
      console.log(user);
      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword,10);
      await service.update(user.id, {recoveryToken: null, password:hash});
      return {message: 'password change'}

    } catch (error) {
      throw boom.unauthorized();
    }
  }

}
module.exports = AuthService;
