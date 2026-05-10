import type { DogDestination } from "$lib/types/dog-destination-types";

// Builds chart data showing how many dog destinations exist in each category.
export function buildDestinationsByCategoryChart(dogDestinations: DogDestination[]) {
  const categoryCounts: Record<string, number> = {};

  dogDestinations.forEach((destination) => {
    const categoryName = destination.category.name;

    if (categoryCounts[categoryName]) {
      categoryCounts[categoryName] = categoryCounts[categoryName] + 1;
    } else {
      categoryCounts[categoryName] = 1;
    }
  });

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