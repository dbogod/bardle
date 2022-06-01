import { getAverage } from './StatsModal';

test('The expected average score is generated', () => {
  expect(getAverage(45/45)).toEqual(1);
  expect(getAverage(45/10)).toEqual(4.5);
  expect(getAverage(45/20)).toEqual(2.25);
  expect(getAverage(45/21)).toEqual(2.14);
});