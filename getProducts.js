"use strict";
const AWS = require("aws-sdk");
const formatResponse = require("./formatResponse");
const sortByDate = require("./sortByDate");

module.exports.getProducts = async () => {
  const scanParams = {
    TableName: process.env.DYNAMODB_PRODUCT_TABLE,
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  return formatResponse({
    response: result && result.Items && result.Items.sort(sortByDate) || [] ,
    status: 200,
  });
};
