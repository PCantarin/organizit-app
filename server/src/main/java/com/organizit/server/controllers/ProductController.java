package com.organizit.server.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.organizit.server.entities.Product;
import com.organizit.server.services.ProductService;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

	@Autowired
	public ProductService service;
	
	@GetMapping
	public ResponseEntity<List<Product>> findAll(){
		return ResponseEntity.ok().body(service.findAllActives());
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Product> findById(@PathVariable Long id){
		Product obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Void> deactivateProductById(@PathVariable Long id){
		service.deactivateProductById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping
	public ResponseEntity<Product> addNewProduct(@RequestBody Product product){
		product = service.addNewProduct(product);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(product.getId()).toUri();
		return ResponseEntity.created(uri).body(product);
	}
	
	@PatchMapping(value = "/{id}/add/{quantity}")
	public ResponseEntity<Product> addProduct(@PathVariable Long id, @PathVariable int quantity){
		Product obj = service.addProduct(id, quantity);
		return ResponseEntity.ok(obj);
	}
	
	@PatchMapping(value = "/{id}/remove/{quantity}")
	public ResponseEntity<Product> removeProduct(@PathVariable Long id, @PathVariable int quantity){
		Product obj = service.removeProduct(id, quantity);
		return ResponseEntity.ok(obj);
	}
}
