package com.organizit.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.organizit.server.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

	UserDetails findByLogin(String login);
	
	public List<User> findByActiveTrue();
	
}
