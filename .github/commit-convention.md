> This is heavily inspired by [Vite's commit convention](https://github.com/vitejs/vite/blob/main/.github/commit-convention.md?plain=1)

## Git Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

#### TL;DR:

Messages must be matched by the following regex:

<!-- prettier-ignore -->
```js
/^(revert: )?(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\(.+\))?!?: .{1,50}/
```

#### Examples

```
feat(dev): add 'comments' option
fix(dev): fix dev error
perf(build)!: remove 'foo' option
revert: feat(compiler): add 'comments' option
```

#### <a name="commit-header"></a>Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope:  sortSensei|treeTutor|cli|
  │                          upgrade|router|...
  │
  └─⫸ Commit Type: feat|fix|docs|style|refactor|perf|test|build|ci|chore
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

#### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Formatting, missing semi colons, …
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: npm)
- **ci**: Changes to our CI configuration files and scripts (examples: Github Actions)
- **chore**: Maintain

### Scope

The scope could be anything specifying the place of the commit change. For example `dev`, `build`, `workflow`, `cli` etc...

### Short Summary

The short summary contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end
