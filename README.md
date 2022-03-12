# GoBookMe.online Monorepo

## Organization

### Folder Structure

-   **fed-main/** - (Main Repo for the Frontend Application Development)

### Git Workflow

-   **main** - Main branch, we should not push to this repo directly. This branch is for the main development and we should only push on real releases.
-   **dev** - Development branch, we should used this branch for all development work. This branch we keep in sync with the main branch. The main branch gets merged from this branch on each release. Our work from each sprint will be squash and merged to this branch (from prior Pull Request form Sprint). We also use this branch to test first before merging to the main branch. After the end of each Sprint we should crete new Sprint branch form this branch.
-   **sprint-{number}** - We create a new branch for each sprint in the (sprint-1, sprint-2,sprint-3, etc) in the root of the repo. In this branch we merge all features or bug that were meant to be done in the current sprint. A pull request needs to be created for each feature or bug before merging.
-   **sprint-{number}/feature-{name of the feature}** - We create a new branch for each feature in the sprint folder. The name of the branch must be with feature name following the name of the feature we want to implement.
-   **sprint-{number}/bug-{name of the bug}** - We create a new branch for each bug in the sprint folder. The name of the branch must be with bug name following the name of the bug we want to fix.
-   **main/hotfix-{name of the fix}** - We crete a new branch for each hotfix from the main branch. The name of the branch must be with hotfix name following the name of the hotfix we want to implement. One we finish the hotfix we should charry pick the hotfix to the dev branch so we keep it in sync.
