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


Thu Sep 17 12:49:55 UTC 2020

Last build, Thu Sep 17 12:54:48 UTC 2020

Last build, Thu Sep 17 13:51:59 UTC 2020

Last build, Mon Sep 21 14:25:14 UTC 2020

Last build, Mon Sep 21 14:39:11 UTC 2020

Last build, Mon Sep 21 14:42:56 UTC 2020

Last build, Tue Sep 22 08:37:38 UTC 2020

Last build, Tue Sep 22 12:39:46 UTC 2020

Last build, Tue Sep 22 14:09:44 UTC 2020

Last build, Wed Sep 23 13:09:39 UTC 2020

Last build, Wed Sep 23 13:49:29 UTC 2020

Last build, Thu Sep 24 10:01:19 UTC 2020

Last build, Thu Sep 24 11:42:57 UTC 2020

Last build, Fri Sep 25 07:16:43 UTC 2020

Last build, Fri Sep 25 12:30:59 UTC 2020

Last build, Fri Sep 25 12:38:18 UTC 2020

Last build, Fri Sep 25 13:26:47 UTC 2020

Last build, Fri Sep 25 13:49:50 UTC 2020

Last build, Fri Sep 25 14:20:04 UTC 2020

Last build, Tue Sep 29 14:26:02 UTC 2020

Last build, Wed Sep 30 09:27:11 UTC 2020

Last build, Fri Oct  2 12:31:20 UTC 2020

Last build, Mon Oct  5 10:23:22 UTC 2020

Last build, Tue Oct  6 10:17:29 UTC 2020

Last build, Tue Oct  6 10:33:16 UTC 2020

Last build, Wed Oct  7 13:19:57 UTC 2020

Last build, Wed Oct  7 13:36:39 UTC 2020

Last build, Tue Oct 13 14:13:28 UTC 2020

Last build, Tue Oct 13 14:32:03 UTC 2020

Last build, Tue Oct 13 14:42:43 UTC 2020

Last build, Thu Oct 29 13:24:51 UTC 2020

Last build, Thu Oct 29 13:45:52 UTC 2020

Last build, Thu Oct 29 14:10:47 UTC 2020

Last build, Mon Nov  2 15:24:06 UTC 2020

Last build, Tue Nov  3 12:49:53 UTC 2020

Last build, Tue Nov  3 14:12:46 UTC 2020

Last build, Wed Nov  4 13:57:14 UTC 2020

Last build, Fri Nov  6 10:45:21 UTC 2020

Last build, Fri Nov  6 15:54:55 UTC 2020

Last build, Tue Nov 10 13:40:31 UTC 2020

Last build, Wed Nov 11 12:10:48 UTC 2020

Last build, Fri Nov 13 08:28:54 UTC 2020

Last build, Mon Nov 16 13:15:43 UTC 2020

Last build, Mon Nov 16 15:05:53 UTC 2020

Last build, Wed Nov 25 15:39:13 UTC 2020

Last build, Thu Nov 26 13:34:47 UTC 2020

Last build, Thu Nov 26 13:49:26 UTC 2020

Last build, Thu Nov 26 14:52:27 UTC 2020

Last build, Thu Nov 26 16:09:32 UTC 2020

Last build, Thu Nov 26 16:20:40 UTC 2020

Last build, Thu Nov 26 17:48:41 UTC 2020

Last build, Mon Nov 30 15:13:26 UTC 2020

Last build, Tue Dec  1 13:49:30 UTC 2020

Last build, Thu Dec  3 12:07:37 UTC 2020