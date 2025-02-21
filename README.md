# NG Journal - Insurance Portal
## An enterprise Angular demo application

### Setup

1. `npm install`
1. `nx serve api` (serves a local NestJS backend)
1. `nx serve insurance-portal -o` (serves the Angular app)


### Working in this workspace

If you want to extend the workspace with additional domains and libraries, you can make use of the included Nx local plugin which has a generator for each library type. 

You can run `nx g @ng-journal/ddd:feature list --domain notification` for example, to generate a feature library called `feature-list` inside a new `notification` domain.
