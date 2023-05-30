"use strict";
const AWS = require("aws-sdk");
const formatResponse = require("./formatResponse");

module.exports.createProduct = async (event, context) => {
  console.log("Received event:", event);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_PRODUCT_TABLE,
    Item: {
      id: context.awsRequestId,
      price: event.price,
      name: event.name,
      description: event.description,
      imageUrl: event.imageUrl,
    },
  };
  await dynamoDb.put(putParams).promise();

  return formatResponse({
    message: "Product created successfully",
    status: 201,
  });
};
