package board.dao;

import java.util.List;
import java.util.Map;

import board.bean.CommentDTO;
import board.bean.ItemDTO;
import board.bean.NoticeDTO;
import board.bean.QnaDTO;
import board.bean.ReviewDTO;
import board.bean.SearchDTO;
import board.bean.WishlistDTO;
import member.bean.SellerDTO;

public interface BoardDAO {


	public ItemDTO getItem(int item_seq);

	public List<CommentDTO> getCommentList(int item_seq);

	public void itemComment(Map<String, Object> map);

	public void commentDelete(String comment_seq);

	public CommentDTO getAComment(String comment_seq);


	public List<WishlistDTO> getWishlist(int item_seq);

	public void pushLike(Map<String, Object> map);
	
	public void itemHitUpdate(int item_seq);
	
	
	//-------------------------------itemBoard----------------------------------------//
	
	
	public List<ItemDTO> getItemBoardList(Map<String, Object> map);

	public List<Object> getItemBoardCount(Map<String, Object> map);

	public int getEntireItemNum(Map<String, Object> map);

	public List<Object> getOrderbyItem(Map<String, Object> map);
	
	//------------------------------searchBoard------------------------------------------//

	public List<Object> indexSearchBoardList(String searchKeyword);

	public List<Object> getCategory1List(String searchKeyword);

	public int getTotalSearchItem(String searchKeyword);

	public List<ItemDTO> getSearchItemList(Map<String, Object> map);

	public List<Object> getCategory2List(String category1, String searchKeyword);

	public List<ItemDTO> getSearchItem1List(Map<String, Object> map);

	public List<Object> getCategory3List(Map<String, Object> map);

	public List<ItemDTO> getSearchItem2List(Map<String, Object> map);

	public List<ItemDTO> getSearchItem3List(Map<String, Object> map);
	
	//-----------------------------todayItem------------------------------------------//

	public List<ItemDTO> getIndexBoardList(Map<String, Object> map);

	public String getTotalItem();
	
	//------------------------hashTagItem-------------------------------------------//

	public List<Object> hashtagBoardList(String hashtag);

	public List<Object> getHashtagCategory1List(String hashtag);

	public int getHashtagTotalSearchItem(String hashtag);

	public List<ItemDTO> getHashtagItemList(Map<String, Object> map);

	public List<Object> getHashtagCategory2List(String category1, String hashtag);

	public List<ItemDTO> getHashtagItem1List(Map<String, Object> map);

	public List<Object> getHashtagCategory3List(Map<String, Object> map);

	public List<ItemDTO> getHashtagItem2List(Map<String, Object> map);

	public List<ItemDTO> getHashtagItem3List(Map<String, Object> map);

	public void setSearchKeyword(String keyword, String userid);

	public List<SearchDTO> getSearchKeyword(String userid);

	public void removeSearch(String keyword, String userid);

	public void searchAllDelete(String userid);




	public void cancelLike(Map<String, Object> map);

	public void reportUser(Map<String, Object> map);

	public void countReport(String userId);

	public String getUserId(Map<String, Object> map);


	public void reviewWrite(ReviewDTO reviewDTO);


	public List<Object> getMainLoc(String userId);

	public void setMainLoc(String userId, String address);

	public void deleteMainLoc(Map<String, String> map);


	public List<NoticeDTO> getNoticeList();

	public List<WishlistDTO> getMyZzim(String userId);

	public void qnaWrite(QnaDTO qnaDTO);

	public List<QnaDTO> getQnaList(String userid);

	public List<QnaDTO> getQna();

	public void qnaReplyWrite(String qna_seq,String qnaContent);

	public ItemDTO getItemInfo(String item_seq);

	public SellerDTO getSellerInfo(String userId);


	



}


