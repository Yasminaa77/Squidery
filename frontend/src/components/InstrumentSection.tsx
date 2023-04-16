import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { Instrument } from '../models';
import { InstrumentForm } from './InstrumentForm';
import { InstrumentList } from './InstrumentList';

interface ActionProp {
  type: string
  payload?: Instrument | undefined
}

export default function InstrumentSection() {
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [form, setForm] = useState<boolean>(false);
    
    useEffect(() => {
      (async (): Promise<void> => {
        const { data } = await axios.get<Instrument[]>("/api/instruments");
        console.log(data);
        setInstruments(data);
      })();
    }, []);
  
    const handleAdd = async (formData: Instrument) => {
      console.log("data", formData);
      const { data } = await axios.post<Instrument>("/api/instruments", formData);
      setInstruments([...instruments, data]);
      setForm(false);
    };
  
    const handleDelete = async (id: number) => {
      axios.delete(`/api/instruments/${id}`)
        .then(() => console.log("instrument deleted!"))
        .catch((err) => console.error(err));
  
      setInstruments(instruments.filter((instrument) => instrument.id !== id));
    };
  
    const handleEdit = async (instrumentData: Instrument) => {
      setForm(true);
      dispatch({ type: "update", payload: instrumentData });
    };
  
    const handleUpdate = async (instrumentData: Instrument) => {
      const updatedData = {
        ...instrumentData,
      };
  
      axios.put(`/api/instruments/${instrumentData.id}`, updatedData);
  
      setForm(false);
      instruments.forEach((instrument, index) => {
        if (instrument.id === updatedData.id) {
          instruments[index] = updatedData;
          window.location.reload()
        }
      });


    };
  
    const handleAddUpdate = (formData: Instrument) => {
      formData.id ? handleUpdate(formData) : handleAdd(formData);
    };

    const [state, dispatch] = useReducer<(state: any, action: ActionProp) => any>(formReducer, null);
  
  
    function formReducer(state: any, action: ActionProp) {
      const { type, payload } = action;
      setForm(true);
      switch (type) {
        case "add":
          return <InstrumentForm handleAddUpdate={handleAddUpdate} />;
        case "update":
          return <InstrumentForm handleAddUpdate={handleAddUpdate} instrument={payload} />;
      }
    }
  
    return (
      <div className="flex w-80 justify-center items-center flex-col gap-8 overflow-y-scroll">
        <div className="flex gap-4">
        <h1 className='text-center'>Instrument</h1>
        {/* <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Musical%20Notes.png" alt="Musical Notes" width="60" height="60" /> */}
        </div>
        
        {form === false ? (
          <>
            <button className="text-white bg-transparent text-xl" onClick={() => dispatch({ type: "add" })}>Add +</button>
            <InstrumentList
              instrumentArr={instruments}
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
