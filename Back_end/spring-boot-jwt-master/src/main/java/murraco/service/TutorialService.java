package murraco.service;

import java.util.List;

import murraco.model.Tutorial;

public interface TutorialService {
	
	
	public Tutorial createTutorial(Tutorial tutorial);
	
	public void modifyTutorial(Tutorial tutorial);
	
	public List<Tutorial> getAllTutorial();
	
	public void deleteTutorial(Integer id);
	
	public Tutorial getTutorialById(Integer id);
		
	
	
	

}
