import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback", // same as in Google Cloud
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Create new user if not found
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: null, // Google users won't have password
          });

          await user.save();
        }

        // Return user to passport
        return done(null, user);
      } catch (err) {
        console.error("GOOGLE STRATEGY ERROR:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize & deserialize (not used if session:false, but good practice)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
