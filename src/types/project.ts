export type TechCategory = 
  | 'Design'
  | 'Product'
  | 'Business'
  | 'Development'
  | 'Marketing'
  | 'Experimental'
  | 'Else';

export interface Size {
  width: number;
  height: number;
}

export interface Project {
  id: number;
  name: string;
  size: { width: number; height: number };
  technologies: TechCategory[];
  description: string;
  images: string[]; // Add this new field
}


export interface Position {
  top: number;
  left: number;
}

export type Color = string;

export const TECH_COLORS: Record<TechCategory, Color> = {
  Design: '#fff000',      // yellow
  Product: '#f29600',     // orange
  Business: '#e73828',    // red
  Development: '#910782', // purple
  Marketing: '#182987',   // blue
  Experimental: '#2Ca6e0',// skyblue
  Else: '#0dac67'         // green
}