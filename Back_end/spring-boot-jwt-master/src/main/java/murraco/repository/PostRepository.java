package murraco.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import murraco.model.PostUser;






public interface PostRepository extends JpaRepository<PostUser, Integer> {
	
	
	PostUser findOneById(Integer id);

}
