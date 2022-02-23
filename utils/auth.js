const withAuth = (req, res, next) => {
    // checking for existence of a session property
    if (!req.session.user_id) {
        // use redirect if session property is not there
      res.redirect('/login');
    } else {
        // if session property does exist it will call next
        // which could be another middleware fuction or the final function that will render the template
      next();
    }
  };
  
  module.exports = withAuth;