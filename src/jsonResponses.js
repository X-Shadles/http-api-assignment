const respondJSON = (request, response, status, object, type) => {
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <code> ${object.id} </code>`;
    responseXML = `${responseXML} <msg> ${object.message} </msg>`;
    responseXML = `${responseXML} </response>`;

    response.writeHead(status, {
      'Content-Type': type[0],
    });
    response.write(responseXML);
    response.end();
  } else if (type[0] === 'application/json') {
    response.writeHead(status, {
      'Content-Type': type[0],
    });
    response.write(JSON.stringify(object));
    response.end();
  }
};
// Accept Header done, look at response.js

const success = (request, response, type) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success',
  };
  return respondJSON(request, response, 200, responseJSON, type);
};

const badRequest = (request, response, type, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'notBadRequest',
  };

  if (!params || params !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON, type);
  }

  return respondJSON(request, response, 200, responseJSON, type);
};

const unauthorized = (request, response, type, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'authorized',
  };

  if (!params || params !== 'yes') {
    responseJSON.message = 'Missing valid query parameter set to yes';
    responseJSON.message = 'You need to log in';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON, type);
  }

  return respondJSON(request, response, 200, responseJSON, type);
};

const forbidden = (request, response, type) => {
  const responseJSON = {
    message: 'Hey, you can\'t be here!',
    id: 'forbidden',
  };

  return respondJSON(request, response, 403, responseJSON, type);
};

const internal = (request, response, type) => {
  const responseJSON = {
    message: 'Internal Server Error',
    id: 'internal',
  };

  return respondJSON(request, response, 500, responseJSON, type);
};

const notImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'Status code for this is not implemented',
    id: 'notImplemented',
  };

  return respondJSON(request, response, 501, responseJSON, type);
};

const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!!',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON, type);
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
