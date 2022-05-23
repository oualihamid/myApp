import React from 'react';
import renderer from 'react-test-renderer';
import DetailComponent from '../DetailComponent';

let station={
  "number": 55,
  "contract_name": "toulouse",
  "name": "00055 - SAINT-SERNIN - G. ARNOULT",
  "address": "2 RUE GATIEN ARNOULT",
  "position": {
    "lat": 43.6089519604964,
    "lng": 1.4410035987262
  },
  "banking": true,
  "bonus": false,
  "bike_stands": 15,
  "available_bike_stands": 15,
  "available_bikes": 0,
  "status": "OPEN",
  "last_update": 1653222594000
}

it('renders correctly', () => {
  const tree = renderer.create(<DetailComponent station={station} />).toJSON();
  expect(tree).toMatchSnapshot();
});


describe('<CardComponent />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<DetailComponent station={station}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});