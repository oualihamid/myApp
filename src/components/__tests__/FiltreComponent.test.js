import React from 'react';
import renderer from 'react-test-renderer';
import FiltreComponent from '../FiltreComponent';

let stations=[
  {
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
  },
  {
    "number": 195,
    "contract_name": "toulouse",
    "name": "00195 - LARROUSSE - RIEUX",
    "address": "FACE 15 RUE PIERRE LAROUSSE",
    "position": {
      "lat": 43.5972354030358,
      "lng": 1.45907112459247
    },
    "banking": true,
    "bonus": false,
    "bike_stands": 18,
    "available_bike_stands": 16,
    "available_bikes": 2,
    "status": "OPEN",
    "last_update": 1653222777000
  }
];

it('renders correctly', () => {
  const tree = renderer.create(<FiltreComponent data={stations} />).toJSON();
  expect(tree).toMatchSnapshot();
});
