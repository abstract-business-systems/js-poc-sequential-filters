import { map } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';

/* Tested */
import { buildFilter } from '.';

const templates = {
	sample: { a: 0, b: 1 },
};

const seeds = {
	sample: {
		a: [1, 11],
		b: [4, 6],
	},
};

const buildData = (length = 10, templateID = 'sample') => {
	const template = templates[templateID];
	const seed = seeds[templateID];

	return Array.from({ length }, () => map(template, (dummy, key) =>
		rndBetween(...seed[key])));
};

describe('filterPrioritized', () => {
	const filters = [
		(data, filterVal) => {
			const { a } = data;
			const { aVal } = filterVal;

			return !(a % aVal);
		},
		(data, filterVal) => {
			const { b } = data;
			const { bVal } = filterVal;

			return !(b % bVal);
		},
	];

	test('Initial test.', () => {
		const data = buildData();
		const filter = buildFilter(filters);
		const filterValues = { aVal: 2, bVal: 3 };

		const result = filter(data, filterValues);

		expect(result
			.filter(({ a }) => a % filterValues.aVal).length).toEqual(0);
		expect(result
			.filter(({ b }) => b % filterValues.bVal).length).toEqual(0);
	});
});
