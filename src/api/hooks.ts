import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { useEffect, useState } from "react";

const API_URI = import.meta.env.MODE === "development" ? (() => {
    return window.location.origin.startsWith("http://localhost") ? "http://localhost:1323/api/"
        : (() => { throw Error("replace this when dev api exists"); })();
})() : (() => {
    throw Error("replace this when production api exists");
    return "NOT DONE";
})();
export function useRankings() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<CountryRanking[]>();
    const [error, setError] = useState("");
    const fetchData = async () => {
        // exponential backoff with jitter
        axiosRetry(axios, {
            retries: 3,
            retryDelay: (retryCount) => {
                return Math.random() * (Math.min(10000, 1000 * (retryCount ** 2))); // https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
            }
        });
        const uri = new URL("v1/countries/rankings", API_URI);
        try {
            const request = await axios.get(uri.href);
            setData(request.data as CountryRanking[]);
        } catch (error) {
            setError(JSON.stringify((error as AxiosError).response?.data));
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return { data, loading, error };
}
export function useRanking(countryName: string) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<CountryRankingWBlocks>();
    const [error, setError] = useState("");
    const fetchData = async (countryName: string) => {
        axiosRetry(axios, {
            retries: 3,
            retryDelay: (retryCount) => {
                return Math.random() * (Math.min(10000, 1000 * (retryCount ** 2))); // https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
            }
        });
        const uri = new URL(`v1/countries/rankings/${countryName}`, API_URI);
        try {
            const request = await axios.get(uri.href);
            setData(request.data as CountryRankingWBlocks);
        } catch (error) {
            setError(JSON.stringify((error as AxiosError).response?.data))
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData(countryName);
    }, []);
    return { loading, data, error }
}