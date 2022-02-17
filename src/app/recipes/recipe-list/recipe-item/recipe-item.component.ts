import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  linkEnabled = true;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService : RecipeService) {}

  ngOnInit(): void {}

  onEditRecipe() {
    console.log("Hehe")
    this.linkEnabled = false;
    this.router.navigate([this.index, 'edit'], { relativeTo: this.route });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
