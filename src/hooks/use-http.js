import { useState, useCallback } from "react";

const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (reqConfig) => {
      setIsLoading(true);
      setError(null);

      const { url, method, headers, body } = reqConfig;

      try {
        const response = await fetch(url, {
          method: method ? method : "GET",
          headers: headers ? headers : {},
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        applyData(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [applyData]
  );
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
