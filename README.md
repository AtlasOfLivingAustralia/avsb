# Australian Virtual Seed Bank

> A [React](https://reactjs.org/)-based single-page application for the Australian Seedbank Partnership, built with [Vite](https://vitejs.dev/)

**Please create new issues in the [avsb-requirements](https://github.com/AtlasOfLivingAustralia/avsb-requirements) repository**

## Getting Started

### Prerequisites

[Visual Studio Code](https://code.visualstudio.com/) is the recommended IDE for development.

- [Node.js v22](https://nodejs.org/en/download/current/): Runtime
- [pnpm](https://pnpm.io): Package Manager
- **VSCode Extensions**
  - [Biome](biomejs.dev): Code linting & formatting

### Setting up

1. Navigate into the `src` folder
2. Install dependencies with `pnpm install`
3. Start the project by running `pnpm dev`

## CI/CD

This project is CICD enabled! Check in and push will trigger a build and deploy. Details below

### Environments

There are 3 static environments, testing, staging and production. The environment is determined by the branch it's running on.
There are also dynamic environments that are created for each feature branch. These are created on demand and destroyed when the branch is deleted.

| git branch                            | environment | URL                                      |
| ------------------------------------- | ----------- | ---------------------------------------- |
| main                                  | production  | https://seedbank.ala.org.au              |
| main                                  | staging     | https://seedbank-staging.ala.org.au      |
| testing                               | testing     | https://seedbank.test.ala.org.au         |
| feature\* (e.g. feature/121-new-logo) | development | https://avsb-121-new-logo.dev.ala.org.au |

### Configuration

All configuration is handled in the [`cicd/config.ini`](cicd/config.ini) file. The File format is of a standard ini file with different sections corresponding to the different environments. There is a [DEFAULT] section that includes values common to all environments such as the code repo details. Default values can be overridden in an environment section

### Git branching

The branching model for this project is very similar to [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
The `main` branch is a faithful representation of what is running in staging and production, the `testing` branch represents what is deployed to the testing environment. Both of these branches are protected and can only be altered through PRs.

### Deployment

All branches are CICD enabled with auto deployment, any commits to origin will result in a deployment to the corresponding environment. This behavior is configurable at the environment level in the `cicd/config.ini` file using the AUTO_DEPLOY variable.

For each environment there is a one off bootstrapping process that needs to be run to create the CodePipeline that handles the CICD. For the static environments production, staging and testing this is done once and will pretty much never need to be done again. For the dynamic development environments this needs to be done once for each new branch that is created. To run the bootstrapping process authenticate with the AWS CLI in the comparison account and then run the `cicd/pipeline/deploy_pipeline.sh` script. This will create the CodePipeline and all the other AWS resources needed to run the environment.

### Development workflow

The `main` and `testing` branches are protected and cant be committed to directly. To begin development on a feature or enhancement:

- Create a branch off `main` that includes a short description of the feature e.g. `feature/update-footer`
- Bootstrap the new development environment bu running the `cicd/pipeline/deploy_pipeline.sh` script
- Make all your changes and commit them to your branch. Test.
- Once it's ready for deployment create a PR to merge your branch into `testing` Include at least one reviewer. It can be left up to the PR author if they want to wait for an approval, at the very least the reviewer receives a notification that we are getting ready for a testing deploy.
- Once the PR is merged it will be automatically deployed to the `testing` environment. Delete the feature branch and development environment using CodePipeline
- Do any required UAT testing on the testing environment
- When UAT is passed create a PR to merge `testing` into `main` including at least one reviewer. Again it can be left up to the author if they want to wait for an approval
- When the PR is merged the changed will be automatically deployed to staging and production

### Rollback

To rollback to any previous revision go to CodePipeline and after selecting "Release Change" choose the commit to release. [Detailed instructions here](https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-trigger-source-overrides.html#pipelines-trigger-source-overrides-console)

