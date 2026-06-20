import User from "../model/user.js";

export const login = async(req, res) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username})

        if(!user){
            return res.status(404).json({success: false, message: "Wrong username"})

        }

        if(user.password !== password){
            return res.status(401).json({success: false, message:"Wrong password"})

        }
        return res.status(200).json({success: true, message: "login successful", user})
    }


catch(error){
    return res.status(500).json({success: false, message: error.message})
}
}