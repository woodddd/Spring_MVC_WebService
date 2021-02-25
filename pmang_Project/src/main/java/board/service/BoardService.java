package board.service;

import java.util.List;
import java.util.Map;

import board.bean.AdminDTO;
import board.bean.BoardPaging;
import board.bean.CommentDTO;
import board.bean.ItemDTO;
import board.bean.NoticeDTO;
import board.bean.QnaDTO;
import board.bean.ReportDTO;
import board.bean.ReviewDTO;
import board.bean.SearchDTO;
import board.bean.WishDTO;
import board.bean.WishlistDTO;
import member.bean.SellerDTO;


public interface BoardService {

	public ItemDTO getItem(int item_seq);

	public List<CommentDTO> getCommentList(int item_seq);
	
	public void itemComment(Map<String, Object> map);
	
	public void commentDelete(String comment_seq);
	
	public CommentDTO getAComment(String comment_seq);
	
	public void itemHitUpdate(int item_seq);
	
	
	
	//------------------------------ItemBoard--------------------------------------------//
	public List<ItemDTO> getItemBoardList(String pg, Map<String, Object> map);
	
	public List<Object> getItemBoardCount(Map<String, Object> map);

	public int getEntireItemNum(Map<String, Object> map);

	public List<Object> getOrderbyItem(String pg, Map<String, Object> map);

	public BoardPaging boardPaging(String pg, Map<String, Object> map);
	
	//------------------------------------------mystore--------------------------------------//


	public void reviewWrite(ReviewDTO reviewDTO);

	public void profileImgModify(SellerDTO sellerDTO);

	public SellerDTO getMystore(String userid);

	public void mystoreHitUpdate(String userid);

	public void mystoreModify(Map<String, String> map);


	public List<ItemDTO> getMystoreItemList(String pg, String userid);

	public List<WishDTO> getMystoreWishList(String pg, String userid);

	public void wishListDelete(Map<String, Object> map);

	public List<ReviewDTO> getMystoreReviewList(String pg, String userid);

	public String getMystoreItemCnt(String userid);

	public String getMystoreWishCnt(String userid);

	public String getMystoreReviewCnt(String userid);

	public List<ItemDTO> getMystoreItemPopularList(String pg, String userid);

	public List<ItemDTO> getMystoreItemLowerPriceList(String pg, String userid);

	public List<ItemDTO> getMystoreItemHighestPriceList(String pg, String userid);

	public List<ItemDTO> getMystoreWishPopularList(String pg, String userid);

	public List<ItemDTO> getMystoreWishHighestPriceList(String pg, String userid);

	public List<ItemDTO> getMystoreWishLowerPriceList(String pg, String userid);

	
	
	//--------------------------searchBoard--------------------------------------------//
	public List<Object> indexSearchBoardList(String searchKeyword);
		
	public List<Object> getCategory1List(String searchKeyword);

	public int getTotalSearchItem(String searchKeyword);

	public List<ItemDTO> getSearchItemList(Map<String, Object> map);

	public BoardPaging boardPaging(String pg, int totalA);

	public List<Object> getCategory2List(String category1, String searchKeyword);

	public List<ItemDTO> getSearchItem1List(Map<String, Object> map);

	public List<Object> getCategory3List(Map<String, Object> map);

	public List<ItemDTO> getSearchItem2List(Map<String, Object> map);

	public List<ItemDTO> getSearchItem3List(Map<String, Object> map);

	public List<ItemDTO> getIndexBoardList(String pg);

	public String getTotalItem();

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

	public List<WishlistDTO> getWishlist(int item_seq);

	public void pushLike(Map<String, Object> map);

	public void cancelLike(Map<String, Object> map);

	public void reportUser(Map<String, Object> map);

	public void countReport(String userId);

	public String getUesrId(Map<String, Object> map);


	public AdminDTO getAdmin();

	public List<ReportDTO> getReportList();

	

	public List<ReportDTO> getReport(String userid);

	public List<String> getReportTarget();

	public void noticeWrite(Map<String, String> map);

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
