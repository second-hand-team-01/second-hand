FROM openjdk:11-slim

ARG JAR_FILE=be/build/libs/SecondHand-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} secondhand-be.jar

ENTRYPOINT ["java","-jar","/secondhand-be.jar"]
