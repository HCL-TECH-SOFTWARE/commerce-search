/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL America, Inc.
 *
 * HCL Commerce
 *
 * (C) Copyright HCL America, Inc. Limited 2020
 *
 *---------------------------------------------------
 */
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
