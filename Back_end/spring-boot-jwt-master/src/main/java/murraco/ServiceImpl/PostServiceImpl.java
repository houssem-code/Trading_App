package murraco.ServiceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;



import lombok.RequiredArgsConstructor;
import murraco.model.PostUser;

import murraco.repository.PostRepository;
import murraco.service.PostService;
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
	
	private final PostRepository postRepository;
	

	@Override
	public void createPost(PostUser post) {
		 postRepository.save(post);
		

	}

	@Override
	public PostUser getPostById(Integer id) {
		return postRepository.findOneById(id);
	}


	@Override
	public void acceptPost(Integer id) {
		PostUser post = getPostById(id);
		post.setAccepted(1);
		postRepository.save(post);
	}

	@Override
	public void deletePost(Integer id) {
		postRepository.deleteById(id);
	}

	@Override
	public List<PostUser> getAllPost() {
		return postRepository.findAll();

}
}