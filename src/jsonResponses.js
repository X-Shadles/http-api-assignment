const respondJSON = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/json'
  });
  response.write(JSON.stringify(object));
  response.end();
};
//Accept Header done, look at response.js

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success',
  };
  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'notBadRequest',
  };

  if (!params || params !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'authorized'
  };

  if (!params || params !== 'yes') {
    responseJSON.message = 'Missing valid query parameter set to yes';
    responseJSON.message = 'You need to log in';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  respondJSON(request, response, 200, responseJSON);
}

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'Hey, you can\'t be here!',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error',
    id: 'internal',
  };

  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'Status code for this is not implemented',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!!',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};


module.exports = {
  success,
  badRequest,
  forbidden,
  unauthorized,
  internal,
  notImplemented,
  notFound,
};