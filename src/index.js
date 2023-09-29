const buildFilter = (filters) => (data, filterValues) => filters
	.reduce((acc, filter) =>
		acc.filter((item) => filter(item, filterValues)), data);

export { buildFilter };
