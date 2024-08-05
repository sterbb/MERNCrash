
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// empty if we are using a proxy
const baseQuery = fetchBaseQuery({ baseUrl: ''});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder)=>({

    }),
})
