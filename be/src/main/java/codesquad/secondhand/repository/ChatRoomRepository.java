package codesquad.secondhand.repository;

import codesquad.secondhand.entity.ChatRoom;
import codesquad.secondhand.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    int countByItem(Item item);

}
