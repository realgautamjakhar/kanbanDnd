"use client";
import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./components/Column";
import { boardData } from "../../data";
export default function Home() {
  const [board, setBoard] = useState(boardData);

  const reorderInSameColumn = (
    sourceCol: any,
    startIndex: number,
    endIndex: number
  ) => {
    const newTasks = Array.from(sourceCol.cards);

    const [removed] = newTasks.splice(startIndex, 1);

    newTasks.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      cards: newTasks,
    };

    return newColumn;
  };

  const reorderInDiffColumn = (
    sourceCol: any,
    destinationCol: any,
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const startTasks = Array.from(sourceCol.cards);
    const [removed] = startTasks.splice(sourceIndex, 1);
    const newStartCol = { ...sourceCol, cards: startTasks };

    const endTasks = Array.from(destinationCol.cards);
    endTasks.splice(destinationIndex, 0, removed);
    const newEndCol = { ...destinationCol, cards: endTasks };

    return { newStartCol, newEndCol };
  };

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    //No destination
    if (!destination) return;
    //Same source and destination with same index
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    //same col with different index

    const destinationCol = board.find((i) => i.id == destination.droppableId);
    const sourceCol = board.find((i) => i.id == source.droppableId);
    const task = sourceCol.cards[source.index];

    if (sourceCol.id == destinationCol.id) {
      const newCol = reorderInSameColumn(
        sourceCol,
        source.index,
        destination.index
      );
      const newBoard = [...board]; // Create a new array based on the existing board
      const findIndex = board.findIndex((col) => col.id === sourceCol.id);
      newBoard[findIndex] = newCol;
      setBoard(newBoard);
      return;
    }
    const newStartEnd = reorderInDiffColumn(
      sourceCol,
      destinationCol,
      source.index,
      destination.index
    );
    const newBoard = [...board];
    const startIndex = board.findIndex((col) => col.id === sourceCol.id);
    const destinationIndex = board.findIndex(
      (col) => col.id === destinationCol.id
    );
    newBoard[startIndex] = newStartEnd.newStartCol;
    newBoard[destinationIndex] = newStartEnd.newEndCol;
    setBoard(newBoard);
    return;
  };

  return (
    <main className=" p-10">
      <div className=" flex justify-between items-center">
        <div className=" grid gap-1">
          <h2 className=" text-3xl font-semibold">Create UI/UX for Test</h2>
          <div className=" flex gap-2  items-center">
            <span className=" bg-green-400 text-white px-2 py-1">Active</span>
            <p>4 Apr 2023 - 30 Apr 2023</p>
          </div>
        </div>
        <div className="flex gap-2 h-fit">
          <div className=" w-12 rounded-full aspect-square bg-gray-300  " />
          <div className=" grid gap-1">
            <p className="font-semibold">Project Manager</p>
            <p>John Doe</p>
          </div>
        </div>
      </div>
      <div className="py-10">
        <ul className=" flex gap-4 text-blue-700 font-semibold text-xl">
          <li className=" border-b-2 border-blue-700">Dashboard</li>
          <li>Tasks</li>
          <li>Chats</li>
          <li>Document</li>
          <li>Issues</li> <li>TimeSheet</li>
        </ul>
      </div>
      <div className=" grid grid-flow-col gap-4 place-content-start overflow-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          {board.map((col, index) => {
            return <Column key={index} column={col} />;
          })}
        </DragDropContext>
      </div>
    </main>
  );
}
