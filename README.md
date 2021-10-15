# Django Ninja auth frontend with Vue 3 + Typescript + Vite + PrimeVue

This project was originally intended to be an example frontend to work with [django-ninja-auth](https://github.com/mugartec/django-ninja-auth), but it ended up being a bit more than that. In summary, it is:

- A front-end application based on [Vue-3](https://v3.vuejs.org/) and [Vite](https://django-ninja.rest-framework.com/);
- built using the [Composition API](https://v3.vuejs.org/api/composition-api.html)'s new `script setup` syntax;
- with components and styles from [PrimeVue](https://www.primefaces.org/primevue/);
- and code generated by [Openapi Typescript Codegen](https://github.com/ferdikoomen/openapi-typescript-codegen);
- where you can **log in**, **log out**, **change your password** and **recover your password**.

You can find the [Django](https://www.djangoproject.com/)-based API designed to interact with this application [here](https://github.com/mugartec/django-ninja-auth-app-backend). Both projects are presented together [here](https://github.com/mugartec/django-ninja-auth-app).

## Dependencies

You only need [NodeJS](https://nodejs.org/) with [Yarn](https://yarnpkg.com/) (recommended) or [npm](https://www.npmjs.com/).

## Getting started

Just run `yarn install` followed by `yarn dev`, or the equivalent [npm](https://www.npmjs.com/) commands.