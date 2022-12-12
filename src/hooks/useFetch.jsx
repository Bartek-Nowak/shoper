import axios from "axios";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { DB_URL } from "../const";

export function useFetch(url) {
  const [data, setData] = useImmer({
    data: null,
    isLoading: true,
    error: false,
    errorMessage: null,
  });
  useEffect(() => {
    axios
      .get(`${DB_URL}${url}`)
      .then((response) => {
        setData((draft) => {
          draft.data = response.data;
          draft.isLoading = false;
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
