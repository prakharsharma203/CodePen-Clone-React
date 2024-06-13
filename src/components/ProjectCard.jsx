
import { useDispatch } from "react-redux";
import { deleteProject } from "../context/action/UserAction";
import { motion } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";


const ProjectCard = ({ project, idx }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProject(project.id));
  };
  // console.log(project.user);

  return (
    <motion.div
      key={idx}
      className="w-full cursor-pointer bg-secondary rounded-md flex flex-col justify-center items-center h-[375px] md:w-[485px] p-4"
    >
      <div className="bg-primary w-full h-full rounded-md overflow-hidden">
        <iframe
          title="Result"
          srcDoc={project.output}
          sandbox="allow-scripts"
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex justify-start items-center gap-3 w-35 mt-4 ml-3">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
          {project?.user?.photoURL ? (
            <motion.img
              whileTap={{ scale: 1.2 }}
              src={project?.user?.photoURL}
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-xl text-white font-semibold capitalize">
              {project?.user?.email[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-white text-lg capitalize">
            {project?.title}
          </p>
          <p className="text-primaryText text-sm capitalize">
            {project?.user?.displayName
              ? project?.user?.displayName
              : `${project.user?.email.split("@")[0]}`}
          </p>
        </div>
        <div>
          <motion.div whileTap={{scale : 0.9}} className="ml-[285px]" onClick={handleDelete}>
            <MdDeleteOutline className="text-4xl text-primaryText" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
