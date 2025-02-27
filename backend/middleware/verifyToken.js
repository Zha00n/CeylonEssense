const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(403).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token.' });
    }
};

module.exports = verifyToken;




























// const jwt = require("jsonwebtoken")

// const verifyToken = async(req, res, next) => {
//     if(!req.headers.authorization) return res.status(403).json({msg: 'Not authorized. No token'})

//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
//         const token = req.headers.authorization.split(' ')[1]
//         jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
//             if(err) return res.status(403).json({msg: 'Wrong or expired token'})
//             else {
//                 req.admin = data 
//                 next()
//             }
//         })
//     }
// }

// module.exports = verifyToken






