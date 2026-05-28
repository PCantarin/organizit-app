package com.organizit.server.services;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.organizit.server.entities.Product;
import com.organizit.server.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	public ProductRepository repository;

	public List<Product> findAll() {
		return repository.findAll();
	}

	public Product findById(Long id) {
		return repository.findById(id).get();
	}

	public Product addNewProduct(Product product) {
		product.setDateInsert(Instant.now());
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
