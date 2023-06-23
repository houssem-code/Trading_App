package murraco.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import murraco.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>  {

}
