# Home Plants Management Web Application

### [Features](#features) | [Development](#development) | [Technology stack](#technology-stack)

Web application for managing your home plants.

Fully featured version of this application is live at https://homejungle.app

## Features

- Authentication / Authorization
  - New user registration
  - Login / Logout
  - View / Edit user details
- Email notifications:
  - Confirmation email on new account registration
  - Notifications whenever user email / password is updated
- Plant management
  - Add new plant with picture and its details
  - View / Edit / Delete plant details
  - Submit plant treatments

## Development

**Prerequisites:** Development setup depends on Docker.

### Clone this repository

```shell
git clone https://github.com/wrobel-mat/home-plants-management-app.git
```

### Backend service env setup

**Prerequisites:** Backend service depends on few external services in development environment to be setup. It requires mail provider and Google Cloud Storage setup. Use the `backend-template.env` file in the `docker-env/` directory and rename it to: `backend.dev.env`.

Open this file and provide valid mail \_HOST, \_PORT, \_USERNAME and \_PASSWORD variables.

On how to create Google Cloud Project, follow [this](https://cloud.google.com/resource-manager/docs/creating-managing-projects) documentation.

On how to create Google Application Credentials, follow [this](https://cloud.google.com/docs/authentication/production) documentation. The JSON file with generated credentials should be saved at `backend/gcloud/<filename>.json` directory and Dockerfile at `backend/` directory should be updated with JSON filepath accordingly.

On how to create Google Cloud Storage bucket, follow [this](https://cloud.google.com/storage/docs/creating-buckets) documentation.

GCLOUD_SIGN_URL_DURATION_DAYS sets up the number of days, for which the plant image signed URLs will be valid. If not provided, it will default to 1 day.

### Run the application locally with Docker

```shell
cd home-plants-management-app/

docker-compose -f docker-compose.dev.yml up --build --remove-orphans
```

### Open http://localhost:3000/

## Technology stack

Backend:

- Java
- Spring Boot
- Maven
- Hibernate
- PostgreSQL
- RabbitMQ
- JUnit
- AssertJ
- Mockito

Frontend:

- React
- HTML / CSS / JS
- Jest
- React Testing Library

Development environment:

- IntelliJ IDEA
- Docker
- Git

Production:

- Docker and Kubernetes
- GCP services: Google Kubernetes Engine, Google Domains, Google Cloud Storage
