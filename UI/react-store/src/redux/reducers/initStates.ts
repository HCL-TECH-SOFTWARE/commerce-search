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

//Foundation libraries
//Redux
import {
  AccountReducerState,
  CatalogReducerState,
  OrderReducerState,
  ErrorReducerState,
  SearchReducerState,
  OrderDetailsMapReducerState,
  ApiReducerState,
  CategoryReducerState,
  SellerInfoState,
} from "./reducerStateInterface";

const accountDefaultState: AccountReducerState = {
  orders: null,
  address: null,
};
const catalogDefaultState: CatalogReducerState = {
  productList: [],
  productListTotal: -1,
  priceMode: "1",
  facets: null,
  facetPrice: null,
  selectedFacets: {},
  selectedFacetLimits: [],
  selectedFacetPrices: { min: -1, max: -1 },
  selectedPageOffset: 1,
  selectedSortOption: "0",
  breadcrumbs: [],
  selectFacetRemove: false,
  productCache: {
    byId: {},
    container: [],
    idx: 0,
    MAX: 36,
  },
  productsByImageSearch: [],

};
const orderDefaultState: OrderReducerState = {
  cart: null,
  numItems: 0,
  orderItems: [],
  catentries: null,
  isCheckoutDisabled: false,
  shipInfos: null,
  shipModes: [],
  payMethods: [],
  isRecurringOrderDisabled: false,
  allowableShipModes: [],
  activeInprogressOrder: null,
  allowablePaymethods: [],
};
const errorDefaultState: ErrorReducerState = {
  errorKey: null,
  errorCode: null,
  errorTitleKey: null,
  errorMsgKey: null,
  handled: null,
  errorMessage: "",
  errorParameters: "",
};

const categoriesDefaultState: CategoryReducerState = {
  categories: [],
};

const searchDefaultState: SearchReducerState = {
  keywords: [],
};

const orderDetails: OrderDetailsMapReducerState = {};

const apiDefaultState: ApiReducerState = {
  apiFlowList: [],
};

const sellerDefaultState: SellerInfoState = {
  showSellerList: false,
  showSellerFacets: false,
  sellers: [],
  langId: -1,
};

export const defaultStates = {
  account: accountDefaultState,
  api: apiDefaultState,
  catalog: catalogDefaultState,
  order: orderDefaultState,
  user: { initiatedFromStorage: false },
  error: errorDefaultState,
  seo: {},
  contract: {},
  search: searchDefaultState,
  organization: {},
  context: {},
  success: {},
  confirmation: {},
  recurringOrder: { resultList: [] },
  orderDetails,
  checkoutProfile: { curUserProfiles: [] },
  site: { currentSite: null },
  categories: categoriesDefaultState,
  sellers: sellerDefaultState,
};

export const clearState = (o: any) => {
  for (const variableKey in o) {
    if (Object.prototype.hasOwnProperty.call(o, variableKey)) {
      delete o[variableKey];
    }
  }
};

const initStates = {
  ...defaultStates,
};
export default initStates;
