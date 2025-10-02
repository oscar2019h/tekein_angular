import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Pokemon} from '../../../../models/pokemon';
import {PokemonService} from '../../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
  pokemonName: string = '';

  foundPokemon: Pokemon[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
  }

  searchPokemon(): void {
    if (!this.pokemonName.trim()) {
      this.error = 'Por favor, introduce un nombre de Pokémon.';
      this.foundPokemon = [];
      return;
    }

    this.loading = true;
    this.error = null;
    this.foundPokemon = [];

    // Convertir a minúsculas para una búsqueda consistente en el backend
    const nameToSearch = this.pokemonName.trim().toLowerCase();

    this.pokemonService.getPokemonByName(nameToSearch).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.error = `Pokémon '${nameToSearch}' no encontrado.`;
        } else {
          this.foundPokemon = data;
        }
        this.loading = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.error = `Pokémon '${nameToSearch}' no encontrado.`;
        } else {
          console.error('Error de API:', err);
          this.error = 'Por el momento no se pudo hacer la busqueda intentelo mas tarde.';
        }
        this.loading = false;
      }
    });
  }
}
