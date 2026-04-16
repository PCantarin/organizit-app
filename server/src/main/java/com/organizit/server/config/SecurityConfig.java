package com.organizit.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) {
		http
		.csrf(csrf -> csrf.disable())
		.headers(headers -> headers.frameOptions(frame -> frame.disable()))
		.authorizeHttpRequests(auth -> auth
				.requestMatchers("/h2-console/**").permitAll()
				.requestMatchers("/auth/**").permitAll()
				.requestMatchers("/users/**").permitAll()
				.requestMatchers("/products/**").permitAll()
				.requestMatchers("/movements/**").permitAll()
				.anyRequest().authenticated());
		
		return http.build();
	}

}
