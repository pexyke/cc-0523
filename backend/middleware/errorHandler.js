// express beépített func, 4 paramatérként első az error
const errorHandler = (error, req, res, next) => {
    console.log(error)
    res.status(500).json('Something went wrong')
  }

  module.exports = errorHandler