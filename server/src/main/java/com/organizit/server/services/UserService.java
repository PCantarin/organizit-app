package com.organizit.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.organizit.server.entities.User;
import com.organizit.server.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	public UserRepository repository;
			
	public List<User> findAllActives(){
		return repository.findByActiveTrue();
	}
	
	public User findById(Long id) {
		User obj = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		if(!obj.getActive()) {
			throw new RuntimeException("User not found");
		}
		return obj;
	}
	
	
}
