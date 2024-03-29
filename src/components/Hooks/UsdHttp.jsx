import { useCallback } from "react";

const useHttp = () => {
  const fetchRequest = useCallback(async (req = {}) => {
    console.log('i am ch',req.url)
    try {
      const endPoint = req.endPoint ? `/${req.endPoint}` : "";
      const url = req.url
       || 
        `https://mailbox-d7010-default-rtdb.firebaseio.com/mail-box/${endPoint}.json`;

      console.log(url,"useHttp",req.method,JSON.stringify(req.body));
      const response = await fetch(url,{
        method: req.method || 'GET',
        body: req.body ? JSON.stringify(req.body) : null,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        if(errData.error.message) {
          throw new Error(errData.error.message);
        }
        throw new Error(errData.error);
      }

      const data = await response.json();
      // console.log(data,endPoint,"useHttp",req.method);
      return data;

    } catch (error) {
      throw new Error(error);
    }
  }, []); 

  return fetchRequest;
};

export default useHttp;