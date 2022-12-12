import axios from "axios";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { DB_URL, LOAD_LIMIT } from "../const";

export function useFetch(url) {
  const [data, setData] = useImmer({
    data: null,
    slug: "?",
    dataLimit: LOAD_LIMIT,
    dataEnd: false,
    isLoading: true,
    errorMessage: null,
  });

  function checkDataEnd(prevData, nextData) {
    if (prevData === null) return false;
    console.log(prevData);
    console.log(nextData);
    if (JSON.stringify(prevData) === JSON.stringify(nextData)) return true;
  }

  useEffect(() => {
    setData((draft) => {
      draft.dataEnd = false;
    });
    axios
      .get(`${DB_URL}${url}${data.slug}_limit=${data.dataLimit}`)
      .then((response) => {
        setData((draft) => {
          draft.dataEnd = checkDataEnd(data.data, response.data);
          draft.data = response.data;
          draft.isLoading = false;
          draft.error = false;
        });
      })
      .catch((err) => {
        setData((draft) => {
          draft.errorMessage = err.message;
        });
      });
  }, [data.dataLimit, data.slug]);
  return {
    data,
    setData,
  };
}
