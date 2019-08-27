// https://codesandbox.io/embed/26mjowzpr
import { useEffect, useState } from 'react';

export default function useMedia(queries, values, defaultValue) {
    const match = () => values[queries.findIndex(q => matchMedia(q).matches)] || defaultValue;
    const [columns, setColumns] = useState(match);
    useEffect(() => {
        const handler = () => setColumns(match);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener(handler);
    }, []);
    return columns;
}
