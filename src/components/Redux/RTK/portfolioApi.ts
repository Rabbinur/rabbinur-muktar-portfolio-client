import { nodeApi } from "../nodeApi";

export const portfolioApi = nodeApi.injectEndpoints({
  endpoints: (builder) => ({
    // Projects Endpoints
    getProjects: builder.query({
      query: (searchQuery = "") => ({
        url: `/projects?search_query=${searchQuery}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    getProjectBySlug: builder.query({
      query: (slug: string) => ({
        url: `/projects/${slug}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),

    // Experience Endpoints
    getExperiences: builder.query({
      query: () => ({
        url: "/experiences",
        method: "GET",
      }),
      providesTags: ["experience"],
    }),
    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experiences",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["experience"],
    }),
    updateExperience: builder.mutation({
      query: ({ id, data }) => ({
        url: `/experiences/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["experience"],
    }),
    deleteExperience: builder.mutation({
      query: (id: string) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experience"],
    }),

    // Messages Endpoints
    getMessages: builder.query({
      query: ({ search = "", page = 1, limit = 10 } = {}) => ({
        url: `/messages?search_query=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["messages"],
    }),
    getMessageById: builder.query({
      query: (id: string) => ({
        url: `/messages/${id}`,
        method: "GET",
      }),
      providesTags: ["messages"],
    }),
    updateMessageStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/messages/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["messages"],
    }),
    deleteMessage: builder.mutation({
      query: (id: string) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["messages"],
    }),

    // Settings Endpoints
    getSettings: builder.query({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),

    // S3 Image Upload Endpoints
    uploadSingleImage: builder.mutation({
      query: (formData: FormData) => ({
        url: "/upload/single",
        method: "POST",
        body: formData,
        // FormData requires no header override, RTK Query sets boundary automatically
      }),
    }),
    uploadMultipleImages: builder.mutation({
      query: (formData: FormData) => ({
        url: "/upload/multiple",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectBySlugQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useUpdateMessageStatusMutation,
  useDeleteMessageMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useUploadSingleImageMutation,
  useUploadMultipleImagesMutation,
} = portfolioApi;
