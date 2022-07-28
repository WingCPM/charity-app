import useSWR from "swr";

const fetcher = (...args) => {
  const something: any = [...args];
  return fetch(something).then((res) => res.json());
};

export const useSWRFetcher = ({ url }: { url: string }) => {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    error,
  };
};
