# 🗄️ Project Structure

> *Hint: `git commit` will automatically check linting with ESLint and Prettier. `git commit --no-verify` will skip that.*

Most of the code lives in the `src` folder and looks something like this:

```sh
src
|
+-- app               # application layer containing:
|   |
|   +-- app.tsx       # main application component
|   +-- provider.tsx  # application provider that wraps the entire application with different global providers
|   +-- router.tsx    # application router configuration
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application. Follows facade pattern
|
+-- pages             # Entry points for pages
|
+-- styles            # shared styles used across the entire application
|
+-- translation       # translation configs, translatiion json's are in public/
```

For easy scalability and maintenance, organize most of the code within the features folder. Each feature folder should contain code specific to that feature, keeping things neatly separated. This approach helps prevent mixing feature-related code with shared components, making it simpler to manage and maintain the codebase compared to having many files in a flat folder structure. By adopting this method, you can enhance collaboration, readability, and scalability in the application's architecture.

A feature could have the following structure:

```sh
src/features/awesome-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types used within the feature
|
+-- utils       # utility functions for a specific feature
```

NOTE: You don't need all of these folders for every feature. Only include the ones that are necessary for the feature.
