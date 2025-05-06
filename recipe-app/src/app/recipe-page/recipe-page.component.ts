import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../interfaces/recipe.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-page',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent implements OnInit{
  readonly router= inject(ActivatedRoute);
  readonly recipesService = inject(RecipesService);

  // declaram o variabila pentru a salva reteta gasita
  recipe: Recipe | undefined;

  //functie care se apeleaza cand se incarca o componenta
  ngOnInit(): void {
    console.log('ngOnInit: componenta a fost inițializată');
    //se ia id-ul din URL ex: localhost:4200/recipes/3
    const id = this.router.snapshot.paramMap.get('id');
    // daca id-ul exista => se cauta in recipesService.recipe reteta cu acel id 
    // si se salveaza in this.recipe
    
    if (id) {
      this.recipe = this.recipesService.recipes.find(r => r.id === id);
      console.log('Rețetă găsită:', this.recipe);
    }
  }  
}

