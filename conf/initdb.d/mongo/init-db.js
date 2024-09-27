db = db.getSiblingDB("fastapi");
db.createCollection("user");
db.createCollection("message");
db.createCollection("conversation");
db.createCollection("folder");
db.createCollection("datasets");
db.createCollection("data_area");
db.createCollection("counters");
db.createCollection("flags");
