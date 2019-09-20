async function hello() {
  return new Promise(async resolve => {
    try {
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          'hello': 'Hello World'
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: "Some error occurred. Please try again later."
        }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        }
      });
    }
  });
}

module.exports = {
    hello
}