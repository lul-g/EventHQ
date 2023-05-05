/*

{ _id: ObjectId, title: String, description: String, start_date: Date, end_date: Date, location: String, category: String, organizers: [ObjectId], attendees: [ObjectId], is_private: Boolean, created_at: Date, updated_at: Date }



Org Collection:

{ _id: ObjectId, name: String, description: String, logo: String, events: [ObjectId], members: [ObjectId], created_at: Date, updated_at: Date }



Users Collection:

{ _id: ObjectId, name: String, email: String, password: String, events_attending: [ObjectId], events_organizing: [ObjectId], organizations: [ObjectId], created_at: Date, updated_at: Date }
*/
