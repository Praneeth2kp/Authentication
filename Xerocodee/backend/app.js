const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const axios = require('axios');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const app = express();
const session = require('express-session');
const database = require('./models/database.js')
const User = require('./models/user.js');
const Optionstore = require('./models/optionstore.js');
const Hostingoption = require('./models/hostingoption.js')
require('dotenv').config()
const PORT = 5000
database();
app.use(cors())
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    req.session._garbage = Date();
    req.session.touch();
    next();
});


const verifyAccessToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access token not provided' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid access token' });
    }
};



app.post('/api/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const newUser = new User({
            firstname,
            lastname,
            email,
            password,
        });
        const savedUser = await newUser.save();

        const token = jwt.sign({ email: savedUser.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'An error occurred during signup' });
    }
})

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            res.status(200).json({ success: true })
        } else {
            res.status(401).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error during login" });
    }
});


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/home1",
    scope: ['profile', 'email'],
},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });

            if (!user) {
                user = new User({
                    email: profile.emails[0].value,
                    firstname: profile.displayName,
                });
                await user.save();

                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });

                return cb(null, token);
            }

            return cb(null, user);
        } catch (error) {
            return cb(error, false);
        }
    }


));

app.get('/api/auth/github', passport.authenticate('github', { scope: ['profile', 'email'] }));
app.get('/api/auth/github/callback',
    passport.authenticate("github", (err, token) => {
        if (err) {
            return res.redirect("http://localhost:3000/signin");
        }

        res.redirect(`http://localhost:3000/home1`);
    })
);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://praneeth-task.onrender.com/auth/google/callback',
        scope: ['profile', 'email'],
    },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = new User({
                        email: profile.emails[0].value,
                        firstname: profile.displayName,
                    });
                    await user.save();
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                        expiresIn: '1h',
                    });
                    return done(null, token);
                }
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        })
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    (req, res, next) => {
        passport.authenticate('google', (err, token) => {
            if (err) {
                return res.redirect("http://localhost:3000/signup");
            }
            res.redirect(`http://localhost:3000/home1`);
        })(req, res, next);
    }
);

app.get('/api/search-repositories', async (req, res) => {
    console.log('Search request received');
    try {
        const accessToken = process.env.GITHUB_ACCESS_TOKEN;
        const searchQuery = req.query.q;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}`, {
            headers,
        });
        const repositories = response.data.items.map((repo) => ({
            name: repo.name,
            owner: repo.owner.login,
        }));
        res.status(200).json({ message: 'Repositories fetched', repositories });
    } catch (error) {
        console.error('Error searching repositories:', error);
        res.status(500).json({ message: 'An error occurred while searching repositories' });
    }
});


app.post('/api/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'An error occurred during logout' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
});

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        if (id) {
            const user = await User.findById(id);
            cb(null, user);
        } else {
            cb(null, null);
        }
    } catch (error) {
        cb(error, null);
    }
});

app.post("/api/developer", async (req, res) => {
    try {
        const { developername } = req.body;
        const newOptionstore = new Optionstore({ developername });
        await newOptionstore.save();
        res.status(200).json({ message: "Developer name saved successfully" });
    } catch (error) {
        console.error("Error saving developer name:", error);
        res.status(500).json({ message: "Error saving developer name" });
    }
});
app.post("/api/organisation", async (req, res) => {
    try {
        const { organisationname } = req.body;
        const newOptionstore = new Optionstore({ organisationname });
        await newOptionstore.save();
        res.status(200).json({ message: "Organisation name saved successfully" });
    } catch (error) {
        console.error("Error saving organisation name:", error);
        res.status(500).json({ message: "Error saving organisation name" });
    }
});

app.post("/api/company", async (req, res) => {
    try {
        const { companyname } = req.body;
        const newOptionstore = new Optionstore({ companyname });
        await newOptionstore.save();
        res.status(200).json({ message: "Company name saved successfully" });
    } catch (error) {
        console.error("Error saving company name:", error);
        res.status(500).json({ message: "Error saving company name" });
    }
});

app.post("/api/option", async (req, res) => {
    try {
        const { selectedOption } = req.body;
        const newHostingoption = new Hostingoption({ selectedOption });
        await newHostingoption.save();
        res.status(200).json({ message: "Selected hosting option saved successfully" });
    } catch (error) {
        console.error("Error saving selected hosting option:", error);
        res.status(500).json({ message: "Error saving selected hosting option" });
    }
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})