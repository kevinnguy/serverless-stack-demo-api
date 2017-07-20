import * as dynamoDbLib from './libs/dynamodb-lib';
import { response } from './libs/response-lib';

export const main = async (event, context, callback) => {
  const params = {
    TableName: 'notes',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      callback(null, response(200, result.Item));
    } else {
      callback(null, response(500, { error: { message: 'Item not found.' }}));
    }
  } catch(e) {
    callback(null, response(e.statusCode, { error: e }));
  }
};
