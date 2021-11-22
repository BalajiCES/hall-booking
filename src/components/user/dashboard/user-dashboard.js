import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import user from './data/user-dashboard-actions';
import {
  AuthHeader,
  AuthID,
  getAlertToast,
  getConfirm
} from '../../../util/helper-functions';
import HallCard from '../../common/cards/card';
import { Input, Select } from '../../common/Fields/fields';
import './user-dashbaord.scss';
import BookModal from '../bookings/booking-page/book-modal';
import CustomLoader from '../../../util/common';
import errors from '../../../const/error';
import constant from '../../../const/const';

// Destructuring
const { USER_DASHBOARD_REQUEST, USER_BOOKING_REQUEST } = user;
const { SUCCESS, USER } = constant;
const { sucessBooked, errorBooked, confirmBook } = errors;

// DashBorad Component
function UserDashBaord() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hallState, setHallState] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const [filterObj, setFilterObj] = useState({});

  const dispatch = useDispatch();

  const { data: hallData = {}, loading = false } = useSelector(
    (state) => state.hallListingReducer.listHalls
  );

  const { data = {} } = hallData;
  const { halls = [] } = data;
  const [hallFilterData, setHallFilterData] = useState(halls);

  // Side Menu Functions
  const closeBooking = () => {
    setModalOpen(!modalOpen);
  };

  const openSideMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeSideMenu = () => {
    setOpenMenu(false);
    dispatch({
      type: USER_DASHBOARD_REQUEST,
      payload: '/'
    });
  };

  const reloadHalls = () => {
    Swal.fire(getAlertToast(SUCCESS, sucessBooked));
    dispatch({
      type: USER_DASHBOARD_REQUEST
    });
  };

  // OnClicking Book Now
  const intiateBooking = (datas) => {
    setModalOpen(!modalOpen);
    setHallState(datas);
  };

  const bookingSuccess = (startDate, endDate) => {
    if (!startDate) {
      Swal.fire(getAlertToast(SUCCESS, errorBooked));
      return;
    }
    Swal.fire(getConfirm(SUCCESS, confirmBook)).then((result) => {
      if (result.value) {
        dispatch({
          type: USER_BOOKING_REQUEST,
          payload: {
            userId: AuthID(),
            hallId: hallState.id,
            startDate,
            endDate
          },
          auth: AuthHeader(),
          closeBooking,
          reloadHalls
        });
      }
    });
  };

  // Filter Field Options
  const priceOptions = [
    { key: 'Sort by: Price', value: 'default' },
    { key: 'Low To High', value: 'lowToHigh' },
    { key: 'High To Low', value: 'highToLow' }
  ];

  const eventOptions = [
    { key: 'filter by: Event', value: 'default' },
    { key: 'Marriage', value: 'Marriage' },
    { key: 'Birthday', value: 'Birthday' },
    { key: 'Custom', value: 'Custom' }
  ];

  const typeOptions = [
    { key: 'Type by: Hall', value: 'default' },
    { key: 'A/c', value: 'ac' },
    { key: 'Non-A/c', value: 'nonAc' }
  ];

  const strengthOptions = [
    { key: 'Size by: Hall', value: 'default' },
    {
      key: 'Below 1000',
      value: JSON.stringify({ key: '$lt', value: 1000 })
    },
    { key: 'Above 1000', value: JSON.stringify({ key: '$gt', value: 1000 }) },
    { key: 'Above 2000', value: JSON.stringify({ key: '$gt', value: 2000 }) }
  ];

  // Filter Fields Functions
  const filterEvent = (event) => {
    const { value } = event.target;
    setFilterObj({ ...filterObj, event: value });
  };

  const filterPrice = (event) => {
    const { value } = event.target;
    setFilterObj({ ...filterObj, sort: value });
  };

  const filterType = (event) => {
    const { value } = event.target;
    setFilterObj({ ...filterObj, type: value });
  };

  const filterStrength = (event) => {
    const { value } = event.target;
    setFilterObj({ ...filterObj, capacity: value });
  };

  // Search by Hall Name
  const searchQueryName = (event) => {
    const { value } = event.target;
    if (value === '') {
      setHallFilterData(halls);
    } else {
      const searchTerm = value.toLowerCase();
      const filterData = halls.filter((hallObj) =>
        hallObj.hallName.toLowerCase().match(new RegExp(searchTerm, 'g'))
      );
      setHallFilterData(filterData);
    }
  };

  const searchHallAddress = (event) => {
    const { value } = event.target;
    if (value === '') {
      setHallFilterData(halls);
    } else {
      const searchTerm = value.toLowerCase();
      const filterData = halls.filter((hallObj) =>
        hallObj.address?.toLowerCase().match(new RegExp(searchTerm, 'g'))
      );
      setHallFilterData(filterData);
    }
  };

  // Onclick Apply Filter
  const applyFilters = () => {
    dispatch({
      type: USER_DASHBOARD_REQUEST,
      payload: filterObj
    });
  };

  useEffect(() => {
    dispatch({
      type: USER_DASHBOARD_REQUEST
    });
  }, []);

  useEffect(() => {
    if (halls) {
      setHallFilterData(halls);
    }
  }, [hallData]);

  return (
    <div className="main-content">
      <div className="navbar">
        <span className="open-slide">
          <button onClick={openSideMenu} type="button">
            <FontAwesomeIcon icon={faFilter} className="mr-2 icon fa-2x" />
            <span className="filter-text">Apply Filters</span>
          </button>
        </span>
      </div>
      <div className="sidebar-content">
        <div
          id={`${openMenu ? 'side-menu' : 'close-sidemenu'}`}
          className="side-nav"
        >
          <button
            type="button"
            className="btn-close external"
            onClick={closeSideMenu}
          >
            &times;
          </button>
          <Formik>
            {() => (
              <div className="filter">
                <div className="cd-filter-block">
                  <h4>Search Hall</h4>
                  <div className="cd-filter-content">
                    <Input
                      name="hallName"
                      id="hallName"
                      onChange={searchQueryName}
                      className="filter-input"
                    />
                  </div>

                  <div className="cd-filter-content">
                    <h4>Search Address</h4>
                    <Input
                      name="address"
                      id="address"
                      onChange={searchHallAddress}
                      className="filter-input"
                    />
                  </div>
                  <div className="cd-filter-block">
                    <h4>Filter Price</h4>
                    <div className="cd-filter-content">
                      <Select
                        className="filter-select"
                        name="price"
                        onChange={filterPrice}
                        options={priceOptions}
                      />
                    </div>
                  </div>
                  <div className="cd-filter-block">
                    <h4>Filter Events</h4>
                    <div className="cd-filter-content">
                      <Select
                        className="filter-select"
                        name="event"
                        onChange={filterEvent}
                        options={eventOptions}
                      />
                    </div>
                  </div>
                  <div className="cd-filter-block">
                    <h4>Filter Type</h4>
                    <div className="cd-filter-content">
                      <Select
                        className="filter-select"
                        name="type"
                        onChange={filterType}
                        options={typeOptions}
                      />
                    </div>
                  </div>
                  <div className="cd-filter-block">
                    <h4>Filter Capacity</h4>
                    <div className="cd-filter-content">
                      <Select
                        className="filter-select"
                        name="capacity"
                        onChange={filterStrength}
                        options={strengthOptions}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="primary"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>

      <div className={`${openMenu ? 'main' : 'close-main'}`}>
        <center>{loading && <CustomLoader loading={loading} />}</center>
        {!loading &&
          hallFilterData &&
          hallFilterData.map((list) => {
            const { _id, hallName, capacity, price, status, type, address } =
              list;
            return (
              <HallCard
                key={_id}
                id={_id}
                hallName={hallName}
                capacity={capacity}
                price={price}
                address={address}
                status={status}
                intiateBooking={intiateBooking}
                type={type}
                user={USER}
              />
            );
          })}
      </div>
      {modalOpen && (
        <BookModal
          show={modalOpen}
          closeBooking={closeBooking}
          hallState={hallState}
          bookingSuccess={bookingSuccess}
        />
      )}
    </div>
  );
}

export default UserDashBaord;
