# Australian Virtual Seed Bank

> A [React](https://reactjs.org/)-based single-page application for the Australian Seedbank Partnership, built with [Vite](https://vitejs.dev/)

## Getting Started

### Prerequisites

[Visual Studio Code](https://code.visualstudio.com/) is the recommended IDE for development.

- [Node.js v16](https://nodejs.org/en/download/current/): Runtime
- [Yarn](https://yarnpkg.com/getting-started/install): Package Manager
- **VSCode Extensions**
  - [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Code linting
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Code formatting

### Setting up

1. Navigate into the `src` folder
2. Install dependencies with `yarn`
3. Start the project by running `yarn dev`

## CI/ID

### Environments

There are 4 main environments, development, testing, staging and production. The environment of the code and infrastructure is determined by the branch it's running on

| git branch                                  | environment |
| ------------------------------------------- | ----------- |
| main                                        | production  |
| release\* (e.g. release/2.03)               | staging     |
| testing                                     | testing     |
| feature\* (e.g. feature/issue-121-new-logo) | development |

### Configuration

All configuration is handled in the `cicd/config.ini` file. The File format is of a standard ini file with different sections corresponding to the different environments. There is a [DEFAULT] section that includes values common to all environments such as the code repo details. Default values can be overridden in an environment section

### Git branching

The branching model for this project is very similar to [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
Direct commits are only made to feature branches. PRs are created to move through all the other branches up to main which corresponds to production

### Development workflow

A typical workflow would be that there's a task to make a change to the existing application or setup.

#### 1. Create a feature branch

Create a feature branch to make your changes. This would usually be based off the `main` branch which is production but could be from `testing` or `release` if the updates are being made against an unreleased change. On your new feature branch update the settings in `cicd/config.ini` in the development section to correspond to the changes you're making.

#### 2. Deploy the CodePipeline

Run your AWS CLI authentication then then run the script `cicd/deploy_pipeline.sh` This will update the code pipeline so that it now points to your newly created feature branch. It also ensures that all other CodePipeline settings match any changes you made in the `cicd/config.ini` file

#### 3. Code away!

Make your changes.

#### 4. Deploy to development

When you're ready to deploy commit and push your changes. Then in the AWS console navigate to CodePipeline and find the `aspb-site-development` pipeline and click "Release change" This will kick off a deployment. Follow the progress in the AWS console and look out for any errors. When the deploy is finished your changes will be ready to review at the domain specified in the config.ini file

#### 5. Cleanup ( optional )

When you're finished there is a manually approved cleanup stage in the pipeline that will remove all the infrastructure associated with your development branch. It's an optional step, all it does it to clean up and remove all the AWS resources acociated with this environemnt. So obs. dont run this in production. To run this Click the "Review" button in the Teardown stage of the pipeline and then "Approve"

### Deploy to testing

When development is finished update the `cicd/config.ini` so that any changes that need to be done in testing, staging or production environments have been made. Submit a PR to merge your feature branch into the testing branch. After review do the merge.

#### 1. Update the CodePipeline

Make sure you are on the testing branch. Run `cicd/deploy_pipeline.sh` to pick up any config changes and tag the pipeline with the current commit id.

#### 2. Deploy

In the AWS console navigate to CodePipeline and find the `avsb-site-testing` pipeline and click "Release change". Follow the progress in the AWS console and look out for any errors. When the deploy is finished your changes will be ready to review at the domain specified in the config.ini file against the testing environment.

### Deploy to staging

Create a tagged release branch from the testing branch. Push this back up to the origin.

#### 1. Update the CodePipeline

Make sure you are on the new release branch locally. Run `cicd/deploy_pipeline.sh` to pick up any config changes and tag the pipeline with the current commit id.

#### 2. Deploy

In the AWS console navigate to CodePipeline and find the `avsb-site-staging` pipeline and click "Release change". Follow the progress in the AWS console and look out for any errors. When the deploy is finished your changes will be ready to review at the domain specified in the config.ini file against the staging environment.

### Deploy to production

Submit a PR to merge the release branch into the main branch. After review do the merge.

#### 1. Update the CodePipeline

Make sure you are on the main branch. Run `cicd/deploy_pipeline.sh` to pick up any config changes and tag the pipeline with the current commit id.

#### 2. Deploy

In the AWS console navigate to CodePipeline and find the `avsb-site-production` pipeline and click "Release change". Follow the progress in the AWS console and look out for any errors. When the deploy is finished your changes will be ready to review at the domain specified in the config.ini file against the production environment.

### Rollback

CodePipeline is only able to release the latest commit on any branch. If you need to roll back a change you must either manually revert the change in the repo and commit it, or reset the head of the branch to point to a previous commit. Once this is done click "Release change" on the environment you need to roll back

Using git revert [4], we can keep the previous commit and revert commit both as commit history

    git revert COMMIT_ID
    git push

Using git force push [5], we can delete the previous commit and totally back to commit ID

    git reset COMMIT_ID
    git push --force-with-lease
