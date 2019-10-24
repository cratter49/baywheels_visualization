const User = require('../models/user');

// this method adds a new user in our database
exports.post = (req, res) => {
    let user = new User();

    const { name, password } = req.body;

    if (!name || !password) 
    {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }

    user.name = name;
    user.password = password;

    user.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};  

// this method attempts to fetch a specific user in our database
exports.get = (req, res) => {
    const { name, password } = req.query;
  
    User.find({name: name, password: password}, (err, data) => {
      var result = {}, success = false;
  
      if (err)
        result.err = err;
      else if(!data.length)
        result.err = 'User was not found';
      else
      {
        result.data = data;
        success = true;
      }
  
      result.success = success;
  
      return res.json(result);
    });
  }
