// this is where you put a handler
// these are all AWS Lambda (serverless functions) things

exports.handler = async (event, context) => {
  console.log(event);
  return {
    statusCode: 200,
    body: 'HELLO',
  };
};
