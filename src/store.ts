import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { TFormValues } from './components/MortgageForm/initialValues';

export const formApi = createApi({
    reducerPath: 'navTreeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://exampleURL.com/api',
    }),
    endpoints: build => ({
        postForm: build.mutation<null, TFormValues>({
            query: formValues => ({
                method: 'POST',
                url: '/postForm',
                body: formValues,
            }),
        }),
    }),
});

export const { usePostFormMutation } = formApi;

export const store = configureStore({
    reducer: {
        [formApi.reducerPath]: formApi.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(formApi.middleware);
    },
});
