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
			
	public List<User> findAll(){
		return repository.findAll();
	}
	
	public User findById(Long id) {
		return repository.findById(id).get();
	}
	
}
