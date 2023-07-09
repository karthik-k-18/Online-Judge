const cors = require('cors');

//middleware function to only allow from ALLOWED_HOSTS

const corsOptions = {
    origin: function (origin, callback) {
        if (process.env.ALLOWED_HOSTS.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

module.exports = cors(corsOptions);