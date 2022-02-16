import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.fetchRecipes().pipe(take(1)).subscribe();
  }

}
