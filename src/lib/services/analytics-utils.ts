import type { DogDestination } from "$lib/types/dog-destination-types";

// Counts how many dog destinations exist in each category.
function countDestinationsByCategory(dogDestinations: DogDestination[]) {
  const categoryCounts: Record<string, number> = {};

  dogDestinations.forEach((destination) => {
    const categoryName = destination.category.name;

    if (categoryCounts[categoryName]) {
      categoryCounts[categoryName] = categoryCounts[categoryName] + 1;
    } else {
      categoryCounts[categoryName] = 1;
    }
  });

  return categoryCounts;
}

// Builds bar chart data showing destination count by category.
export function buildDestinationsByCategoryBarChart(dogDestinations: DogDestination[]) {
  const categoryCounts = countDestinationsByCategory(dogDestinations);

  return {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        name: "Destinations",
        values: Object.values(categoryCounts)
      }
    ]
  };
}

// Builds pie chart data showing destination category distribution.
export function buildDestinationsByCategoryPieChart(dogDestinations: DogDestination[]) {
  const categoryCounts = countDestinationsByCategory(dogDestinations);

  return {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        values: Object.values(categoryCounts)
      }
    ]
  };
}