import axios from "axios";
import { useEffect } from "react";
import { useImmer } from "use-immer";

export function useFetch(url) {
  const [data, setData] = useImmer({
    data: null,
    isLoading: true,
    error: false,
    errorMessage: null,
  });
  useEffect(() => {
    axios
      .get(`${url}`)
      .then((response) => {
        setData((draft) => {
          draft.data = response.data;
          draft.error = false;
        });
      })
      .catch((err) => {
        setData((draft) => {
          draft.error = true;
          draft.errorMessage = err;
        });
      });
  }, []);

  return {
    data,
    setData,
  };
}
