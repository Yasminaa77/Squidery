import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { Squid, Instrument } from '../models';
import { SquidForm } from './SquidForm';
import { SquidList } from './SquidList';

interface ActionProp {
  type: string
  payload?: Squid | undefined
}

export default function SquidSection() {
    const [squids, setSquids] = useState<Squid[]>([]);
    const [form, setForm] = useState<boolean>(false);
    
    useEffect(() => {
      (async (): Promise<void> => {
        const { data } = await axios.get<Squid[]>("/api/squids");
        console.log(data);
        setSquids(data);
      })();
    }, []);
  
    const handleAdd = async (formData: Squid) => {
      console.log("data", formData);
      const { data } = await axios.post<Squid>("/api/squids", formData);
      setSquids([...squids, data]);
      setForm(false);
    };
  
    const handleDelete = async (id: number) => {
      axios.delete(`/api/squids/${id}`)
        .then(() => console.log("Mood deleted!"))
        .catch((err) => console.error(err));
  
      setSquids(squids.filter((squid) => squid.id !== id));
    };
  
    const handleEdit = async (squidData: Squid) => {
      setForm(true);
      dispatch({ type: "update", payload: squidData });
    };
  
    const handleUpdate = async (squidData: Squid) => {
      const updatedData = {
        ...squidData,
      };
  
      axios.put(`/api/squids/${squidData.id}`, updatedData);
  
      setForm(false);
      squids.forEach((squid, index) => {
        if (squid.id === updatedData.id) {
          squids[index] = updatedData;
        }
      });
    };
  
    const handleAddUpdate = (formData: Squid) => {
      formData.id ? handleUpdate(formData) : handleAdd(formData);
    };

    const [state, dispatch] = useReducer<(state: any, action: ActionProp) => any>(formReducer, null);
  
  
    function formReducer(state: any, action: ActionProp) {
      const { type, payload } = action;
      setForm(true);
      switch (type) {
        case "add":
          return <SquidForm handleAddUpdate={handleAddUpdate} />;
        case "update":
          return <SquidForm handleAddUpdate={handleAddUpdate} squid={payload} />;
      }
    }
  
    return (
      <div className="flex w-60 justify-center items-center flex-col gap-8">
        <div className="flex gap-4">
        <h1 className='text-center'>Squidery</h1>
        {/* <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Octopus.png" alt="Octopus" width="60" height="60" /> */}
        </div>
        {form === false ? (
          <>
          <span>
            <button className="text-white bg-transparent text-xl" onClick={() => dispatch({ type: "add" })}>Add +</button>
            </span>
            <SquidList
              squidArr={squids}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </>
        ) : (
          <>{state}</>
        )}
      </div>
    );
}
