package talk.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import board.bean.ItemDTO;
import member.bean.SellerDTO;
import talk.bean.MessageDTO;
import talk.bean.TalkRoomDTO;
import talk.dao.TalkDAO;

@Service
public class TalkServiceImple implements TalkService {
	@Autowired
	private TalkDAO talkDAO;
	
	@Override
	public TalkRoomDTO isRoom(TalkRoomDTO talkRoomDTO) {
		return talkDAO.isRoom(talkRoomDTO);
	}
	
	@Override
	public void createRoom(TalkRoomDTO talkRoomDTO) {
		talkDAO.createRoom(talkRoomDTO);
	}

	@Override
	public void insertMessage(MessageDTO messageDTO) {
		talkDAO.insertMessage(messageDTO);
	}


	@Override
	public ItemDTO getItem(int item_seq) {
		return talkDAO.getItem(item_seq);
	}

	@Override
	public SellerDTO getSeller(String partner_userId) {
		return talkDAO.getSeller(partner_userId);
	}

	
	@Override
	public List<TalkRoomDTO> getRoomList(String userId) {
		return talkDAO.getRoomList(userId);
	}

	@Override
	public MessageDTO getLastMessage(String userId, int talkRoom_seq) {
		return talkDAO.getLastMessage(userId, talkRoom_seq);
	}

	@Override
	public List<MessageDTO> getMessage(Map<String, String> userMap) {
		return talkDAO.getMessage(userMap);
	}

	@Override
	public String getReceiver_read_time(String sender_user_id, String receiver_user_id) {
		//receiver_user의 on/off_line 확인 read_time = null(on_line) read_time != null (off_line)
		if(talkDAO.getReceiver_read_time(sender_user_id, receiver_user_id) == null){
			return "on_line";
		}else {
			return "off_line";			
		}
	}
	
	@Override
	public int getUnread_count(int talkRoom_seq) {
		return talkDAO.getUnread_count(talkRoom_seq);
	}
	
	@Override
	public void setOpen(Object userId, Object talkRoom_seq) {
		talkDAO.setOpen(userId, talkRoom_seq);
	}

	@Override
	public void setClose(Object userId, Object talkRoom_seq) {
		talkDAO.setClose(userId, talkRoom_seq);
	}

	@Override
	public void getOut(String userId, String partner_userId) {
		talkDAO.getOut(userId, partner_userId);
	}

	@Override
	public Map<String, Integer> getReviewStamp() {
		return talkDAO.getReviewStamp();
	}

	@Override
	public int getItemCount(String userId) {
		return talkDAO.getItemCount(userId);
	}

	@Override
	public int getSalesCount(String userId) {
		return talkDAO.getSalesCount(userId);
	}

	@Override
	public void itemSold(String item_seq) {
		talkDAO.itemSold(item_seq);
	}

	@Override
	public String getItemState(String item_seq) {
		return talkDAO.getItemState(item_seq);
	}

	@Override
	public String sellCheck(int item_seq) {
		return talkDAO.sellCheck(item_seq);
	}

	@Override
	public void updateItemSeq(TalkRoomDTO talkRoomDTO) {
		talkDAO.updateItemSeq(talkRoomDTO);
	}
	
}
