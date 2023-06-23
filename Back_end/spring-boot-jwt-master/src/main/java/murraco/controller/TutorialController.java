package murraco.controller;


import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import murraco.model.Tutorial;
import murraco.service.TutorialService;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/tutorials")
@Api(tags = "tutorials")
@RequiredArgsConstructor
public class TutorialController {
	
	
	private final TutorialService tutorialService;
	
	
	@PostMapping("/createTutorial")
	public Tutorial createTutorial( @ApiParam("new Tutorial") @RequestBody Tutorial tutorial) {
		return tutorialService.createTutorial(tutorial);
	}
	

	@PostMapping("/updateTutorial")
	public void modifyTutorial( @RequestBody Tutorial tutorial) {
		tutorialService.modifyTutorial(tutorial) ;
	}

	@GetMapping("/getAllTutorials")
	public List<Tutorial> getAllTutorial() {
		return tutorialService.getAllTutorial();
	}

	@DeleteMapping("/deleteTutorial/{id}")
	public void deleteTutorial(@PathVariable Integer id) {
		tutorialService.deleteTutorial(id);
	}
	
	@GetMapping("/getTutorialById/{id}")
	public Tutorial getTutorialById(@PathVariable Integer id) {
		return tutorialService.getTutorialById(id);
	}
	
	
	
	


}
