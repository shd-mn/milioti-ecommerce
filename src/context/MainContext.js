import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const MainContext = createContext();

const MainProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [news, setNews] = useState([]);
    const [currency, setCurrency] = useState('USD');

    useEffect(() => {
        axios
            .get('http://localhost:3010/products')
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        axios
            .get('http://localhost:3010/news')
            .then((res) => setNews(res.data))
            .catch((err) => console.log(err));
    }, []);

    const trendingProducts = products.slice(0, products.length);
    const data = {
        products,
        setProducts,
        news,
        setNews,
        currency,
        setCurrency,
        trendingProducts,
    };

    return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
};

export const useMyContext = () => useContext(MainContext);

export default MainProvider;
