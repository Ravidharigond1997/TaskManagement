// middleware/validateRequestBody.js
export const validateRequestBody = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        success: false,
        message: `Please enter all the required fields: ${missingFields.join(
          ", "
        )}`,
      });
    }
    next();
  };
};
