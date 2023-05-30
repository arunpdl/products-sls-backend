const formatResponse = ({ response, message, status }) => {
  return {
    message,
    data: response,
    status,
  };
};

module.exports = formatResponse;
