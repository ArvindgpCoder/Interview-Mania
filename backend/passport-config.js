const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./UserModel.js');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    //console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
       // console.log(id);
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
