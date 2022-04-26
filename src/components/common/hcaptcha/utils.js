/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */

const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

const _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

function generateQuery(params) {
  return Object.entries(params).filter((_ref) => {
    const _ref2 = (0, _slicedToArray2.default)(_ref, 2);
    const key = _ref2[0];
    const value = _ref2[1];

    return value || value === false;
  }).map((_ref3) => {
    const _ref4 = (0, _slicedToArray2.default)(_ref3, 2);
    const key = _ref4[0];
    const value = _ref4[1];

    return ''.concat(encodeURIComponent(key), '=').concat(encodeURIComponent(value));
  }).join('&');
}

module.exports = {
  generateQuery
};
