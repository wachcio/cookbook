import Vue from 'vue';
import axios from 'axios';
export default {
    // mutations: {
    // Mutacje synhroniczne
    // W komponencie do zmiany w state będzie służyła funkcja w methods

    getRecipes(state, payload) {
        state.recipes = payload;
    },
    getRecipesID(state, payload) {
        state.recipesID = payload;
    },
    getRecipesByCategory(state, payload) {
        state.recipesByCategory = payload;
    },
    getRecipesByCategoryID(state, payload) {
        state.recipesByCategoryID = payload;
    },
    getCategories(state, payload) {
        state.categories = payload;
    },
    getCategoriesID(state, payload) {
        state.categoriesID = payload;
    },
    getResponse(state, payload) {
        console.log(payload);
    },
    // addCategory(state, payload) {
    //     state.operationStatus = payload;
    // },

    // addRecipes(state, payload) {
    //     state.operationStatus = payload;
    // },
    // updateCategory(state, payload) {
    //     state.categories = { ...state.categories, payload };
    // },

    // updateRecipes(state, payload) {
    //     state.recipes = { ...state.recipes, payload };
    // },
    addOperationStatus(state, payload) {
        state.operationStatus = { ...payload };
        return state.operationStatus;
    },
    setUserData(state, userData) {
        // console.log(document.head.querySelector('meta[name="csrf-token"]'));

        console.log(Vue.$cookies.get('XSRF-TOKEN'));
        console.log(Vue.$cookies.get('cookbook_session'));

        state.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        // axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
        // axios.defaults.headers.common.X-CSRF-TOKEN = userData.token;
        axios.defaults.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            common: {
                Authorization: `Bearer ${userData.token}`,
                // 'X-CSRF-TOKEN': userData.token,
                // 'X-CSRF-TOKEN': document
                //     .querySelector('meta[name="csrf-token"]')
                //     .getAttribute('content'),
            },
        };
    },

    clearUserData() {
        localStorage.removeItem('user');
        location.reload();
    },
};
