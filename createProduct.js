"use strict";
const AWS = require("aws-sdk");
const formatResponse = require("./formatResponse");

module.exports.createProduct = async (event, context) => {
  const body = JSON.parse(Buffer.from(event.body, "base64").toString());
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_PRODUCT_TABLE,
    Item: {
      id: context.awsRequestId,
      price: body.price,
      name: body.name,
      description: body.description,
      imageUrl: body.imageUrl,
    },
  };
  await dynamoDb.put(putParams).promise();

  return formatResponse({
    message: "Product created successfully",
    status: 201,
  });
};
