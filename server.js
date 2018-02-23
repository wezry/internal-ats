var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

const APPLICANT_COLLECTION = "applicants";
const QUESTION_COLLECTION = "questions";
const RESPONSE_COLLECTION = "responses";

const APPLICANT_STATUSES = ["In Queue", "Phone Screen", "On Site", "Approval"];
const QUESTION_TAGS = ["Technical", "Behavioral"];

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/atiLocalDb', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// APPLICANT API ROUTES BELOW

/*  "/api/applicants"
 *    GET: finds all applicants
 *    POST: creates a new applicant
 */

app.get("/api/applicants", function(req, res) {
  db.collection(APPLICANT_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get applicants");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/applicants", function(req, res) {
  var newApplicant = req.body;
  // Defaults
  newApplicant.status = newApplicant.status || APPLICANT_STATUSES[0];

  // Validations
  if (!newApplicant.name) {
    handleError(res, "Invalid input", "Must provide a name", 400);
  }
  if (!newApplicant.email || !newApplicant.address) {
    handleError(res, "Invalid input", "Must provide a name differentiator (email or address)", 400);
  }

  var date = new Date();
  newApplicant.dateCreated = date;
  newApplicant.dateUpdated = date;

  db.collection(APPLICANT_COLLECTION).insertOne(newApplicant, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new applicant");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/applicants/:id"
 *    GET: find applicant by id
 *    PUT: update applicant by id
 *    DELETE: deletes applicant by id
 */

app.get("/api/applicants/:id", function(req, res) {
  db.collection(APPLICANT_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get applicant");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/applicants/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(APPLICANT_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update applicant");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/applicants/:id", function(req, res) {
  db.collection(APPLICANT_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete applicant");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

// QUESTION API ROUTES BELOW

/*  "/api/questions"
 *    GET: finds all questions
 *    POST: creates a new question
 */

app.get("/api/questions", function(req, res) {
  db.collection(QUESTION_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get questions");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/questions", function(req, res) {
  var newQuestion = req.body;
  // Defaults
  newQuestion.tags = newQuestion.tags || [];

  // Validations
  if (!newQuestion.text) {
    handleError(res, "Invalid input", "Must provide text for the question", 400);
  }
  newQuestion.tags.forEach(function (tag) {
    if (QUESTION_TAGS.indexOf(tag) < 0) {
      handleError(res, "Invalid input", "Only tags allowed are: " + QUESTION_TAGS.toString(), 400);
    }
  });

  var date = new Date();
  newQuestion.dateCreated = date;
  newQuestion.dateUpdated = date;

  db.collection(QUESTION_COLLECTION).insertOne(newQuestion, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new question");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/questions/:id"
 *    GET: find question by id
 *    PUT: update question by id
 *    DELETE: deletes question by id
 */

app.get("/api/questions/:id", function(req, res) {
  db.collection(QUESTION_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get question");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/questions/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(QUESTION_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update question");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/questions/:id", function(req, res) {
  db.collection(QUESTION_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete question");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

// RESPONSE API ROUTES BELOW

/*  "/api/responses"
 *    GET: finds all responses
 *    POST: creates a new response
 */

app.get("/api/responses", function(req, res) {
  db.collection(RESPONSE_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get responses");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/responses", function(req, res) {
  var newResponse = req.body;

  // Validations
  if (!newResponse.text) {
    handleError(res, "Invalid input", "Must provide text for the response", 400);
  }

  var date = new Date();
  newResponse.dateCreated = date;
  newResponse.dateUpdated = date;

  db.collection(RESPONSE_COLLECTION).insertOne(newResponse, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new response");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/responses/:id"
 *    GET: find response by id
 *    PUT: update response by id
 *    DELETE: deletes response by id
 */

app.get("/api/responses/:id", function(req, res) {
  db.collection(RESPONSE_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get response");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/responses/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(RESPONSE_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update response");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/responses/:id", function(req, res) {
  db.collection(RESPONSE_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete response");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
