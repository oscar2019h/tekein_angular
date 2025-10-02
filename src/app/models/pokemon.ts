export interface Skills {
  [key: string]: string;
}

// 2. Interfaz para el objeto Pokémon real (lo que está dentro de 'data')
export interface Pokemon {
  name: string;
  species: string;
  type: string;
  skills: Skills;
  attacks: string[];
  statistics: Skills;
  image: string;
}

// 3. Interfaz para la respuesta completa de la API
export interface ApiResponse {
  statusCode: number;
  message: string;
  data: Pokemon[]; // Usa la interfaz de Pokémon
}
