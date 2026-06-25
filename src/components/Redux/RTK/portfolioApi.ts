import { nodeApi } from "../nodeApi";

export const portfolioApi = nodeApi.injectEndpoints({
  endpoints: (builder) => ({
    // Projects Endpoints
    getProjects: builder.query({
      query: (searchQuery = "") => ({
        url: `/projects?search_query=${searchQuery}`,
        method: "GET",
      }),
      providesTags: [{ type: "projects", id: "LIST" }],
    }),
    getProjectBySlug: builder.query({
      query: (slug: string) => ({
        url: `/projects/${slug}`,
        method: "GET",
      }),
      providesTags: (_result, _error, slug) => [
        { type: "projects", id: slug },
        { type: "projects", id: "LIST" },
      ],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "projects", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "projects", id },
        { type: "projects", id: "LIST" },
      ],
    }),
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "projects", id },
        { type: "projects", id: "LIST" },
      ],
    }),

    // Experience Endpoints
    getExperiences: builder.query({
      query: () => ({
        url: "/experiences",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data?.data
          ? [
              ...result.data.data.map(({ _id }: any) => ({
                type: "experience" as const,
                id: _id,
              })),
              { type: "experience", id: "LIST" },
            ]
          : [{ type: "experience", id: "LIST" }],
    }),
    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experiences",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "experience", id: "LIST" }],
    }),
    updateExperience: builder.mutation({
      query: ({ id, data }) => ({
        url: `/experiences/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "experience", id },
        { type: "experience", id: "LIST" },
      ],
    }),
    deleteExperience: builder.mutation({
      query: (id: string) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "experience", id },
        { type: "experience", id: "LIST" },
      ],
    }),

    // Messages Endpoints
    getMessages: builder.query<any, { search?: string; page?: number; limit?: number } | void>({
      query: (args) => {
        const { search = "", page = 1, limit = 10 } = args || {};
        return {
          url: `/messages?search_query=${search}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result?.data?.data
          ? [
              ...result.data.data.map(({ _id }: any) => ({
                type: "messages" as const,
                id: _id,
              })),
              { type: "messages", id: "LIST" },
            ]
          : [{ type: "messages", id: "LIST" }],
    }),
    getMessageById: builder.query({
      query: (id: string) => ({
        url: `/messages/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "messages", id }],
    }),
    sendContactMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "messages", id: "LIST" }],
    }),
    updateMessageStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/messages/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "messages", id },
        { type: "messages", id: "LIST" },
      ],
    }),
    deleteMessage: builder.mutation({
      query: (id: string) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "messages", id },
        { type: "messages", id: "LIST" },
      ],
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

    // Resume Download Tracker
    trackResumeDownload: builder.mutation({
      query: () => ({
        url: "/resume",
        method: "POST",
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
  useSendContactMessageMutation,
  useUpdateMessageStatusMutation,
  useDeleteMessageMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useTrackResumeDownloadMutation,
  useUploadSingleImageMutation,
  useUploadMultipleImagesMutation,
} = portfolioApi;
