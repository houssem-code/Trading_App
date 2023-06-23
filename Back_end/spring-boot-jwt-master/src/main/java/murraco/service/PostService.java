package murraco.service;

import java.util.List;

import murraco.model.PostUser;


public interface PostService {
	
	
	public void createPost(PostUser post);
	
	public PostUser getPostById(Integer id);
	
	public void deletePost(Integer id);
	
	public void acceptPost(Integer id);
	
	public List<PostUser> getAllPost();
	
	
}
