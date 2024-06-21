import { useState, useEffect, useCallback } from "react";
import DataDisplay from "./MainContainerComponents/DataDisplay";
import { AsExpression } from "typescript";
import axios from "axios";

export default function MainContainer() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [skip, setSkip] = useState<number>(0);

    const fetchData = useCallback(async () => {
        // if (isInitialMount.current) {
        //     isInitialMount.current = false;
        //     return; // Skip the first run when search parameters are empty
        //   }

        // setLoading(true);
        try {
            const response = await axios.get(`https://api.fda.gov/drug/label.json?search=active_ingredient:"aspirin"&limit=50&skip=${skip}`);
            setData(response.data);
            console.log(response)
        } catch (error) {
            setError('Error fetching data. Please try again later.');
            console.error('Error fetching data:', error);
        } finally {
            // setLoading(false);
        }
    }, [skip])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <DataDisplay
                data={data}
                skip={skip}
                setSkip={setSkip}
            />
        </div> 
    )
}