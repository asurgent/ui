# Asurgent UI components

This library contains the basic set of asurgent's components. It exposes React API compatible components. Latest is deployed to [github pages](https://asurgent.github.io/ui)

## Install

Install and use in your project

```bash
npm install --save @asurgent/ui
```

## Run locally

This project uses storybook help view and develop components.

To run storybook locally:
```bash
git clone git@github.com:asurgent/ui.git

cd @asurgent/ui
npm run storybook
```


## Relase a package update
This repo uses [github-actions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-workflows) that automatically publish a new package whenever there a new release is published at. A release is automatically created when run eg. `npm version patch`.

You have basically 3 ways of increasing the version number.
1. Publishing a small patch? Run - `npm version patch`
2. Publishing a minor update? Run - `npm version minor`
3. Publishing a major update? Run - `npm version major` 

[Read more](https://docs.npmjs.com/cli/version)

After that simply run `git push && git push --tags`.

Whenever the tag is pushed, simply go under releases, edit the pushed tag. Give it a title and description, then publish it.



## Installing @asugent packages
1. Create a `personal access token` (Find out more [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line))
    * Give it access to `repo`, `write:packages`, `read:packages`
2. Create a `.npmrc` file in your home directory with the following content
    ```
    registry=https://registry.npmjs.org/
    @asurgent:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=YOUR_PERONAL_ACCESS_TOKEN
    ```
