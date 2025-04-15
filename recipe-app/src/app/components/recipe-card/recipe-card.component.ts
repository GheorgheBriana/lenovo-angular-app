import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../interfaces/recipe.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  constructor(private router: Router) {}

  goToRecipePage() {
    this.router.navigateByUrl('recipes/' + this.recipe.id);
  }
}
