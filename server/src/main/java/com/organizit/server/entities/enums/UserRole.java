package com.organizit.server.entities.enums;

public enum UserRole {
	
	USER("user"),
	ADMIN("admin");
	
	private String role;
	
	private UserRole(String role){
		this.role = role;
	}

	public String getRole() {
		return role;
	}
	
}
