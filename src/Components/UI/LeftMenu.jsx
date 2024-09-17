import { useState, useEffect } from "react";
import { BsArrowBarRight } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";

import nodeActionHandler from "../../utils/handlers/nodeActionHandler";
import edgeActionHandler from "../../utils/handlers/edgeActionHandler";


import { useGraph } from "../../contexts/GraphProvider";

const LeftMenu = ({
  isDirected,
}) => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    addHistory,
  } = useGraph();

  const [isOpen, setIsOpen] = useState(true);

  const [nodeAction, setNodeAction] = useState("Add");
  const [edgeAction, setEdgeAction] = useState("Add");

  const handleLeftShiftDown = (event) => {
    if (event.shiftKey && event.code === "ShiftLeft") {
      setIsOpen((prevState) => !prevState);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleLeftShiftDown);

    return () => {
      window.removeEventListener("keydown", handleLeftShiftDown);
    };
  }, []);

  const handleEdgeAction = (event) => {
    event.preventDefault();
    edgeActionHandler(
      edgeAction,
      nodes,
      edges,
      setEdges,
      isDirected,
      null,
      null,
      addHistory
    );
  };

  const handleNodeAction = (event) => {
    event.preventDefault();
    nodeActionHandler(
      nodeAction,
      nodes,
      setNodes,
      edges,
      setEdges,
      null,
      addHistory
    );
  };



  return (
    <>
      <div
        className={`floating-menu absolute h-screen flex items-center justify-center ${
          isOpen ? `left-5` : `left-[-194px]`
        } transition-all duration-500 gap-x-2`}
      >
        <div className=" text-blue-50 flex flex-col items-center justify-center gap-y-5">
          <form
            className="flex items-center justify-center gap-y-2 flex-col bg-blue-900 w-full px-5 py-3 rounded-md"
            onSubmit={(ev) => {
              ev.preventDefault();
            }}
          >
            <input
              type="text"
              id="node-name"
              placeholder="Name of the vertex"
              className="px-2 max-w-[160px] py-1 rounded-sm bg-transparent border-b-[1.5px] placeholder:text-sm placeholder:text-gray-400  border-blue-950 focus:placeholder: outline-none focus:border-blue-400"
              autoComplete="off"
            />
            <div className="flex items-center justify-center gap-x-2">
              <select
                id="node-action"
                value={nodeAction}
                onChange={(ev) => setNodeAction(ev.target.value)}
                className="bg-blue-200 text-blue-950 px-1 py-1 text-sm rounded-sm outline-none cursor-pointer w-full"
              >
                <option value="Add"> Add </option>
                <option value="Delete"> Delete </option>
              </select>
              <div>
                <button className="btn flex" onClick={handleNodeAction}>
                  <AiOutlineArrowRight className="inline text-lg" />
                </button>
              </div>
            </div>
          </form>

          <form className="flex items-center gap-y-2 flex-col bg-blue-900 w-full px-5 py-3 rounded-md">
            <div className="flex items-center flex-col justify-center gap-x-3">
              <input
                type="text"
                id="edge-source"
                placeholder="Source"
                required
                className="px-2 py-1 rounded-sm w-[128px] bg-transparent border-b-[1.5px] placeholder:text-sm border-blue-950 placeholder:text-gray-400  outline-none focus:border-blue-400"
                autoComplete="off"
             
              />

              <input
                type="text"
                id="edge-dest"
                required
                placeholder="Destination"
                className="px-2 py-1 rounded-sm w-[128px] bg-transparent border-b-[1.5px] placeholder:text-sm border-blue-950 placeholder:text-gray-400  outline-none focus:border-blue-400"
                autoComplete="off"
       
              />

              <input
                type="text"
                id="edge-weight"
                placeholder="Weight (optional)"
                className={`px-2 py-1 rounded-sm w-[128px] bg-transparent border-b-[1.5px] placeholder:text-sm border-blue-950 placeholder:text-gray-400  outline-none focus:border-blue-400 ${
                  edgeAction === "Delete" ? "hidden" : ``
                }`}
                autoComplete="off"
      
              />
            </div>
            <div className="flex items-center justify-center gap-x-2">
              <select
                id="edge-action"
                value={edgeAction}
                onChange={(ev) => setEdgeAction(ev.target.value)}
                className="bg-blue-200 text-blue-950 px-1 py-1 text-sm outline-none cursor-pointer"
              >
                <option value="Add"> Add </option>
                <option value="Delete"> Delete </option>
              </select>

              <button className="btn" onClick={handleEdgeAction}>
                <AiOutlineArrowRight className="inline text-lg" />
              </button>
            </div>
          </form>

        </div>
        <div className="text-blue-100 text-3xl cursor-pointer menu-switch">
          {isOpen ? (
            <IoCloseOutline onClick={() => setIsOpen(false)} />
          ) : (
            <BsArrowBarRight
              onClick={() => setIsOpen(true)}
              // className="animate-drag-left"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
