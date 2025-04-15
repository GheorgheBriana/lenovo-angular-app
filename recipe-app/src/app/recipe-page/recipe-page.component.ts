import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';


@Component({
  selector: 'app-recipe-page',
  imports: [],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent {
  readonly router= inject(ActivatedRoute)
  
}
