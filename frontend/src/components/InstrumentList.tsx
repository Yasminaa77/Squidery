import React from "react";
import { Instrument, Squid } from "../models";

interface InstrumentListProps {
  instrumentArr: Instrument[];
  handleDelete: (id: number) => Promise<void>;
  handleEdit: (InstrumentData: any) => Promise<void>;
}

export function InstrumentList({
  instrumentArr,
  handleDelete,
  handleEdit,
}: InstrumentListProps) {
  return (
    <div className="flex flex-col w-60 items-center gap-8">
     
     
     
      {instrumentArr.map((instrument) => {
        return (
          <div
            key={instrument.id}
            className="bg-amber-100 flex flex-col w-60 items-center gap-2 p-10 border-2 border-amber-600 rounded-md"
          >
            <h2 className="font-bold">{instrument.name}</h2>
            <p>Type: {instrument.type}</p>
            <p>Color: {instrument.color}</p>
            <p>Squid: {instrument.squid ? instrument.squid.name : "N/A"}</p>

            <div className="flex gap-1">
              <button
                className="bg-violet-500 border-amber-600 color w-1/2 p-1 m-1 text-white"
                onClick={() => handleEdit(instrument)}
              >
                Update
              </button>
              <button
                className="bg-violet-500 border-amber-600 color w-1/2 p-1 m-1 text-white"
                onClick={() => handleDelete(instrument.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
