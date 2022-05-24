const auth = (middlewareParams) => (req,res, next) => {    
    console.log('épp autentikálok')
    const userId = req.header('authorization')
    res.locals.userId = userId // konvenció
    
    if(middlewareParams.block && !res.locals.userId) return res.sendStatus(401)
    
    next() 
}

module.exports = auth