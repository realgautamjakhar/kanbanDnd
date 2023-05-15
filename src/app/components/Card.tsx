import React from "react";
import type { DraggableProvided } from "@hello-pangea/dnd";

interface CardProps {
  cardData: any;
  provided: DraggableProvided;
}
const Card = ({ cardData, provided }: CardProps) => {
  return (
    <div
      className="flex flex-col p-[10px] gap-4 bg-white rounded-md shadow-2xl shadow-slate-300"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <span
        className={` text-white w-fit text-xs px-2 py-1 ${
          cardData.priority === "low"
            ? "bg-blue-300"
            : cardData.priority === "medium"
            ? "bg-green-300"
            : cardData.priority === "high"
            ? "bg-red-300"
            : ""
        }`}
      >
        {cardData.priority === "low"
          ? "Low Priority"
          : cardData.priority === "medium"
          ? "Medium Priority"
          : cardData.priority === "high"
          ? "High Priority"
          : ""}
      </span>
      <h2 className=" text-base text-start">{cardData.title}</h2>
      <div className=" flex gap-4 items-center">
        <div className=" flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg>
          {cardData.comment}
        </div>
        <div className=" flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg>
          {cardData.attachment}
        </div>
      </div>
    </div>
  );
};

export default Card;
