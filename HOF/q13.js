function countAndSortCategories(categories) {
  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  return {
    counts: categoryCount,
    sorted: sortedCategories
  };
}

const input = ["electronics", "clothing", "electronics", "toys", "clothing", "toys", "toys"];

const result = countAndSortCategories(input);
console.log(result.counts); 
console.log(result.sorted);
