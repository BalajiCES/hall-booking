import moment from 'moment';
import Booking from '../models/book-model';

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.search) {
      console.log(this.queryString.search);
      this.query = this.query.find({
        $text: { $search: this.queryString.search }
      });
    }
    return this;
  }

  filterByStrength() {
    if (this.queryString.capacity) {
      if (this.queryString.capacity === 'default') {
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
      if (this.queryString.event === 'default') {
        this.query = this.query.find({});
      } else {
        this.query = this.query.find({ event: this.queryString.event });
      }
    }
    return this;
  }

  filterByPrice() {
    if (this.queryString.sort) {
      if (this.queryString.sort === 'high-to-low') {
        this.query = this.query.sort('-price');
      } else if (this.queryString.sort === 'low-to-high') {
        this.query = this.query.sort('price');
      } else {
        this.query = this.query.sort('-createdAt');
      }
    }
    return this;
  }

  filterByType() {
    if (this.queryString.type) {
      if (this.queryString.type === 'default') {
        this.query = this.query.find({});
      } else {
        this.query = this.query.find({ type: this.queryString.type });
      }
    }
    return this;
  }

  filterByDate() {
    if (this.queryString.date) {
      console.log(
        'Date',
        this.queryString.date,
        new Date(this.queryString.date)
      );
      // this.query = this.query.find({
      //   'bookings.bookedDate': {
      //     $eq: new Date(this.queryString.date)
      //   }
      // });
      // start today
      const start = moment().startOf('day');
      // end today
      const end = moment(this.queryString.date).endOf('day');

      console.log('StartDay', start, 'EndDay', end);
      this.query = this.query.populate('bookings').find({
        bookedDate: {
          $gte: start,
          $lte: end
        }
      });
    }
    return this;
  }
}

export default APIFeatures;
