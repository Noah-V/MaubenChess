/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';
import {Square as Position} from 'chess.js';
import {Vector} from 'react-native-redash';

const {width} = Dimensions.get('window');
export const SIZE = width / 8;

export const toTranslation = (to: Position) => {
  'worklet';
  const tokens = to.split('');
  const col = tokens[0];
  const row = tokens[1];
  if (!col || !row) {
    throw new Error('Invalid Notation : ' + to);
  }

  const indexes = {
    x: col.charCodeAt(0) - 'a'.charCodeAt(0),
    y: parseInt(row, 10) - 1,
  };

  return {
    x: indexes.x * SIZE,
    y: 7 * SIZE - indexes.y * SIZE,
  };
};

const toPosition = (toProps: Vector) => {
  'worklet';
  const col = String.fromCharCode(97 + Math.round(toProps.x / SIZE));
  const row = `${8 - Math.round(toProps.y / SIZE)}`;
  return `${col}${row}` as Position;
};

export default toPosition;
