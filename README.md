# Example project integrating the Zigned REST API

This example project is built with Remix.

# Background
Zigned was invited to an event with a carnival theme. Our display invited visitors to guess how many balls were in a container. This app let the user submit their guess and email. After they had made their guess a request to sign it was sent to their inbox. When the event was over we selected the best guess as the winner.

# Notes

The app is a PWA built with Remix as it needed to run full screen on an iPad. If you are just looking for the API integration, look in the lib/zigned-api.server.ts for the code. If you want to see the full integration in the app, look in routes/_guess/guess.tsx and locate the "action"-function at the top.
This is a simplified example which means you might want to add additional things such as error handling if you are deploying to production.



- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
