const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

function initialise(pasport){
    const authenticateUser = (email, password, done) =>{

    } 
    passport.use(new LocalStrategy({usernameField:'email'}),authenticateUser)
    passport.serializeUser((user, done) => {     })
    passport.deserializeUser((id, done) => {     })
}