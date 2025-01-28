const userModel = require("../../models/userModel")

async function allUsers(req,res){
    try {

        const allUsers = await userModel.find()
        res.json({
            data: allUsers,
            message: "All Users",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = allUsers