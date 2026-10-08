const dbase = db.getSiblingDB("labdb");

dbase.users.drop();

dbase.users.insertMany([
  { name: "Ayush",    age: 21, city: "Bokaro" },
  { name: "Abhijeet", age: 20, city: "Dhanbad" },
  { name: "Nikhil",   age: 22, city: "Roorkee" },
  { name: "Vardaan",  age: 21, city: "Noida" },
  { name: "Harshit",  age: 20, city: "Bangalore" },
  { name: "Mahesh",   age: 22, city: "Kolkata" },
  { name: "Sahitya",  age: 21, city: "Bhenwar" },
  { name: "Somyansh", age: 22, city: "Noida" },
  { name: "Abhinav",  age: 20, city: "Bokaro" },
  { name: "Abhishek", age: 21, city: "Dhanbad" }
]);

print("\nTotal users inserted: " + dbase.users.countDocuments());

print("\n--- 1. Average age per city (highest first) ---");
dbase.users.aggregate([
  { $group: { _id: "$city", avgAge: { $avg: "$age" }, totalUsers: { $sum: 1 } } },
  { $sort: { avgAge: -1, _id: 1 } }
]).forEach(printjson);

print("\n--- 2. Average age per city (users aged 21 and above) ---");
dbase.users.aggregate([
  { $match: { age: { $gte: 21 } } },
  { $group: { _id: "$city", avgAge: { $avg: "$age" }, totalUsers: { $sum: 1 } } },
  { $sort: { avgAge: -1, _id: 1 } }
]).forEach(printjson);

print("\n--- 3. Users older than 21 ---");
dbase.users.aggregate([
  { $match: { age: { $gt: 21 } } },
  { $sort: { age: -1, name: 1 } },
  { $project: { _id: 0, name: 1, city: 1, age: 1 } }
]).forEach(printjson);