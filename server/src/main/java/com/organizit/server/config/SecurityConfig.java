package com.organizit.server.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.cors(cors -> cors.configurationSource(corsConfigurationSource()))
		.csrf(csrf -> csrf.disable())
		.headers(headers -> headers.frameOptions(frame -> frame.disable()))
		.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.authorizeHttpRequests(auth -> auth
				.requestMatchers("/h2-console/**").permitAll()
				.requestMatchers("/auth/**").permitAll()
				.anyRequest().authenticated());
		
		return http.build();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception{
		return authConfig.getAuthenticationManager();
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		
		config.setAllowedOrigins(Arrays.asList("http://localhost:5500"));
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
		config.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		
		return source;
	}

}
