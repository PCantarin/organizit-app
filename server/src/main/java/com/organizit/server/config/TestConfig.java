package com.organizit.server.config;

import java.time.Instant;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.organizit.server.entities.Movement;
import com.organizit.server.entities.Product;
import com.organizit.server.entities.User;
import com.organizit.server.entities.enums.MovementType;
import com.organizit.server.repositories.MovementRepository;
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
	
	@Autowired
	public MovementRepository movementRepository;
	
	@Override
	public void run(String... args) throws Exception {
		
		User u1 = new User(null, "Pedro", "pedrohsc", "ADMIN", Instant.now(), passwordEncoder.encode("123"));
		User u2 = new User(null, "Henrique", "henriquesc", "ADMIN", Instant.now(), passwordEncoder.encode("321"));
		User u3 = new User(null, "Cantarin", "cantarin", "ADMIN", Instant.now(), passwordEncoder.encode("213"));
		
		Product p1 = new Product(null, "Ethernet Cable", null, "3 meters long", Instant.now(), 40);
		Product p2 = new Product(null, "HDMI Cable", null, "1 meter long", Instant.now(), 27);
		Product p3 = new Product(null, "Keyboard", null, "Generic brand", Instant.now(), 32);
		
		Movement m1 = new Movement(null, MovementType.ITEM_INSERTED, 20, Instant.parse("2026-04-19T22:15:07Z"), u1, p3);
		Movement m2 = new Movement(null, MovementType.ITEM_INSERTED, 24, Instant.parse("2026-04-22T22:15:07Z"), u3, p2);
		Movement m3 = new Movement(null, MovementType.ITEM_INSERTED, 33, Instant.parse("2026-04-29T22:15:07Z"), u3, p3);
		
		userRepository.saveAll(Arrays.asList(u1, u2, u3));
		productRepository.saveAll(Arrays.asList(p1, p2, p3));
		movementRepository.saveAll(Arrays.asList(m1, m2, m3));
		
	}

}
