package murraco.ServiceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import murraco.model.Tutorial;
import murraco.repository.Tutorialrepository;

import murraco.service.TutorialService;
@Service
@RequiredArgsConstructor
public class TutorialServiceImpl implements TutorialService {
	
	
	private final Tutorialrepository tutorialRepository;

	@Override
	public Tutorial createTutorial(Tutorial tutorial) {
		Tutorial newtutorial = tutorialRepository.save(tutorial);
		return newtutorial;
	}

	@Override
	public void modifyTutorial(Tutorial tutorial) {
		Tutorial newtutorial = tutorialRepository.getById(tutorial.getId());
		newtutorial.setTitle(tutorial.getTitle());
		newtutorial.setContent(tutorial.getContent());
		newtutorial.setDetails(tutorial.getDetails());
		newtutorial.setPath(tutorial.getPath());
		tutorialRepository.save(newtutorial);
		
	}

	@Override
	public List<Tutorial> getAllTutorial() {
		// TODO Auto-generated method stub
		return tutorialRepository.findAll();
	}

	@Override
	public void deleteTutorial(Integer id) {
		tutorialRepository.deleteById(id);
	}

	@Override
	public Tutorial getTutorialById(Integer id) {
		// TODO Auto-generated method stub
		return tutorialRepository.findOneById(id);
	}

	
	

}
