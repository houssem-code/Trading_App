package murraco.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import murraco.model.Tutorial;



public interface Tutorialrepository extends JpaRepository<Tutorial, Integer> {
	
	Tutorial findOneById(Integer id);

}
