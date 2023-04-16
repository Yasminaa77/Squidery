export interface Squid {
    id: number;
    name?: string;
    age: number;
    instruments: Instrument[];
}

export interface Instrument{
  id: number;
  name?: string;
  type?: string;
  color?: string;
  squid: Squid;
  squidId: number;
}