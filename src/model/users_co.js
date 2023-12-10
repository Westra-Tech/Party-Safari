db.createCollection("users_co", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "password"],
      properties: {
        username: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required"
        }
      }
    }
  }
});

db.users_co.createIndex({ "username": 1 }, { unique: true });
