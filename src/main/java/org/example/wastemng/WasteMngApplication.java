package org.example.wastemng;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class WasteMngApplication {

    public static void main(String[] args) {

        Dotenv dotenv = Dotenv.load();

        // Pass Mongo URI as system property
        System.setProperty("spring.data.mongodb.uri", dotenv.get("MONGODB_URI"));

        SpringApplication.run(WasteMngApplication.class, args);
    }

}
