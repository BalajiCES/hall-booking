import constant from '../constant/constant';

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filterByStrength() {
    if (this.queryString.capacity) {
      if (this.queryString.capacity === constant.default) {
        this.query = this.query.find({});
      } else {
        const queryStr = JSON.parse(this.queryString.capacity);
        const { key } = queryStr;
        let { value } = queryStr;
        value = parseInt(value, 10);
        if (key === '$lt') {
          this.query = this.query.find({ capacity: { $lt: value } });
        } else if (key === '$gt') {
          this.query = this.query.find({ capacity: { $gt: value } });
        }
      }
    }
    return this;
  }

  filterByEvent() {
    if (this.queryString.event) {
      if (this.queryString.event === constant.default) {
        this.query = this.query.find({});
      } else {
        this.query = this.query.find({ event: this.queryString.event });
      }
    }
    return this;
  }

  filterByPrice() {
    if (this.queryString.sort) {
      if (this.queryString.sort === 'highToLow') {
        this.query = this.query.sort('-price');
      } else if (this.queryString.sort === 'lowToHigh') {
        this.query = this.query.sort('price');
      } else {
        this.query = this.query.sort('-createdAt');
      }
    }
    return this;
  }

  filterByType() {
    if (this.queryString.type) {
      if (this.queryString.type === constant.default) {
        this.query = this.query.find({});
      } else {
        this.query = this.query.find({ type: this.queryString.type });
      }
    }
    return this;
  }
}

export default APIFeatures;
