import React from "react";
import { Squid } from "../models";

interface SquidListProps {
  squidArr: Squid[];
  handleDelete: (id: number) => Promise<void>;
  handleEdit: (SquidData: any) => Promise<void>;
}

export function SquidList({
  squidArr,
  handleDelete,
  handleEdit,
}: SquidListProps) {
  return (
    <div className="flex flex-col w-60 items-center gap-8">
      {squidArr.map((squid) => {
        return (
          <div key={squid.id} className=" bg-teal-100 flex flex-col w-100 items-center gap-2 p-10 border-2 border-purple-500 rounded-md">
            <h2 className="font-bold">{squid.name}</h2>
            <p>{squid.age} years old</p>

            {squid.instruments?.map((instrument) => (
              <div key={instrument.id}>
                <p>{instrument.name}</p>
                <p>{instrument.type}</p>
                <p>{instrument.color}</p>
              </div>
            ))}

            <div className="flex gap-1">

            <button className="bg-violet-500 border-purple-500 color w-1/2 p-1 m-1 text-white" onClick={() => handleEdit(squid)}>Update</button>
            <button className="bg-violet-500 border-purple-500 w-1/2 p-1 m-1 text-white" onClick={() => handleDelete(squid.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
