package com.organizit.server.config;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.organizit.server.entities.User;
import com.organizit.server.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner{

	@Autowired
	public BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	public UserRepository userRepository;
	
	@Override
	public void run(String... args) throws Exception {
		
		User u1 = new User(null, "Pedro", "pedrohsc", "ADMIN", Instant.now(), passwordEncoder.encode("123"));
		
		userRepository.save(u1);
		
	}

}
