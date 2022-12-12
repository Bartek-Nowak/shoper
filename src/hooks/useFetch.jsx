import axios from "axios";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { DB_URL, LOAD_LIMIT } from "../const";

export function useFetch(url) {
  const [data, setData] = useImmer({
    data: null,
    url: url,
    dataLimit: LOAD_LIMIT,
    dataEnd: false,
    isLoading: true,
    error: false,
    errorMessage: null,
  });

  function checkDataEnd(prevData, nextData) {
    if (prevData === null) return false;
    if (prevData.length === nextData.length) return true;
  }

  useEffect(() => {
    setData((draft) => {
      draft.dataEnd = false;
    });
    axios
      .get(`${DB_URL}${data.url}?_limit=${data.dataLimit}`)
      .then((response) => {
        console.log(response);
        setData((draft) => {
          draft.dataEnd = checkDataEnd(draft.data, response.data);
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
  }, [data.dataLimit, data.url]);
  return {
    data,
    setData,
  };
}
