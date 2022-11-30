const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'alchemy.cn18',
            pass: 'codingninjas'
        }
    },
    google_client_id: "15657753241-hrafbh91ej5kjcrilgg2017bgcvqrdui.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production =  {
    name: 'development',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: 'you can add some random key here',
    db: 'codeial_production',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'alchemy.cn18',
            pass: 'codingninjas'
        }
    },
    google_client_id: "15657753241-hrafbh91ej5kjcrilgg2017bgcvqrdui.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'some random key',//here aslo you can add some random key & put that to env variable
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);