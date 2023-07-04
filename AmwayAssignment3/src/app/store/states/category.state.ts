import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import produce from "immer";
import { CategoryService } from "src/app/services/category.service";
import { GetCategories, GetSubCategories } from "../actions/category.action";

export class CategoryStateModel{
    category: any;
    subCategoryOfCategory:any;
}

@State<CategoryStateModel>(
    {
        name:'categoryState',
        defaults:{
            category: [],
            subCategoryOfCategory:[]
        }
    }
)

@Injectable()
export class CategoryStateClass {

    constructor(private categoryService: CategoryService) {}

    @Selector()
    static getCategories(state: CategoryStateModel) {
        return state.category;
    }

    @Selector()
    static getSubCategoriesOfCategories(state: CategoryStateModel){
        return state.subCategoryOfCategory;
    }
    
    @Action(GetCategories)
    getCategories(context: StateContext<CategoryStateModel>) {
        
        this.categoryService.getCategories().subscribe(
            res=> {
                context.setState(produce((draft: CategoryStateModel) => {
                    draft.category = res;
                }));
            }
        )
    }

    @Action(GetSubCategories)
    getSubCategories(context:StateContext<CategoryStateModel>, {categoryId}: any){
        
        const state=context.getState();

        let subCategoryFiltered:any[];
        subCategoryFiltered=[];

        state.category.forEach((element:any) => {
            if(element.id == categoryId){
                subCategoryFiltered.push(element);
            }
        });

        context.setState(produce((draft: CategoryStateModel) => {
            draft.subCategoryOfCategory = subCategoryFiltered;
        }));

    }
}