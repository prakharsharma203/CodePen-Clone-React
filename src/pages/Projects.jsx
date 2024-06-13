import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const projects = useSelector((state) => state?.home?.user?.projects);
  const searchTerm = useSelector(
    (state) => state?.home?.user?.searchTerm || ""
  );
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredProjects = projects.filter((project) => {
        const lowerCaseTitle = project.title.toLowerCase();
        return searchTerm
          .toLowerCase()
          .split("")
          .every((letter) => lowerCaseTitle.includes(letter));
      });
      setFilter(filteredProjects);
    } else {
      setFilter(null);
    }
  }, [searchTerm, projects]);

  return (
    <div className="w-full flex items-center justify-center gap-6 flex-wrap mt-6">
      {filter ? (
        filter.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} />
        ))
      ) : (
        projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} />
        ))
      )}
    </div>
  );
};

export default Projects;
