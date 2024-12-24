const validatorMiddleware = (schema) => (req, res, next) => {
  try {
    req.body = { ...req.body, ...schema.parse(req.body) };
    next();
  } catch (error) {
    next(error);
  }
};

export default validatorMiddleware;
