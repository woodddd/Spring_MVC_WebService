package talk.dao;

import java.util.List;
import java.util.Map;

import board.bean.ItemDTO;
import member.bean.SellerDTO;
import talk.bean.MessageDTO;
import talk.bean.TalkRoomDTO;

public interface TalkDAO {

	public TalkRoomDTO isRoom(TalkRoomDTO talkRoomDTO);
	
	public void createRoom(TalkRoomDTO talkRoomDTO);
	
	public void insertMessage(MessageDTO messageDTO);
	
	public ItemDTO getItem(int item_seq);
	
	public SellerDTO getSeller(String partner_userId);
	
	public List<TalkRoomDTO> getRoomList(String userId);

	public MessageDTO getLastMessage(String userId, int talkRoom_seq);

	public List<MessageDTO> getMessage(Map<String, String> userMap);

	public String getReceiver_read_time(String sender_user_id, String receiver_user_id);

	public int getUnread_count(int talkRoom_seq);
	
	public void setOpen(Object userId, Object talkRoom_seq);

	public void setClose(Object userId, Object talkRoom_seq);

	public void getOut(String userId, String partner_userId);

	public Map<String, Integer> getReviewStamp();

	public int getItemCount(String userId);

	public int getSalesCount(String userId);

	public void itemSold(String item_seq);

	public String getItemState(String item_seq);

	public String sellCheck(int item_seq);

	public void updateItemSeq(TalkRoomDTO talkRoomDTO);

}
