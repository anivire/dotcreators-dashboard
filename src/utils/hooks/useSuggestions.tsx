import useSWR, { mutate } from 'swr';
import { ArtistSuggestionProfile } from '../models/ArtistSuggestionProfile';
import { getCookie } from 'cookies-next';

export const useSuggestions = (searchString: string) => {
  const { data, error } = useSWR<{
    status: string;
    response: {
      data: ArtistSuggestionProfile[];
      has_next: boolean;
    };
  }>(
    `${process.env.API_URL}suggestions?${searchString}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, {
        ...init,
        credentials: 'include',
      });
      return res.json();
    },
    {}
  );

  const updateStatus = async (
    requestId: string,
    status: 'approved' | 'declined',
    country: string,
    tags: string[]
  ) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}suggestions/${requestId}?requestStatus=${status}&country=${country}&tags=${tags}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          
        }
      );

      if (response.ok) {
        mutate(`${process.env.API_URL}suggestions?${searchString}`);
      } else {
        console.error(
          `Failed to update suggestion. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  return {
    suggestions: data,
    isLoading: !error && !data,
    isError: error,
    updateStatus,
  };
};
