const MongoClient = require("mongodb").MongoClient;
const dboper = require("./operations");

const url = "mongodb://localhost:27017";
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true })
	.then((client) => {
		console.log("Connected correctly to server");

		const db = client.db(dbname);
		// This will delete all the collections. This is not normally done when first connecting. This is done here only for test purpose to erase previuse test
		db.dropCollection("campsites")
			.then((result) => {
				console.log("Dropped the Collection", result);
			})
			.catch((err) => console.log("No collection to drop"));

		// This is creating a new collection

		dboper
			.insertDocument(
				db,
				{
					name: "Breadcrumb Trail Campground",
					description: "Test",
				},
				"campsites"
			)
			.then((result) => {
				console.log("Insert Document", result.ops);

				return dboper.findDocuments(db, "campsites");
			})
			.then((docs) => {
				console.log("Found Documents", docs);

				return dboper.updateDocument(
					db,
					{ name: "Breadcrumb Trail Campground" },
					{ description: "Updated Test Description" },
					"campsites"
				);
			})
			.then((result) => {
				console.log("Updated Document Count:", result.result.nModified);

				return dboper.findDocuments(db, "campsites");
			})
			.then((docs) => {
				console.log("Found Documents:", docs);

				return dboper.removeDocument(
					db,
					{ name: "Breadcrumb Trail Campground" },
					"campsites"
				);
			})
			.then((result) => {
				console.log("Deleted Document Count:", result.deletedCount);

				return client.close();
			})
			.catch((err) => {
				console.log(err);
				client.close();
			});
	})
	.catch((err) => console.log(err));
