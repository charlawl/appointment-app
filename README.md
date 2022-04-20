# Appointment App

## Description
An appointment application that allows you to retreive appointments based on filtering the criteria below and also add new appointment slots.
- Date ranges
- Appointment type
- Therapist speciality

### Stack
- NestJS
- Typescript
- PostgresSQL
- TypeORM

I found the docs of the respective tools to be really useful. There was a fair bit of learning to do before I could get down to fleshing out the solution :)

I also tried to show my thoughts through my commits and in comments throughout the code. I have a detailed list of observations and findings below my design also.

## Running the App
1. Build the project 
```docker build .```

2. Spin up Postgres and NestJS app
```docker-compose up --build```

3. Run database seed migration
```docker-compose exec nestjs npx typeorm migration:run```

4. App will be running at `localhost:3000`

Postman collection for test requests: https://www.getpostman.com/collections/76a80b70bc3addbccb10


## Initial design
I started off sketching up a plan for the project and gathering requirements. This resulted in a Miro board of ideas:

<img src="img/ProjectPlan.png" alt="initial project plan" width=670>

## Initial database design:
These schemas were for a system with more functionality to add clients etc. but for the purposes of the challenge I didn't add in a table for them in the end. 

<img src="img/InitialDBschema.png" alt="initial DB schema" width=670>

### API
From the above plan I created 2 endpoints:
- `GET appointments/?startDate={}&endDate={}&appointmentType={}&specialisms={}`
- `POST appointments` 

Sample Body:
```
{
    "therapistId": 2,
    "startTime":"2022-04-06T13:00:00Z",
    "endTime":"2022-04-06T14:00:00Z",
    "appointmentType": "oneOff"
}
```

## Learnings/Observations
- **Modules:** Used built-in NestJS modules as they provide all of the boiler plate code needed to bootstrap a serivce and allow for quick and easy extension of the project

- **DB Migrations:** Would have prefered to bootstrap the DB on startup as migrations are stateful but couldn't figure out how

- **Interceptors:** Really enjoyed using these. I didn't create a custom transformation and instead used the built in `ClassSerializerInterceptor` to expose the data I needed in the response from the DB. I would have done this very differently in .NET, by creating a mapper and models classes and parsing the JSON on response.

- **Error Handling:** I used the `class-validator` library for DTO validation. This was also pretty different to .NET where I would usually handle `BadRequest` at the controller level.

- **Dockerising:** I followed [this tutorial](https://blog.logrocket.com/containerized-development-nestjs-docker/). I unfortunately didn't pay much attention to my dev dependencies up until this point which means my distribution is probably larger than it should be. Given the trouble I had with Docker at a late stage in development, I would start with that in the future!

- **TypeORM Migrations:** I went with TypeORM Migrations to seed the DB with dummy data for development. It took a while for me to realise that I needed to pull the entities out of the compiled Javascript not the typescript - I'm still not sure why it works now, or why [a framework with "type" in the name needs to deal with the js in the first place](https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module#comment106171937_59607836)

- **Testing:** I wrote some basic unit tests and e2e tests for the service. Unfortunately because TypeORM needs the compiled JS to run, and `supertest` which came with NestJs needs the TS to run the tests. I know that the `ormconfig.json` needs to look at both the JS and TS for both to work, but after dockerizing the app the below config no longer works :( 

```
"entities": [
      'dist/**/*.entity.js',
      "src/**/*.entity.ts"
    ]
 ```

I also ran into an issue mocking the repositories I had created (along with a few other people who had a similar (issue)[https://github.com/nestjs/nest/issues/991]). Would love to discuss how to do this properly!

- **Documentation:** I added swagger to the API so it could be easily reviewed by other devs as to what the endpoints expect and return. I have also added in comments to make it (hopefully) a bit easier to understand my process.

### Authorisation & Authentication
Due to the sensitive nature of medical appointments it is very important to have proper role based access. At the moment there is no sensitive client information in the response as we are returning just appointment slots, but if extended to include endpoints about being able to retrieve client or appointment information then distinct roles would need to be implemented. 

I would verify a users credientials before sending a JWT as a bearer token. This would ensure that clients could only access their only appointments and therapists could see their own appointment slots.

### Monitoring & Logging
#### Logging
I put in a few comments in the code where I would log out certain pieces of information. I don't like overly verbose logging as I think it can become noise when trying to debug.

#### Healthchecks
I would set up 2; one to check the API was still available and healthy, and another to ensure that the API still had a connection to the DB. These metrics could be displayed in Datadog/Grafana etc. with an alert to monitor if the status of either changes

#### Alerting
 - API health
 - DB health
 - monitoring around error rates (`400`, `404` response codes)

#### Dashboards
I think a simple dashboard would be a great way of monitoring this service. Given more time I would have liked to add Grafana and create a few simple metrics and alerts
