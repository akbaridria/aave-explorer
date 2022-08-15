import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";

export async function getAll(queryProps: string) {
    const flipside = new Flipside(
        (process.env.REACT_APP_API_KEY_FS as string),
        "https://node-api.flipsidecrypto.com"
    );
    const query: Query = {
        sql: queryProps,
        ttlMinutes: 10,
    };

    const result: QueryResultSet = await flipside.query.run(query);
    if (result.error) {
        console.log(result.error)
    }
    return result.error ? [[]] : result?.rows || []
}