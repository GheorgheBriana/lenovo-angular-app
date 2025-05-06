import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ValidationErrors, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../interfaces/recipe.interface';
import { id, tx, db } from '../db/db';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-recipe',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],  
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {
  binding: any;
  localStorageValue: string | null = '';

  constructor(
    readonly recipeService: RecipesService,
    private router: Router
  ) {}
  
  
  addRecipeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    difficulty: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', [Validators.required, Validators.minLength(3)]),
    preparationTimeMinutes: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  onSubmit(){
   // if(this.addRecipeForm.valid) console.log(this.addRecipeForm.valid);
   //  else console.error("FORM IS NOT VALID");
  /*const jsonObj = {
      "a": 12,
      "height": 180,
      "test": {
        a: "another object",
      },
      array: ['1', 2, 4],
    };*/

    //localStorage.setItem('theme', 'light');
    //localStorage.setItem('theme', JSON.stringify(jsonObj));
    //sessionStorage.setItem('theme', 'light');
    //this.localStorageValue = localStorage.getItem('theme');

    //sa sterg comul de mai jos daca nu merge
    /*if(this.addRecipeForm.valid) {
      this.recipeService.addDbRecipes(
        this.addRecipeForm.value as Omit <Recipe, 'id' >
      );
    }*/
      if (this.addRecipeForm.invalid) return;

      const { name, image, difficulty, preparationTimeMinutes } = this.addRecipeForm.value;
    
      const newId = id(); // ID nou pentru rețetă
      const newRecipe = {
        name,
        image,
        difficulty,
        prepTimeMinutes: preparationTimeMinutes
      };
    
      db.transact(
        tx['recipes'][newId].update(newRecipe)
      ).then(() => {
        console.log('Rețetă adăugată cu succes'); 
      }).catch((err) => {
        console.error('Eroare la adăugare:', err);
      });
    
  }
}
