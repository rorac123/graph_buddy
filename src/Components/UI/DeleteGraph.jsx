import React from "react";
import Modal from "./Modal";
import { deleteGraphHandler } from "../../utils/handlers/graphHandler";

import { showMessage } from "../../utils/handlers/showMessageHandler";

const DeleteGraph = ({ setIsDeleteOpen, isDeleteOpen, allGraphs }) => {
  return (
    <Modal openCloseHandler={setIsDeleteOpen} openOrClose={isDeleteOpen}>
      <form
        className="bg-blue-500 w-[16rem] h-[6rem] rounded-md flex items-center justify-center gap-x-2"
        onSubmit={(ev) => {
          ev.preventDefault();
          deleteGraphHandler(
            document.getElementById("selected-name-delete").value,
            allGraphs
          );
          showMessage("Graph Deleted!", "success");
          setIsDeleteOpen(false);
        }}
      >
        <select
          className="bg-blue-200 text-blue-950 w-[116px] px-1 py-1 outline-none text-sm cursor-pointer rounded-md"
          id="selected-name-delete"
        >
          {allGraphs.map((graph, i) => {
            return (
              <option key={i} value={graph.name}>
                {graph.name.toUpperCase()}
              </option>
            );
          })}
        </select>

        <button className="btn">Delete</button>
      </form>
    </Modal>
  );
};

export default DeleteGraph;
