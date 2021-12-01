# Machines

This application is using [Xstate](https://xstate.js.org/docs/) for state management.

## progressMachine.ts

This state machine is used to keep track of a user's progress as they complete lessons within the app. Whenever a user completes a challenge/quiz on a lesson page the progress indicators throughout the site are updated.

![](../images/progress.png)

## progressService.ts

Since this app is a static site, we need to use `localStorage` to keep track of state across page loads and refreshes. This service is responsible for keeping the state in sync with `localStorage`.
