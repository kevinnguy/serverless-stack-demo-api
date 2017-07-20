import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { response } from './libs/response-lib';

export const main = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'notes',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime(),
    },
  };

  try {
    const result = await dynamoDbLib.call('put', params);
    callback(null, response(200, params.Item));
  } catch(e) {
    callback(null, response(e.statusCode, { error: e }));
  }
};
