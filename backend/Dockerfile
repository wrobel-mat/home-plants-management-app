# syntax=docker/dockerfile:1

FROM arm64v8/openjdk:19-slim as base
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
COPY gcloud/home-jungle-338120-ceecfd084cec.json ./gcloud/home-jungle-338120-ceecfd084cec.json

FROM base as development
CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.profiles=default", "-Dspring-boot.run.jvmArguments=\"-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005\""]

# FROM base as test
# RUN ["./mvnw", "test"]

FROM base as build
RUN ./mvnw package

FROM openjdk:11-jre-slim as production
EXPOSE 8080

COPY --from=build /app/target/home-jungle-*.jar /home-jungle.jar
COPY gcloud/home-jungle-338120-ceecfd084cec.json ./gcloud/home-jungle-338120-ceecfd084cec.json

CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/home-jungle.jar"]

#build image
#
#docker build -f Dockerfile -t home-jungle-backend:dev --target development .

#run container
#
#docker run --rm -p 8080:8080 --name home-jungle-backend home-jungle-backend:dev