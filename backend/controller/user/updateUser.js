const userModel = require("../../models/userModel")

async function updateUser(req,res) {
    try {

        const sessionUser = req.userId

        const {userId, email, name, role} = req.body
        const payload = {
            ...(email && {email: email}),
            ...(name && {name: name}),
            ...(role && {role: role})
        }

        const user = await userModel.findById(sessionUser)

        const update = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data: update,
            message: "User updated successfully",
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

module.exports = updateUser