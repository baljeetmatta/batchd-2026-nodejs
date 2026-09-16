const jwt=require("jsonwebtoken")
function auth(req,res,next){

      const headers=  req.headers.authorization;
      if(!headers)
      {
        return res.status(403).json({
            message:"No Headers"
        })
      }
      // Bearer Token

      const token=headers.split(" ")[1];
      if(!token)
      {
        return res.status(403).json({
            message:"No Token"
        })
      }

      const decoded= jwt.verify(token,process.env.JWT_KEY);

      req.user=decoded;
      next();






}
module.exports=auth;