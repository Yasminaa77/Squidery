import React, { ChangeEventHandler, useState, useEffect } from "react";
import { Instrument, Squid } from "../models";
import axios from "axios";

interface SquidFormProps {
  handleAddUpdate: (formData: Squid) => void;
  squid?: Squid;
}

export function SquidForm({ handleAddUpdate, squid }: SquidFormProps) {
  const [formData, setFormData] = useState<Squid | undefined>(squid);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> ) {
    e.preventDefault();

    setFormData({
          ...formData,
        [e.target.name]: e.target.value,
    } as unknown as Squid);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddUpdate(formData!);
  }

  return (
    <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
      <label className="text-white" htmlFor="nameInput">Squid Name:</label>
      <input
        id="nameInput"
        type="text"
        name="name"
        value={formData?.name}
        onChange={handleChange}
      />

      <label className="text-white " htmlFor="colorInput">Squid Age:</label>
      <input
        id="ageInput"
        type="text"
        name="age"
        value={formData?.age}
        onChange={handleChange}
      />
  
      

      <button className="bg-teal-400 text-black"type="submit">Submit</button>
    </form>
  );
}
