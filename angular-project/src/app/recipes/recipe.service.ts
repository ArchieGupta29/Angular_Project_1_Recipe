import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel', 
            'A super-tasty Schnitzel - just awesome!',
            'https://storage.needpix.com/rsynced_images/schnitzel-4041163_1280.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ] ),
        new Recipe(
                'Big Fat Burger', 
                'What else do you need to say',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg/1200px-Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
                [
                    new Ingredient('Buns', 2),
                    new Ingredient('Meat', 1),
                    new Ingredient('Cheese', 1)
                ] )
      ];

      constructor(private slService: ShoppingListService){}

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }
    
      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
          this.recipes[index] = newRecipe;
          this.recipesChanged.next(this.recipes.slice());
      }
      
      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

}