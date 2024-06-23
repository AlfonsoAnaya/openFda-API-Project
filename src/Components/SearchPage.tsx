import { useState, useEffect, useCallback } from "react";
import axios from "axios";

//Stores
import useDataStore from "../Zustand/DataStore";
import useSkipStore from "../Zustand/SkipStores";
import useSearchQueryStore from "../Zustand/SearchQueryStore";

//Components
import DataDisplay from "./MainContainerComponents/DataDisplay";
import SearchBox from "./MainContainerComponents/SearchBox";


export default function SearchPage() {

    //fetching data process state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchListener, setSearchListener] = useState<number>(0);

    //data state from store
    const data = useDataStore((state) => state.data);
    const updateData = useDataStore((state) => state.updateData);
    const skip = useSkipStore((state) => state.skip);
    const updateSkip = useSkipStore((state) => state.updateSkip);
    const searchQuery = useSearchQueryStore((state) =>state.searchQuery);
    const updateSearchQuery = useSearchQueryStore((state) => state.updateSearchQuery)

    //query state

    const fetchData = useCallback(async () => {
        // if (isInitialMount.current) {
        //     isInitialMount.current = false;
        //     return; // Skip the first run when search parameters are empty
        //   }

        setLoading(true);
        try {
            const response = await axios.get(`https://api.fda.gov/drug/label.json?search=active_ingredient:"${searchQuery}"&limit=50&skip=${skip}`);
            updateData(response.data);
        } catch (error) {
            setError('Error fetching data. Please try again later.');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [skip, searchListener])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="flex-col">
            <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={updateSearchQuery}
                setSearchListener={setSearchListener}
            />
            {loading ?
                <p>Data loading</p>
                : <DataDisplay
                    skip={skip}
                />}

        </div>
    )
}