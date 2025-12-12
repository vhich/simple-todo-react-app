const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
    return;
  } else {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export default errorHandler;
