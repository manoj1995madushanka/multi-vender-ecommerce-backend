class AuthController{
  admin_login = async(req,res)=>{
    console.log(res.body)
  }
}

module.exports = new AuthController();