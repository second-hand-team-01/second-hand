package codesquad.secondhand.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import codesquad.secondhand.entity.ChatRoom;
import codesquad.secondhand.entity.Item;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

	int countByItem(Item item);

}
