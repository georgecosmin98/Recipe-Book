import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private defaultImage: string = "https://parade.com/wp-content/uploads/2020/06/iStock-1203599963.jpg";

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private router: Router) { }

  ngOnInit(): void {
    console.log("edit")
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
    this.onAddIngredient();
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.dataStorageService.storeRecipes();
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.dataStorageService.storeRecipes();
    }
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipesById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredinet of recipe['ingredients'])
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredinet.name, Validators.required),
              'amount': new FormControl(ingredinet.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  isImageValid(url):boolean {
    var request = new XMLHttpRequest();
    var status: number;
    request.open("GET", url, true);
    request.send();
    request.onload = function() {
      status = request.status;
      if (request.status == 200) //if(statusText == OK)
      {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
