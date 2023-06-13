docker pull openjdk:11-jdk-alpine
FROM openjdk:11-jdk-alpine

ARG JAR_FILE=${{ github.workspace }}/be/build/libs/*.jar

COPY ${JAR_FILE} secondhand-be.jar

ENTRYPOINT ["java","-jar","/secondhand-be.jar"]
