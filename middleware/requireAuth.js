const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authentication token required'})
    }

    // console.log(authorization);  //(bearer bsbshbcb.cdncnjd.ccmmc)
    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.User = await User.findOne({ _id }).select('_id') //so user will have only _id property
        next()  //after successfull authentication, access to the workouts api are provided, till then its protected by the middleware

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth