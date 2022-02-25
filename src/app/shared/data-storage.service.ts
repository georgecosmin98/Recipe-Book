import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-5eb22-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log(response);
        });
    }

    addRecipe(recipe: Recipe){
        this.http.put('http://localhost:8080/recipes', recipe).subscribe(response => {
            console.log(response);
        });
    }

    updateRecipe(recipe: Recipe, idRecipe: number){
      this.http.patch(`http://localhost:8080/recipes/update/${idRecipe}`, recipe).subscribe(response => {
          console.log(response);
      });
  }

    deleteRecipe(idRecipe : number){
      this.http.delete(`http://localhost:8080/recipes/${idRecipe}`).subscribe(response => {
          console.log(response);
      });
  }

    fetchRecipes() {
        return this.http.get<Recipe[]>('http://localhost:8080/recipes')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    })
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }
}
