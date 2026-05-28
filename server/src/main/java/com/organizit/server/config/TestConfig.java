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
import com.organizit.server.entities.enums.UserRole;
import com.organizit.server.repositories.MovementRepository;
import com.organizit.server.repositories.ProductRepository;
import com.organizit.server.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

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

		User u1 = new User(null, "Pedro Henrique Silva Cantarin", "pedrohsc", UserRole.ADMIN, Instant.now(),
				passwordEncoder.encode("123"));
		User u2 = new User(null, "Henrique Silva Cantarin", "henriquesc", UserRole.ADMIN, Instant.now(),
				passwordEncoder.encode("321"));
		User u3 = new User(null, "Cantarin Henrique Silva", "cantarin", UserRole.ADMIN, Instant.now(),
				passwordEncoder.encode("213"));

		Product p1 = new Product(null, "Ethernet Cable", null, "3 meters long", Instant.now(), 40);
		Product p2 = new Product(null, "HDMI Cable", null, "1 meter long", Instant.now(), 27);
		Product p3 = new Product(null, "Keyboard", null, "Generic brand", Instant.now(), 32);
		Product p4 = new Product(null, "Mouse", null, "Wireless optical mouse", Instant.now(), 25);
		Product p5 = new Product(null, "Monitor 24 inch", null, "Full HD IPS display", Instant.now(), 750);
		Product p6 = new Product(null, "USB Flash Drive", null, "64GB storage", Instant.now(), 45);
		Product p7 = new Product(null, "External SSD", null, "500GB fast storage", Instant.now(), 350);
		Product p8 = new Product(null, "Laptop Stand", null, "Aluminum adjustable stand", Instant.now(), 90);
		Product p9 = new Product(null, "Gaming Headset", null, "Surround sound headset", Instant.now(), 180);
		Product p10 = new Product(null, "Webcam", null, "1080p HD webcam", Instant.now(), 120);
		Product p11 = new Product(null, "Mechanical Keyboard", null, "RGB switches", Instant.now(), 320);
		Product p12 = new Product(null, "Gaming Mouse", null, "High precision sensor", Instant.now(), 150);
		Product p13 = new Product(null, "Router", null, "Dual band WiFi router", Instant.now(), 200);
		Product p14 = new Product(null, "Ethernet Switch", null, "8 port gigabit switch", Instant.now(), 160);
		Product p15 = new Product(null, "HDMI Splitter", null, "1 input 2 outputs", Instant.now(), 70);
		Product p16 = new Product(null, "Power Bank", null, "10000mAh portable charger", Instant.now(), 110);
		Product p17 = new Product(null, "Smartphone Stand", null, "Adjustable desk stand", Instant.now(), 35);
		Product p18 = new Product(null, "USB-C Hub", null, "Multiport adapter", Instant.now(), 140);
		Product p19 = new Product(null, "Microphone", null, "USB condenser mic", Instant.now(), 260);
		Product p20 = new Product(null, "Desk Lamp", null, "LED adjustable brightness", Instant.now(), 95);

		Movement m1 = new Movement(null, MovementType.ITEM_INSERTED, 20, Instant.parse("2026-04-19T22:15:07Z"), u1, p3);
		Movement m2 = new Movement(null, MovementType.ITEM_INSERTED, 24, Instant.parse("2026-04-22T22:15:07Z"), u3, p2);
		Movement m3 = new Movement(null, MovementType.ITEM_INSERTED, 33, Instant.parse("2026-04-29T22:15:07Z"), u3, p3);

		userRepository.saveAll(Arrays.asList(u1, u2, u3));
		productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16,
				p17, p18, p19, p20));
		movementRepository.saveAll(Arrays.asList(m1, m2, m3));

	}

}
