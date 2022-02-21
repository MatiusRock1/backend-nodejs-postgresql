const bcrypt = require('bcrypt');

async function hashPassword (){
  const myPassword = 'admin 123';
  const hash= await bcrypt.hash(myPassword, 10);
  console.log(hash);
}
async function verifyPassword (){
  const myPassword = 'admin 123';
  const hash = "$2b$10$fDVVDwFjKt/9r0C.OgQWPel1qddUXpoB3Id7BCqLmcL0oVt5jYcZu";
  const isMatch= await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}



hashPassword();
verifyPassword();
