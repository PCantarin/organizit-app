package com.organizit.server.config;

import java.time.Instant;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.organizit.server.entities.Product;
import com.organizit.server.entities.User;
import com.organizit.server.repositories.ProductRepository;
import com.organizit.server.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner{

	@Autowired
	public BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	public UserRepository userRepository;
	
	@Autowired
	public ProductRepository productRepository;
	
	@Override
	public void run(String... args) throws Exception {
		
		User u1 = new User(null, "Pedro", "pedrohsc", "ADMIN", Instant.now(), passwordEncoder.encode("123"));
		User u2 = new User(null, "Henrique", "henriquesc", "ADMIN", Instant.now(), passwordEncoder.encode("321"));
		User u3 = new User(null, "Cantarin", "cantarin", "ADMIN", Instant.now(), passwordEncoder.encode("213"));
		
		Product p1 = new Product(null, "Ethernet Cable", null, "3 meters long", Instant.now(), 40);
		Product p2 = new Product(null, "HDMI Cable", null, "1 meter long", Instant.now(), 27);
		Product p3 = new Product(null, "Keyboard", null, "Generic brand", Instant.now(), 32);
		
		userRepository.saveAll(Arrays.asList(u1, u2, u3));
		productRepository.saveAll(Arrays.asList(p1, p2, p3));
		
	}

}
