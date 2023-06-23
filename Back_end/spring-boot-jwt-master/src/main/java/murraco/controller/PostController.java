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
import murraco.model.PostUser;
import murraco.service.PostService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/posts")
@Api(tags = "posts")
@RequiredArgsConstructor
public class PostController {
	
	
	private final PostService postService;
	
	
	@PostMapping("/createPost")
	public void createPost( @ApiParam("new Post") @RequestBody PostUser post) {
		postService.createPost(post);
	}
	
	@GetMapping("/getAllPosts")
	public List<PostUser> getAllPost() {
		return postService.getAllPost();
	}

	@DeleteMapping("/deletePost/{id}")
	public void deletePost(@PathVariable Integer id) {
		postService.deletePost(id);
	}
	
	@GetMapping("/getPostById/{id}")
	public PostUser getPostById(@PathVariable Integer id) {
		return postService.getPostById(id);
	}
	
	@PostMapping("/acceptPost/{id}")
	public void acceptPost(@PathVariable Integer id) {
		postService.acceptPost(id);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
