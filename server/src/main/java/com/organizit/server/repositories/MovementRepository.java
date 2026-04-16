package com.organizit.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.organizit.server.entities.Movement;

public interface MovementRepository extends JpaRepository<Movement, Long>{

}
