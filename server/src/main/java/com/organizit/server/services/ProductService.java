package com.organizit.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.organizit.server.entities.Product;
import com.organizit.server.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	public ProductRepository repository;
			
	public List<Product> findAll(){
		return repository.findAll();
	}
	
	public Product findById(Long id) {
		return repository.findById(id).get();
	}
	
}
