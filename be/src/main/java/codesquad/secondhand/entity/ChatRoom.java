package codesquad.secondhand.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "chat_room")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_idx")
    private Long chatRoomIdx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_idx")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_idx")
    private Member member;

}
