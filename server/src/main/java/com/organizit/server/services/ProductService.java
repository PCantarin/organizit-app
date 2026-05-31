package com.organizit.server.services;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.organizit.server.entities.Product;
import com.organizit.server.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	public ProductRepository repository;

	public List<Product> findAllActives() {
		return repository.findByActiveTrue();
	}

	public Product findById(Long id) {
		Product obj = repository.findById(id).orElseThrow(() -> new RuntimeException("Object not found."));
		
		if(!obj.getActive()) {
			throw new RuntimeException("Object not found.");
		}
		
		return obj;
	}

	public Product addNewProduct(Product product) {
		product.setDateInsert(Instant.now());
		return repository.save(product);
	}
	
	public void deactivateProductById(Long id) {
		Product product = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		product.setActive(false);
		repository.save(product);
	}
	
	public Product editProduct(Long id, Product product) {
		Product edit = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		
		if(product.getName() != null && !product.getName().isEmpty()) {
			edit.setName(product.getName());
		}
		
		if(product.getDescription() != null && !product.getDescription().isEmpty()) {
			edit.setDescription(product.getDescription());
		}
		
		return repository.save(edit);
	}
	
	public Product addProduct(Long id, Integer quantity) {
		Product product = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		
		if(quantity <= 0) {
			throw new IllegalArgumentException("The quantity must be greater than 0");
		}
		product.setQuantity(product.getQuantity() + quantity);
		
		return repository.save(product);
	}

	public Product removeProduct(Long id, Integer quantity) {
		Product product = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

		if (quantity <= 0) {
			throw new IllegalArgumentException("The quantity must be greater than 0");
		}

		if (product.getQuantity() < quantity) {
			throw new RuntimeException("Insufficient stock");
		}
		product.setQuantity(product.getQuantity() - quantity);

		return repository.save(product);
	}
}
