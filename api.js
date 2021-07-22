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

      const emailBody = "<b>Hello " + firstName + ", please use the included link to verify your email and gain access to your In the Mood Food account! https://cop4331-fourteen.herokuapp.com/api/verification/ and enter the token: " + userToken + " or if using staging: https://cop4331-fourteen-staging.herokuapp.com/api/verification/ or if testing locally: localhost:3000/api/verification/ </b>";

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"In The Mood Food" <info@in-the-mood-food.com>', // sender address
        to: login, // list of receivers
        subject: "Hello ✔ Registration Verification", // Subject line
        text: "", // plain text body
        html: emailBody, // html body
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
      const results = await db.collection('Users').findOne({email:email, token:token});

      var ret;
      if (results)
      {
        results.isVerified = true;
        var fn = results.firstName;
        var ln = results.lastName;
        var id = results.id;
        const jwtToken = require("./createJWT.js");
        ret = jwtToken.createToken( fn, ln, id);
      }
      else 
      {
        ret = {error:"could not verify account"};
      }

      res.status(200).json(ret);
    });

    app.post('/api/forgot-password', async (req, res, next) => 
    {
      require('dotenv').config();

      var error = '';

      var id = -1;
      var fn = '';
      var ln = '';

      var ret;

      const { email } = req.body;

      const db = client.db();
      const results = await db.collection('Users').find({Login:email});

      // check the user exists
      if (results.length > 0) {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;

        const token = require("./createJWT.js");
        ret = token.createToken(fn, ln, id);
        const link = ''

      }
      else {
        ret =  {error:"User with this email does not exist"};
      }

      res.status(200).json(ret);
    });
    
    app.post('/api/addcard', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
        
      const { userId, card, jwtToken } = req.body;

      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }
    
       const newCard = { Card: card, UserId: userId };
      // const newCard = new Card({ Card: card, UserId: userId });
      var error = '';
      try 
      {
        const db = client.db();
        const result = db.collection('Cards').insertOne(newCard);
        // newCard.save();
      }
      catch (e) 
      {
        error = e.toString();
      }

      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    
      cardList.push( card );
    
      var ret = { error: error };
      res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error
    
      var error = '';
    
      const { userId, search, jwtToken } = req.body;
      
      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      var _search = search.trim();
      const db = client.db();
      const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*', $options: 'r' } }).toArray();
      // const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });

      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Card );
      }
      
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { results:_ret, error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
    
}
