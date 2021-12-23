const MongoClient = require("mongodb").MongoClient;
const assert = require("assert").strict;

const url = "mongodb://localhost:27017";
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
	assert.strictEqual(err, null);

	console.log("Connected correctly to server");

	const db = client.db(dbname);
	// This will delete all the collections. This is not normally done when first connecting. This is done here only for test purpose to erase previuse test
	db.dropCollection("campsites", (err, result) => {
		assert.strictEqual(err, null);
		console.log("Dropped the Collection", result);

		// This is creating a new collection
		const collection = db.collection("campsites");

		collection.insertOne(
			{
				name: "Breadcrumb Trail Campground",
				description: "Test",
			},
			(err, result) => {
				assert.strictEqual(err, null);
				console.log("Insert Document", result.ops);

				collection.find().toArray((err, docs) => {
					assert.strictEqual(err, null);
					console.log("Found Documents", docs);

					client.close();
				});
			}
		);
	});
});
