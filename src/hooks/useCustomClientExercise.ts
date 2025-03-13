import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useClientExercise(id?: string) {
  return useSWR(id ? `/api/custom-exercise/${id}` : null, fetcher, {
    shouldRetryOnError: false, // Don't retry indefinitely
    revalidateOnFocus: false, // Prevent refetching when window regains focus
  });
}
