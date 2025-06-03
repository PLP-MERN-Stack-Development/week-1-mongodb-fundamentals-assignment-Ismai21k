// MongoDB Queries for Task 2

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } })

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 13.99 } })

// 5. Delete a book by its title
db.books.deleteOne({ title: "The Catcher in the Rye" })

// Advanced Queries

// 1. Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 2. Projection: return only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// 3. Sort by price ascending
db.books.find().sort({ price: 1 })

// 4. Sort by price descending
db.books.find().sort({ price: -1 })

// 5. Pagination: page 1 (5 books)
db.books.find().limit(5)

// 6. Pagination: page 2
db.books.find().skip(5).limit(5)

// Aggregation Queries

// 1. Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 2. Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// 3. Group books by decade
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $multiply: ["$_id", 10] },
      count: 1,
      _id: 0
    }
  }
])

//  Indexing for Performance

// 1. Create index on title
db.books.createIndex({ title: 1 })

// 2. Create compound index
db.books.createIndex({ author: 1, published_year: -1 })

// 3. Use explain to analyze
db.books.find({ title: "1984" }).explain("executionStats")


