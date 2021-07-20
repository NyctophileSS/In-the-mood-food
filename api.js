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

      // for testing
      // const transporter = nodemailer.createTransport({
      //   host: 'smtp.ethereal.email',
      //   port: 587,
      //   auth: {
      //       user: 'edd.wolff6@ethereal.email',
      //       pass: 'V5enXDtX4e3212Gup3'
      //   }
      // });

      const db = client.db();
      // create the user
      const results = await db.collection('Users').insertOne({FirstName:firstName, LastName:lastName, 
                                              Login:login, Password:password, PhoneNumber:phoneNumber, isVerified:false});
      // create the user's token for email verification
      const tokenResults = await db.collection('Tokens').insertOne({_userId: results.insertedId, token: crypto.randomBytes(16).toString('hex')});

      const emailBody = "<b>Hello, please use the included link to verify your email and gain access to your In the Mood Food account! https://cop4331-fourteen.herokuapp.com/api/verification/" + tokenResults.insertedId + " or if using staging: https://cop4331-fourteen-staging.herokuapp.com/api/verification/" + tokenResults.insertedId + ", or if testing locally: localhost:3000/api/verification/" + tokenResults.insertedId + "</b>";

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
      // incoming: token _id
      // action: find account associated with token _id and make isVerified true

      // TODO: FLESH OUT THIS ENDPOINT

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
