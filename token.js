const jwt = require('jsonwebtoken');

const secret = 'mySecret';

const payload = {
  sub:1,
  role: 'customer'
}
function signToken(payload,secret){
  return jwt.sign(payload,secret);
}
function verifyToken(token,secret){
  return jwt.verify(token,secret);
}

const token = signToken(payload,secret);
const payloadresponse = verifyToken(token,secret);

console.log(token);
console.log(payloadresponse);


