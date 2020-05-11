import Home from './../components/Home.vue';
import RecipeDetail from './../components/recipes/RecipeDetails.vue';
export default [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/recipe/:slug',
        name: 'recipeDetail',
        component: RecipeDetail,
        props: true,
    },
];
