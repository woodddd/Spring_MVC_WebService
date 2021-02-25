package talk.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TalkRoomDTO { //방정보
	private int talkRoom_seq;//톡방 seq DB에서 생성 
	private String userId;//session 아이디
	private String partner_userId;//상대방 아이디(상품키로 가져온 판매자아이디)
	private int item_seq;//판매 seq
	private int notification_status;//알림여부 1-알림허용 ,0-알림불가
}


