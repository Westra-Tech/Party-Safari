// rsvps_co.js
db.createCollection("rsvps_co", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["user_id", "party_id", "rsvp_date"],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "_id is the primary key and must be an ObjectId",
          },
          user_id: {
            bsonType: "objectId",
            description: "user_id is required and must be an ObjectId",
          },
          party_id: {
            bsonType: "objectId",
            description: "party_id is required and must be an ObjectId",
          },
          /*rsvp_date: {
            bsonType: "date",
            description: "rsvp_date is required and must be a date",
          },*/
        },
      },
    },
  });
  