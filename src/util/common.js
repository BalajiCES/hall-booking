import PropTypes from 'prop-types';
import React from 'react';
import loaderImage from '../assets/loader.gif';

function CustomLoader({ loading }) {
  return (
    <>
      {loading && (
        <img
          src={loaderImage}
          style={{ width: '40px', height: '40px' }}
          alt="loader"
        />
      )}
    </>
  );
}

CustomLoader.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default CustomLoader;
