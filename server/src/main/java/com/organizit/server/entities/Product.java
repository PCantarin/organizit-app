package com.organizit.server.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_tb")
public class Product implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private Integer assetNumber;
	private String description;
	private Instant dateInsert;
	private Integer quantity;
	
	@JsonIgnore
	@OneToMany(mappedBy = "product")
	private List<Movement> movements = new ArrayList<>();

	public Product() {
	}

	public Product(Long id, String name, Integer assetNumber, String description, Instant dateInsert, Integer quantity) {
		super();
		this.id = id;
		this.name = name;
		this.assetNumber = assetNumber;
		this.description = description;
		this.dateInsert = dateInsert;
		this.quantity = quantity;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAssetNumber() {
		return assetNumber;
	}

	public void setAssetNumber(Integer assetNumber) {
		this.assetNumber = assetNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Instant getDateInsert() {
		return dateInsert;
	}

	public void setDateInsert(Instant dateInsert) {
		this.dateInsert = dateInsert;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public List<Movement> getMovements(){
		return movements;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		return Objects.equals(id, other.id);
	}

}
