const adminModel = require('../models/adminModel')
const {responseReturn} = require("../utilities/response");
const {createToken} = require("../utilities/tokenCreate");
const bcrpty = require('bcrypt')

class AuthController {
  admin_login = async (req, res) => {
    const {email, password} = req.body
    try {
      const admin = await adminModel.findOne({email}).select('+password')
      console.log(admin)
      if (admin) {
        const match = await bcrpty.compare(password, admin.password)
        console.log(match)

        if (match) {
          // generate coockie
          const token = await createToken({
            id: admin._id,
            role: admin.role
          })
          res.cookie('accessToken', token, {expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})

          responseReturn(res, 200, {token, message: "Login Success"})
        } else {
          responseReturn(res, 4040, {error: 'Password Wrong'})
        }
      } else {
        responseReturn(res, 404, {error: 'Email not found'})
      }
    } catch (e) {
      responseReturn(res, 500, {error: e.message})
    }
  }
}

module.exports = new AuthController();