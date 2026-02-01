import { api } from "../../services/api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // 🔹 GET PRODUCTS
    getProducts: builder.query({
      query: () => "/products",
    }),

    // 🔹 ADD PRODUCT
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),

    // 🔹 STOCK IN
    stockIn: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/stock/in",
        method: "POST",
        body: { productId, quantity },
      }),
    }),

    // 🔹 STOCK OUT
    stockOut: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/stock/out",
        method: "POST",
        body: { productId, quantity },
      }),
    }),

  }),
});

// 🔥 VERY IMPORTANT EXPORTS
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useStockInMutation,
  useStockOutMutation,
} = productsApi;
