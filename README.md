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

Last build, Wed Dec  9 12:41:08 UTC 2020

Last build, Mon Dec 14 11:15:56 UTC 2020

Last build, Tue Dec 15 08:26:44 UTC 2020

Last build, Tue Dec 15 08:28:56 UTC 2020

Last build, Wed Dec 16 09:05:27 UTC 2020

Last build, Wed Dec 16 14:15:30 UTC 2020

Last build, Thu Dec 17 11:10:23 UTC 2020

Last build, Thu Dec 17 14:23:12 UTC 2020

Last build, Thu Dec 17 15:17:01 UTC 2020

Last build, Thu Dec 17 15:37:29 UTC 2020

Last build, Fri Dec 18 15:39:34 UTC 2020

Last build, Mon Dec 21 09:18:08 UTC 2020

Last build, Mon Dec 21 10:19:27 UTC 2020

Last build, Tue Dec 22 08:36:28 UTC 2020

Last build, Tue Dec 22 17:19:19 UTC 2020

Last build, Tue Dec 22 20:41:06 UTC 2020

Last build, Tue Jan 12 12:38:06 UTC 2021

Last build, Tue Jan 12 15:19:07 UTC 2021

Last build, Wed Jan 13 07:22:33 UTC 2021

Last build, Thu Jan 14 13:27:29 UTC 2021

Last build, Fri Jan 15 13:55:15 UTC 2021

Last build, Fri Jan 15 14:42:39 UTC 2021

Last build, Thu Jan 21 08:10:55 UTC 2021

Last build, Fri Jan 22 08:15:00 UTC 2021

Last build, Fri Jan 22 15:29:52 UTC 2021

Last build, Thu Jan 28 16:57:59 UTC 2021

Last build, Wed Feb  3 11:52:13 UTC 2021

Last build, Wed Feb  3 13:40:57 UTC 2021

Last build, Thu Feb  4 16:47:26 UTC 2021

Last build, Tue Feb  9 09:55:11 UTC 2021

Last build, Tue Feb  9 15:55:29 UTC 2021

Last build, Wed Feb 10 09:41:14 UTC 2021

Last build, Wed Feb 10 10:41:14 UTC 2021

Last build, Wed Feb 10 11:01:10 UTC 2021

Last build, Wed Feb 10 15:59:29 UTC 2021

Last build, Wed Feb 10 17:32:15 UTC 2021

Last build, Thu Feb 11 08:42:48 UTC 2021

Last build, Fri Feb 12 14:48:43 UTC 2021

Last build, Fri Feb 12 15:05:07 UTC 2021

Last build, Tue Feb 16 15:23:09 UTC 2021

Last build, Mon Feb 22 15:22:22 UTC 2021

Last build, Wed Feb 24 10:38:56 UTC 2021

Last build, Wed Feb 24 10:46:13 UTC 2021

Last build, Thu Feb 25 15:45:55 UTC 2021

Last build, Fri Feb 26 10:42:02 UTC 2021

Last build, Fri Feb 26 11:23:56 UTC 2021

Last build, Fri Feb 26 15:57:23 UTC 2021

Last build, Thu Mar  4 10:49:51 UTC 2021

Last build, Mon Mar 15 12:59:39 UTC 2021

Last build, Tue Mar 16 08:52:21 UTC 2021

Last build, Tue Mar 16 10:33:54 UTC 2021

Last build, Tue Mar 16 11:21:43 UTC 2021

Last build, Tue Mar 16 12:01:31 UTC 2021

Last build, Tue Mar 16 13:26:27 UTC 2021

Last build, Tue Mar 16 14:31:12 UTC 2021

Last build, Thu Mar 18 08:06:57 UTC 2021

Last build, Thu Mar 18 13:37:25 UTC 2021

Last build, Thu Mar 18 16:52:41 UTC 2021

Last build, Fri Mar 19 11:21:25 UTC 2021

Last build, Fri Mar 19 12:22:29 UTC 2021

Last build, Tue Mar 23 19:59:17 UTC 2021

Last build, Thu Mar 25 13:06:01 UTC 2021

Last build, Fri Mar 26 14:31:23 UTC 2021

Last build, Mon Mar 29 15:26:43 UTC 2021

Last build, Thu Apr 15 14:13:10 UTC 2021

Last build, Fri Apr 16 07:28:01 UTC 2021

Last build, Fri Apr 16 07:30:53 UTC 2021

Last build, Mon Apr 19 07:32:03 UTC 2021

Last build, Tue May  4 11:40:27 UTC 2021

Last build, Mon May 17 07:29:24 UTC 2021

Last build, Wed May 19 14:19:01 UTC 2021

Last build, Mon May 24 10:31:52 UTC 2021

Last build, Wed May 26 13:53:34 UTC 2021

Last build, Fri May 28 08:52:57 UTC 2021

Last build, Wed Jun  2 07:47:58 UTC 2021

Last build, Wed Jun  2 09:10:55 UTC 2021

Last build, Wed Jun  2 13:30:44 UTC 2021

Last build, Fri Jun  4 11:56:46 UTC 2021