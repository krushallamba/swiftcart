async function userLogOut(req,res){
    try {
        res.clearCookie("token")
        res.json({
            message: "Logged out",
            error:false,
            success: true,
            data: []
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports  = userLogOut