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
    error: false,
    errorMessage: null,
  });

  function checkDataEnd(prevData, nextData) {
    console.log(prevData);
    console.log(nextData);
    if (prevData === null) return false;
    if (prevData.length >= nextData.length) return true;
    return false;
  }

  useEffect(() => {
    setData((draft) => {
      draft.dataEnd = false;
    });
    axios
      .get(`${DB_URL}${url}${data.slug}_limit=${data.dataLimit}`)
      .then((response) => {
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
  }, [data.dataLimit, data.slug]);

  console.log(`${url}${data.slug}_limit=${data.dataLimit}`);
  return {
    data,
    setData,
  };
}
