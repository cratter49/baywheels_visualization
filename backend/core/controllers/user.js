const User = require('../models/user');

// this method adds a new user in our database
exports.post = (req, res, next) => {
    let user = new User();

    const { name, password } = req.body;

    if(!name || !password) 
    {
        return res.json({
          success: false,
          error: 'INVALID INPUTS',
        });
    }

    user.name = name;
    user.password = password;

    user.save((err, newUser) => {
        if(err) 
        {
          if(err.code === 11000)
            return res.json({ success: false, message: 'DUPLICATE' });
          else
            next(err);
        }

        return res.json({ user: newUser });
    });
};  

// this method attempts to fetch a specific user in our database
exports.get = (req, res, next) => {
    const { name, password } = req.query;
  
    User.findOne({ name: name }, (err, user) => {  
      if (err)
        next(err);
      else if(!user)
        return res.json({ success: false, message: 'MISSING' });
      else if(user.password !== password)
        return res.json({ success: false, message: 'INCORRECT_PASSWORD' });
    
      return res.json({ user: user });
    });
  }
