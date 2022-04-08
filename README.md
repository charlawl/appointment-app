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
1. Spin up Postgres and NestJS app
```docker-compose up --build```

2. Run database seed migration
```docker-compose exec nestjs npx typeorm migration:run```

3. App will be running at `localhost:3000`

Postman collection for test requests: https://www.getpostman.com/collections/76a80b70bc3addbccb10


## Initial design
To emulate real life I started off sketching up a plan for the project and gathering requirements. This resulted in a Miro board of ideas:

<img src="img/ProjectPlan.png" alt="initial project plan">

Initial database design:
<img src="img/InitialDBschema.png" alt="initial DB schema" width=970>

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

### Authorisation & Authentication
Due to the sensitive nature of medical appointments it is very important to have proper role based access. At the moment there is no sensitive client information in the response as we are returning just appointment slots, but if extended to include endpoints about being able to retrieve client or appointment information then distinct roles would need to be implemented. 

### Monitoring & Logging




