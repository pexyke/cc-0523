const businessLogic = (req, res, next) => {
    if(!res.locals.userId) return res.sendStatus(401)

    console.log('épp fut az üzleti logika')
    
}

module.exports = businessLogic