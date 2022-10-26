/**
*==================================================
Copyright [2022] [HCL America, Inc.]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*==================================================
**/

//Redux
import { RootReducerState } from "../reducers";

export const productListSelector = (state: RootReducerState) => state.catalog.productList;
export const productListTotalSelector = (state: RootReducerState) => state.catalog.productListTotal;
export const priceModeSelector = (state: RootReducerState) => state.catalog.priceMode;

export const facetsSelector = (state: RootReducerState) => state.catalog.facets;
export const facetPriceSelector = (state: RootReducerState) => state.catalog.facetPrice;

export const selectedFacetsSelector = (state: RootReducerState) => state.catalog.selectedFacets;
export const selectedFacetPricesSelector = (state: RootReducerState) => state.catalog.selectedFacetPrices;
export const selectedFacetLimitsSelector = (state: RootReducerState) => state.catalog.selectedFacetLimits;
export const selectedPageOffsetSelector = (state: RootReducerState) => state.catalog.selectedPageOffset;
export const selectedSortOptionSelector = (state: RootReducerState) => state.catalog.selectedSortOption;
export const selectFacetRemoveSelector = (state: RootReducerState) => state.catalog.selectFacetRemove;

export const breadcrumbsSelector = (state: RootReducerState) => state.catalog.breadcrumbs;

export const productListByImageSelector = (state: RootReducerState) => state.catalog.productsByImageSearch;
Footer
