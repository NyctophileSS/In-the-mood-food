var token = require('./createJWT.js');

exports.setApp = function ( app, client )
{

    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: id, firstName, lastName, error
    
     var error = '';
    
     const { login, password } = req.body;

     const db = client.db();
     const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
     // const results = await User.find({ Login: login, Password: password });
   
      var id = -1;
      var fn = '';
      var ln = '';
      var isVerified = false;

      var ret;
    
      if( results.length > 0 )
      {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
        isVerified = results[0].isVerified;

        if (isVerified) {
          try
          {
            const token = require("./createJWT.js");
            ret = token.createToken( fn, ln, id );
          }
          catch(e)
          {
            ret = {error:e.message};
          }
        }
        else {
          ret = {error:"account has not been verified"};
          res.status(401).json(ret);
        }
        
      }
      else
      {
          ret = {error:"Login/Password incorrect"};
      }
    
      res.status(200).json(ret);
    });

    app.post('/api/register', async (req, res, next) => 
    {
      // incoming: firstName, lastName, login, password, phoneNumber
      // outgoing: id, error
    
      var crypto = require('crypto');
      var nodemailer = require('nodemailer');
      var error = '';
      var bp = require('./Path');

      const { firstName, lastName, login, password, phoneNumber } = req.body;
      
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'derrickkeough@gmail.com',
            pass: 'vfxvvfbqirwebsrs'
        }
      });

      var userToken = crypto.randomBytes(16).toString('hex');

      const db = client.db();
      // create the user and assign a token for verification
      const results = await db.collection('Users').insertOne({FirstName:firstName, LastName:lastName, 
                                              Login:login, Password:password, PhoneNumber:phoneNumber, isVerified:false, token: userToken});

      const emailBody = "<b>Hello " + firstName + ", please use the included link to verify your email and gain access to your In the Mood Food account! " + bp.buildPath('verification') + " and enter the token: " + userToken + "</b>";


      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"In The Mood Food" <info@in-the-mood-food.com>',
        to: login,
        subject: "Hello ??? Registration Verification",
        text: "",
        html: emailBody,
      });

      var ret;
      var fn = firstName;
      var ln = lastName;
      var id = results.insertedId.toString();
      
      if( id != null )
      {
        try
        {
          const token = require("./createJWT.js");
          ret = token.createToken( fn, ln, id );
        }
        catch(e)
        {
          ret = {error:e.message};
        }
      }
      else
      {
          ret = {error:"Error creating user account"};
      }
    
      res.status(200).json(ret);
    });

    app.post('/api/verification', async (req, res, next) =>
    {
      // incoming: email, token
      // action: check for user with associated token, mark isVerified to true

      const { email, token } = req.body;

      const db = client.db();
      // const results = await db.collection('Users').findOne({Login:email, token:token});
      const results = await db.collection('Users').findOneAndUpdate({Login:email, token:token}, {$set: {isVerified:true}});

      var ret;
      if (results)
      {
        var fn = results.firstName;
        var ln = results.lastName;
        var id = results.id;
        try
        {
          const jwtToken = require("./createJWT.js");
          // ret = results;
          ret = jwtToken.createToken( fn, ln, id);
        }
        catch(e)
        {
          ret = {error:e.message};
        }
      }
      else 
      {
        ret = {error:"could not verify account"};
      }

      res.status(200).json(ret);
    });

    app.post('/api/forgot-password', async (req, res, next) => 
    {
      var error = '';

      var id = -1;
      var fn = '';
      var ln = '';

      var ret;
      var bp = require('./Path');

      const { email } = req.body;

      var nodemailer = require('nodemailer');

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'derrickkeough@gmail.com',
            pass: 'vfxvvfbqirwebsrs'
        }
      });

      const db = client.db();
      const results = await db.collection('Users').findOne({Login:email});

      const emailBody = "<b>Hello " + results.FirstName + ", please use the included link to reset your password and regain access to your In the Mood Food account!" + bp.buildPath('reset-password') + " and enter the token: " + results.token + ". If you feel you have received this email in error, feel free to ignore it.</b>";

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"In The Mood Food" <info@in-the-mood-food.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ??? Password Reset", // Subject line
        text: "", // plain text body
        html: emailBody, // html body
      });

      res.status(200).json(ret);
    });

    app.post('/api/reset-password', async (req, res, next) => 
    {
      var error = '';

      var id = -1;
      var fn = '';
      var ln = '';

      var ret;
      var bp = require('./Path');

      const { email, newPassword, passwordToken } = req.body;

      const db = client.db();
      // const results = await db.collection('Users').find({Login:email});
      const results = await db.collection('Users').findOneAndUpdate({Login:email, token:passwordToken}, {$set: {Password:newPassword}});

      // check the user exists
      if (results) 
      {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;

        const token = require("./createJWT.js");
        ret = token.createToken(fn, ln, id);

      }
      else {
        ret =  {error:"User with this email does not exist"};
      }

      res.status(200).json(ret);
    });
}
