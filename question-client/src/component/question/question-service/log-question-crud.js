import { useState, useEffect } from 'react';

function useFetchRequest(f = 'https://www.google.com/') {
    const [requestF, setRequestF] = useState(0);
    // const [clearRequestF, setclearRequestF] = useState(0);

    const clear = () => {
        setRequestF(null)
    }

    useEffect(() => {

        (async function anyNameFunction() {
            const response = await fetch(f);
            let c = await (response).json()
             setRequestF(c)
            // this.setCountries(response.json());
        })();


    }, []);

    return { requestF, clear };
}
export default useFetchRequest;