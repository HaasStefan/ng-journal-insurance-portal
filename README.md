# NG Journal - Insurance Portal
## An enterprise Angular application

<a alt="NG Journal Logog" href="https://ng-journal.com" target="_blank" rel="noreferrer"><img src="https://ng-journal.com/assets/ng-journal.png" width="45"></a>

### Setup

1. `npm install`
1. `nx serve api` (serves a local NestJS backend)
1. `nx serve insurance-portal -o` (serves the Angular app)

### Topics

- Angular (version 16)
- Nx
- Nx Generators
- Enterprise Monorepo Pattern (Improved version)
- Signals
- Signal-based State Management
- Route-based Inputs
- Facade Pattern
- OnPush Change Detection


### Working in this workspace

If you want to extend the workspace with additional domains and libraries, you can make use of the included Nx local plugin which has a generator for each library type. 

You can run `nx g @ng-journal/ddd:feature list --domain notification` for example, to generate a feature library called `feature-list` inside a new `notification` domain.

If you are not familiar with the patterns used in this repository, I would suggest to check out the resources linked below. Or reach out to me [here](https://www.ng-journal.com/contact) if you want to book an [Nx workshop](https://www.ng-journal.com/workshop).

### Resources

#### [1. Webinar: Scaling Angular Applications](https://www.youtube.com/watch?v=FtmtNP6qNis&t=100s&ab_channel=StefanHaas)
[![Webinar on Scaling Angular Apps](https://i.imgur.com/YhQSX9u.png)](https://www.youtube.com/watch?v=FtmtNP6qNis&t=100s&ab_channel=StefanHaas "Webinar: Scaling Angular Applications")

#### [2. Enterprise Monorepo Pattern](https://ng-journal.com/blog/2022-12-19-the-enterprise-monorepo-angular-patterns/)

#### [3. Signals and the RxJS-Interop](https://ng-journal.com/blog/2023-04-25-signals-and-the-rxjs-interop/)

#### [4. Facade Pattern](https://ng-journal.com/blog/2022-12-08-ngrx-component-store-meets-facade-pattern/)

