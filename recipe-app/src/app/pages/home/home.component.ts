import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { Router }                   from '@angular/router';
import { RouterModule }             from '@angular/router';
import { MatCardModule }            from '@angular/material/card';
import { MatButtonModule }          from '@angular/material/button';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';

import { RecipeCardComponent }      from '../../components/recipe-card/recipe-card.component';
import { Recipe }                   from '../../interfaces/recipe.interface';
import { RecipesService }           from '../../services/recipes.service';
import { db }                       from '../../db/db';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,          
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RecipeCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  recipes: Recipe[] = []; //Retetele default(statice)
  dummyRecipes: Recipe[] = []; // cele returnate de service local
  filteredRecipes!: Recipe[]; // retetele filtrate dupa cautare
  dbRecipes !: any[]; //aici se tin retetele live din InstantDB
  errorMessage: any = '';
  searchValue= '';
  dbSuscription: any;

  constructor(
    recipesService: RecipesService, 
    readonly router: Router, 
    // se injecteaza Angular ChangeDetector 
    private cdr: ChangeDetectorRef) {
    //se obtin retetele statice
    this.recipes = recipesService.recipes;
    try {
    recipesService.getAllRecipes().subscribe({
      next: (response) => {
        console.log(response);
        //throw new Error('Something happened');
        this.dummyRecipes = response.recipes;
        this.filteredRecipes = response.recipes;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.message;
      }
    });
  } catch (error) {
    this.errorMessage = error;
  }

  // Subscribe to data
  // cand se adauga/modifica o reteta => se executa functia
    this.dbSuscription = db.subscribeQuery({ recipes: {} }, (resp) => {
      // daca apare eraore => se salveaza
      if (resp.error) {
        this.errorMessage = resp.error;
        return;
      }
    // daca este o reteta valida => este salvata intr-o variabila folosita in HTML pentru a fi afisata in pagina
      if (resp.data) {
        this.dbRecipes = resp.data.recipes;
        //fortam actualizarea paginii cu changedetectorref
        this.cdr.detectChanges();
      }
    });
    
  }

  ngOnDestroy() {
    this.dbSuscription();

  }

  filterValue() {
    this.filteredRecipes = this.dummyRecipes.filter((recipe) => //dbRecipes in loc de dummyRecipes si la home component html la filtered
      recipe.name.toUpperCase().includes(this.searchValue.toUpperCase())
    );
  }
  
  redirectToAddRecipe() {
    this.router.navigateByUrl('add-recipe');
  }

  scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}
