const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const eventeraRoutes = require('./api/eventera/eventera.routes')
const cloudinaryRoutes = require('./api/cloudinary.routes')
const history = require('connect-history-api-fallback');
const logger = require('./services/logger.service')
const socketService = require('./services/socket.service')

const sessionMiddleware =  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
module.exports = sessionMiddleware
  app.use(cookieParser())
app.use(bodyParser.json());
app.use(sessionMiddleware)
app.use(history())


if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://localhost:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/eventera', eventeraRoutes)
app.use('/api/upload/cloudinary', cloudinaryRoutes)
socketService.setup(http);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));

}


const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});

