export interface Favoritos{
  id: number;
  nombre: string;
}

export interface Persona {
  nombre: string,
  favoritos: Favoritos[]
}

