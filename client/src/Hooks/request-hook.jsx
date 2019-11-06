// React
import { useEffect, useRef, useState } from 'react';

// Utilities
import axios from 'axios';

export const useRequest = (initialURL, methodType) => {
    const [queryData, setQueryData] = useState();
    const [responseData, setResponseData] = useState(null);
    const [url, setUrl] = useState(initialURL);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const firstUpdate = useRef(true);

    useEffect(() => {
        if(firstUpdate.current)
        {
            firstUpdate.current = false;
            return;
        }

        const request = async () => {
            // If the request is still sending don't send another request
            if(isLoading)
                return;

            setIsLoading(true);
            setIsError(false);

            try 
            {
                let response;
                
                if(methodType === 'GET')
                {
                    response = await axios.get(url, queryData);
                }
                else if(methodType === 'POST')
                {
                    response = await axios.post(url, queryData);
                }
                else if(methodType === 'PUT') // TODO
                {}
                else if(methodType === 'DELETE') // TODO
                {}

                setResponseData(response.data);
            }
            catch(err) 
            { 
              setIsError(err);
            }

            // TODO: Only allow another request to go through if the component is still mounted
            setIsLoading(false);
        };

        request();

        // We ignore the warning here as we only want to run useEffect once on component mount
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [queryData]);

    return [{ responseData, isLoading, isError }, setQueryData];
};