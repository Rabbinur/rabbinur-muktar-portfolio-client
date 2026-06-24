import { useGetProjectsQuery } from "@/components/Redux/RTK/portfolioApi";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  type: string;
  status: string;
  liveLink: string;
  githubLink: string;
};

export function useProjects() {
  const { data: projectsRes, isLoading } = useGetProjectsQuery(undefined);

  const projects: Project[] =
    projectsRes?.data?.data?.map((p: any) => ({
      id: p._id || p.id,
      title: p.title,
      description: p.description,
      image: p.thumbnail,
      techStack: p.techStack || [],
      type: p.type || "WEB APP",
      status: p.status || "Completed",
      liveLink: p.liveLink || "",
      githubLink: p.githubLink || "",
    })) || [];

  return { projects, isLoading };
}
