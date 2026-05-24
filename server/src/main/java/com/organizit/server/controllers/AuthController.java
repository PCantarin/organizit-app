package com.organizit.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.organizit.server.config.TokenService;
import com.organizit.server.entities.User;
import com.organizit.server.entities.dto.AuthenticationDTO;
import com.organizit.server.entities.dto.LoginResponseDTO;


@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private TokenService tokenService;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationDTO data){
		try {
			UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
			Authentication auth = this.authenticationManager.authenticate(usernamePassword);
			
			String token = tokenService.generateToken((User) auth.getPrincipal());
			
			return ResponseEntity.ok(new LoginResponseDTO(token));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(401).body("Bad credentials");
		}
	}
	
}
