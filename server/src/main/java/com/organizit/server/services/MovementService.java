package com.organizit.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.organizit.server.entities.Movement;
import com.organizit.server.repositories.MovementRepository;

@Service
public class MovementService {

	@Autowired
	public MovementRepository repository;
			
	public List<Movement> findAll(){
		return repository.findAll();
	}
	
	public Movement findById(Long id) {
		return repository.findById(id).get();
	}
	
}
