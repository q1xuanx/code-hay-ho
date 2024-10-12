const expres = require('express');
const connectDb = require('./config/connectdb.js');
const path = require('path')
const app = expres();
const PORT = 3000; 
app.use('/node-buoi2/public', expres.static(path.join(__dirname, 'public')));
app.use(expres.json());
app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`);
    connectDb();
});
const loginControllers = require(__dirname + "/controllers/loginController");
const userController = require(__dirname + "/controllers/userController");
app.use(loginControllers);
app.use(userController);
//npm i mongoose@7.6.3