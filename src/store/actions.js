import axios from 'axios';

const errorResponse = (e) => {
    return {
        statusCode: e.response.status,
        type: 'error',
        msg: e.response.data.error,
        // mySQLErrorNumber: e.response.data.msg.errorInfo[0],
        // mySQLErrorMsg: e.response.data.msg.errorInfo[2],
    };
};

export default {
    // actions: {
    // Akcje są asynhroniczne np do JSON-a
    // akcje wywołujemy za pomocą dispatch z innych komponentów
    getRecipesJSON(context) {
        // context.commit("isLoadedChange", false);

        axios
            .get(`${context.state.endpoints.recipes}`)

            .then((res) => context.commit('getRecipes', res.data))
            .catch((e) => context.commit('getRecipes', errorResponse(e)));
    },
    getRecipesIDJSON(context, ID) {
        // context.commit("isLoadedChange", false);

        axios
            .get(`${context.state.endpoints.recipesID}${ID}`)
            // .then((res) => context.commit('getResponse', res.config))
            .then((res) => context.commit('getRecipesID', res.data))
            .catch((e) => context.commit('getRecipesID', errorResponse(e)));
    },
    getRecipesByCategoryJSON(context) {
        // context.commit("isLoadedChange", false);

        axios
            .get(`${context.state.endpoints.recipesByCategory}`)
            .then((res) => context.commit('getRecipesByCategory', res.data))
            .catch((e) =>
                context.commit('getRecipesByCategory', errorResponse(e))
            );
    },
    getRecipesByCategoryIDJSON(context, ID) {
        // context.commit("isLoadedChange", false);

        // axios
        //     .get(`${context.state.endpoints.recipesByCategoryID}${ID}`)
        //     .then((res) => context.commit('getRecipesByCategoryID', res.data));

        let result = {};

        context.state.recipesByCategory.map((o) => {
            return o[0].ID == ID ? (result = o[1]) : undefined;
        });

        result.map((o) => {
            const id = o.recipes_id;

            context.state.recipes.map((o2) => {
                o2.ID == id ? (o.categories = o2.categories) : null;
            });
        });

        context.commit('getRecipesByCategoryID', result);
    },
    getCategoriesJSON(context) {
        // context.commit("isLoadedChange", false);

        axios
            .get(`${context.state.endpoints.categories}`)
            .then((res) => context.commit('getCategories', res.data))
            .catch((e) => context.commit('getCategories', errorResponse(e)));
    },
    getCategoriesIDJSON(context, ID) {
        // context.commit("isLoadedChange", false);

        axios
            .get(`${context.state.endpoints.categoriesID}${ID}`)
            .then((res) => context.commit('getCategoriesID', res.data))
            .catch((e) => context.commit('getCategoriesID', errorResponse(e)));
    },

    addCategory(context, name) {
        return axios
            .post(`${context.state.endpoints.categories}`, {
                category_name: name,
            })
            .then((res) =>
                context.commit('addCategory', {
                    statusCode: 200,
                    type: 'success',
                    msg: res.statusText,
                })
            )
            .catch((e) => context.commit('addCategory', errorResponse(e)));
    },
    addRecipes(context, recipes) {
        return axios
            .post(`${context.state.endpoints.recipes}`, {
                name: recipes.name,
                description: recipes.description,
                ingredients: recipes.ingredients,
                execution: recipes.execution,
                picture: recipes.picture,
                rating: recipes.rating,
                category_id: recipes.category_id,
            })
            .then((res) =>
                context.commit('addRecipes', {
                    statusCode: 200,
                    type: 'success',
                    msg: res.statusText,
                })
            )
            .catch((e) => context.commit('addRecipes', errorResponse(e)));
    },
    updateCategory(context, data) {
        axios
            .put(`${context.state.endpoints.categoriesID}${data.ID}`, {
                category_name: data.category_name,
            })
            .then(() => context.commit('updateCategory', data.category_name))
            .catch((e) => context.commit('updateCategory', errorResponse(e)));
    },
    updateRecipes(context, recipes) {
        axios
            .put(`${context.state.endpoints.recipesID}${recipes.ID}`, {
                name: recipes.name,
                description: recipes.description,
                ingredients: recipes.ingredients,
                execution: recipes.execution,
                picture: recipes.picture,
                rating: recipes.rating,
                category_id: recipes.category_id,
            })
            .then((res) => {
                context.commit('updateRecipes', {
                    statusCode: 200,
                    type: 'success',
                    msg: res.statusText,
                });
                return res;
            })
            .catch((e) => {
                // console.log(e.response);

                context.commit('updateRecipes', errorResponse(e));
                return Promise.reject(e);
            });
    },
    deleteRecipes(context, ID) {
        // context.commit("isLoadedChange", false);

        axios
            .delete(`${context.state.endpoints.recipesID}${ID}`)
            .then((res) => context.commit('deleteRecipes', res.data))
            .catch((e) => context.commit('deleteRecipes', errorResponse(e)));
    },
    deleteCategory(context, ID) {
        // context.commit("isLoadedChange", false);

        axios
            .delete(`${context.state.endpoints.categoriesID}${ID}`)
            .then((res) => context.commit('deleteCategory', res.data))
            .catch((e) => context.commit('deleteCategory', errorResponse(e)));
    },
    // },
};
