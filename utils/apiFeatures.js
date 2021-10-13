class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    // const excludedFields = ['page', 'sort', 'limits', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // 2)Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // find method will return an array of all documents
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFileds() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;

//  // 1)Filtering
//  const queryObj = { ...req.query };

//  // 2)Advanced Filtering
//  console.log(req.query);
//  let queryStr = JSON.stringify(queryObj);
//  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//  console.log(queryStr);

//  let query = Hall.find(JSON.parse(queryStr));

//  // 3) Sorting
//  if (req.query.sort) {
//    const sortBy = req.query.sort.split(',').join(' ');
//    query = query.sort(sortBy);
//  } else {
//    // default sort
//    query = query.sort('-createdAt');
//  }

//  // 4)Projection
//  if (req.query.fields) {
//    const fields = req.query.fields.split(',').join(' ');
//    query = query.select(fields);
//  } else {
//    query = query.select('-__v');
//  }

//  // 5)Pagination
//  const page = req.query.page * 1 || 1;
//  const limit = req.query.limit * 1 || 10;
//  const skip = (page - 1) * limit;

//  // page=3&limit=10 1-10 page 1, 11-20 page 2 , 21-30 page 3
//  query = query.skip(skip).limit(limit);

//  if (req.query.page) {
//    const numHalls = await Hall.countDocuments();
//    if (skip >= numHalls) throw new Error('This page does not exist');
//  }
