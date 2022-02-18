import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService, private loggingService : LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    )
    this.loggingService.printLog("Hello from Shopping List Component ngOnInit")
    document.body.style.setProperty('background-color', '#e0e0e0')
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
    document.body.style.setProperty('background-color', '#ffffff')
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  onDelete(index: number){
    this.slService.deleteIngredient(index);
  }
}
