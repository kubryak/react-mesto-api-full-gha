const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (!err.statusCode) {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
};

module.exports = errorHandler;
