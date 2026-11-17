# Australian Virtual Seed Bank

A [React](https://react.dev/) single-page application for the [Australian Seed Bank Partnership](https://www.seedpartnership.org.au/), built with [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), and [Mantine](https://mantine.dev/).

**Create new issues in the [avsb-requirements](https://github.com/AtlasOfLivingAustralia/avsb-requirements) repository.**

## Local development

### Prerequisites

[Visual Studio Code](https://code.visualstudio.com/) is the recommended editor.

- [Node.js 22](https://nodejs.org/en/download/) (22.12 or later). This matches `NODE_VERSION` in [`cicd/frontend/config.ini`](cicd/frontend/config.ini).
- [pnpm](https://pnpm.io/installation), enabled with Corepack: `corepack enable pnpm`
- [Biome](https://biomejs.dev/) VS Code extension, for linting and formatting

The [dev container](.devcontainer/devcontainer.json) is for CloudFormation and pipeline work. It does not install Node.js, so use a local Node.js 22 install to run the app.

### Setup

From the repository root:

```sh
pnpm install
pnpm dev
```

Vite serves the app with the `development` mode env file. Other commands:

| Command | Purpose |
| --- | --- |
| `pnpm test` | Run the Vitest suite |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm lint` | Lint `src` with Biome |
| `pnpm lint:fix` | Lint and apply Biome fixes |
| `pnpm build:development` | Typecheck and build for development |
| `pnpm build:testing` | Typecheck and build for testing |
| `pnpm build:staging` | Typecheck and build for staging |
| `pnpm build:production` | Typecheck and build for production |
| `pnpm preview` | Serve the last production build locally |

CI installs dependencies with pnpm, runs `pnpm test`, then runs `pnpm build:<environment>`.

### App configuration

Vite reads environment files from [`config/`](config/). Each deploy mode has its own file (`.env.development`, `.env.testing`, `.env.staging`, `.env.production`).

For local-only overrides, add `config/.env.development.local`. That file is gitignored.

## CI/CD

Pushes to origin build and deploy through AWS CodePipeline. Whether a pipeline starts on every commit is set per environment with `AUTO_DEPLOY` in [`cicd/frontend/config.ini`](cicd/frontend/config.ini).

### Environments

`main` and `testing` are long-lived. Any other branch, including `feature/*`, gets a development environment. `main` feeds both staging and production; the bootstrap script chooses which one.

Branch names used in hostnames and stack names are sanitised by [`cicd/clean_branch.sh`](cicd/clean_branch.sh): the `feature/` prefix is removed, separators become hyphens, and the result is lowercased and truncated.

| Git branch | Environment | URL | Auto-deploy |
| --- | --- | --- | --- |
| `main` | production | https://seedbank.ala.org.au | No |
| `main` | staging | https://seedbank-staging.ala.org.au | Yes |
| `testing` | testing | https://seedbank.test.ala.org.au | Yes |
| other branches, e.g. `feature/121-new-logo` | development | https://seedbank-121-new-logo.dev.ala.org.au | Yes |

### Configuration

Pipeline settings are standard INI files. `[DEFAULT]` holds values shared by every environment. An environment section overrides those values.

- [`config.ini`](config.ini) — product name, GitHub repository, region, and shared pipeline settings
- [`cicd/frontend/config.ini`](cicd/frontend/config.ini) — frontend stack names, S3, CloudFront hostnames, and `AUTO_DEPLOY`

### Branching

`main` matches what is released to staging and production. `testing` matches the testing environment. Both branches are protected and change only through pull requests.

### Bootstrapping a pipeline

Each environment needs a one-off bootstrap that creates its CodePipeline and related AWS resources. Production, staging, and testing are bootstrapped once. A development environment is bootstrapped once per branch.

Authenticate the AWS CLI in the account for that environment. Commit and push the branch, then run:

```sh
cicd/frontend/pipeline/deploy_pipeline.sh
```

On `main`, the script asks whether to target production or staging. Pass `-e prod` to select production. Pass `-b <branch>` when the checkout is detached.

### Development workflow

1. Branch from `main`, for example `feature/update-footer`.
2. Push the branch and bootstrap its development environment with `cicd/frontend/pipeline/deploy_pipeline.sh`.
3. Commit and push changes. The development environment deploys automatically. Run the test suite before opening a pull request.
4. Open a pull request into `testing` and request at least one reviewer. Merging deploys to https://seedbank.test.ala.org.au.
5. Delete the feature branch and tear down its development environment in CodePipeline.
6. Complete UAT on the testing environment.
7. Open a pull request from `testing` into `main` and request at least one reviewer. Merging deploys to staging.
8. Release production from the production CodePipeline when staging is accepted. Production does not deploy on merge because `AUTO_DEPLOY` is `false`.

Waiting for review approval is up to the pull request author. Requesting a reviewer still notifies them that a testing or production release is coming.

### Rollback

In CodePipeline, choose **Release change** and select the commit to release. See [AWS: Start a pipeline with a source revision override](https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-trigger-source-overrides.html#pipelines-trigger-source-overrides-console).

## License

[Mozilla Public License 2.0](LICENSE).
