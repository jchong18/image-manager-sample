function handler(event) {
  var request = event.request;
  var headers = request.headers;
  var newUri;
  if (request.uri.includes('item')) {
    if (headers['accept']) {
      var itemId = request.uri.split('/')[2];
      var image = request.uri.split('/')[3];
      var acceptValue = headers['accept'].value;
      if (acceptValue.indexOf('avif') > 0) {
        newUri = `/item/modified/${itemId}/${image.substring(0, image.indexOf('.'))}.avif`;
      } else if (acceptValue.indexOf('webp') > 0) {
        newUri = `/item/modified/${itemId}/${image.substring(0, image.indexOf('.'))}.webp`;
      } else if (acceptValue.indexOf('png') > 0) {
        newUri = `/item/modified/${itemId}/${image.substring(0, image.indexOf('.'))}.png`;
      } else {
        return request;
      }
      var response = {
        statusCode: 302,
        statusDescription: 'Found',
        headers: {
          "location": { "value": newUri }
        }
      }
      return response;
    }
  }

  return request;
}
