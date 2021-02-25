package board.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import board.dao.BoardDAO;
import board.dao.MystoreDAO;
import member.bean.SellerDTO;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardDAO boardDAO;
	@Autowired
	private BoardPaging boardPaging;
	@Autowired
	private MystoreDAO mystoreDAO;
	

	//-------------------------------------------itemView----------------------------------//



	@Override
	public ItemDTO getItem(int item_seq) {
		return boardDAO.getItem(item_seq);
	}


	
	@Override
	public List<CommentDTO> getCommentList(int item_seq) {
		return boardDAO.getCommentList(item_seq);	

	}

	@Override
	public void itemComment(Map<String, Object> map) {
		boardDAO.itemComment(map);
	}

	@Override
	public void commentDelete(String comment_seq) {
		boardDAO.commentDelete(comment_seq);
	}

	@Override
	public CommentDTO getAComment(String comment_seq) {
		return boardDAO.getAComment(comment_seq);
	}

	@Override
	public List<WishlistDTO> getWishlist(int item_seq) {
		return boardDAO.getWishlist(item_seq);
	}

	@Override
	public void pushLike(Map<String, Object> map) {
		boardDAO.pushLike(map);
	}

	@Override
	public void cancelLike(Map<String, Object> map) {
		boardDAO.cancelLike(map);
	}

	@Override
	public void reportUser(Map<String, Object> map) {
		boardDAO.reportUser(map);
	}

	@Override
	public void countReport(String userId) {
		boardDAO.countReport(userId);
	}

	@Override
	public String getUesrId(Map<String, Object> map) {
		return boardDAO.getUserId(map);
	}


	@Override
	public void itemHitUpdate(int item_seq) {
		boardDAO.itemHitUpdate(item_seq);
	}
	// ----------------------------ItemBoard------------------------------------------//

	@Override
	public List<ItemDTO> getItemBoardList(String pg, Map<String, Object> map) {
		// 1페이지당 20개씩
		int endNum = Integer.parseInt(pg) * 20;
		int startNum = endNum - 19;

		map.put("startNum", startNum);
		map.put("endNum", endNum);


		return boardDAO.getItemBoardList(map);
	}

	@Override
	public List<Object> getItemBoardCount(Map<String, Object> map) {
		return boardDAO.getItemBoardCount(map);
	}

	@Override
	public int getEntireItemNum(Map<String, Object> map) {
		return boardDAO.getEntireItemNum(map);
	}

	@Override
	public List<Object> getOrderbyItem(String pg, Map<String, Object> map) {

		
		//1페이지당 20개씩
		int endNum = Integer.parseInt(pg)*20;
		int startNum = endNum-19;
				
		map.put("startNum", startNum);
		map.put("endNum", endNum);
				
		return boardDAO.getOrderbyItem(map);
		
	}

	@Override
	public BoardPaging boardPaging(String pg, Map<String, Object> map) {
		int totalA = boardDAO.getEntireItemNum(map);
		
		boardPaging.setCurrentPage(Integer.parseInt(pg));
		boardPaging.setPageBlock(5);
		boardPaging.setPageSize(20);
		boardPaging.setTotalA(totalA);
		boardPaging.makePagingHTML();
		return boardPaging;
	}
	
	
	@Override
	public List<Object> getMainLoc(String userId) {
		return boardDAO.getMainLoc(userId);
	}
	
	@Override
	public void setMainLoc(String userId, String address) {
		boardDAO.setMainLoc(userId, address);
		
	}
	
	@Override
	public void deleteMainLoc(Map<String, String> map) {
		boardDAO.deleteMainLoc(map);
		
	}

	
	
	
	
	//------------------------------------------------myStore-------------------------------------------//

	@Override
	public void reviewWrite(ReviewDTO reviewDTO) {
		boardDAO.reviewWrite(reviewDTO);
	}

	@Override
	public void profileImgModify(SellerDTO sellerDTO) {
		// TODO Auto-generated method stub
		mystoreDAO.profileImgModify(sellerDTO);
	}

	@Override
	public SellerDTO getMystore(String userid) {

		return mystoreDAO.getMystore(userid);
	}

	@Override
	public void mystoreHitUpdate(String userid) {
		mystoreDAO.mystoreHitUpdate(userid);

	}

	@Override
	public void mystoreModify(Map<String, String> map) {
		mystoreDAO.mystoreModify(map);
	}

	@Override
	public List<ItemDTO> getMystoreItemList(String pg, String userid) {
		// 占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 25占쏙옙占쏙옙
		int endNum = Integer.parseInt(pg) * 25;
		int startNum = endNum - 24;

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);
		// 占쏙옙占쌩울옙 占쌍억옙占쏙옙占쏙옙占�..<String,Object>占쏙옙 占쌕꾸댐옙占쏙옙
		// map.put("userid", session.getAttribute("userid"));

		List<ItemDTO> list = mystoreDAO.getMystoreItemList(map);
		return list;
	}

	@Override
	public List<WishDTO> getMystoreWishList(String pg, String userid) {
		// 占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 6占쏙옙占쏙옙
		int endNum = Integer.parseInt(pg) * 6;
		int startNum = endNum - 5;

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);

		List<WishDTO> list = mystoreDAO.getMystoreWishList(map);
		// System.out.println(list);
		return list;
	}

	@Override
	public void wishListDelete(Map<String, Object> map) {

		mystoreDAO.wishListDelete(map);
	}

	@Override
	public List<ReviewDTO> getMystoreReviewList(String pg, String userid) {

		
		int endNum = Integer.parseInt(pg) * 3;
		int startNum = endNum - 2;

		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);
		
		List<ReviewDTO> list = mystoreDAO.getMystoreReviewList(map);
	
		return list;

	}

	@Override
	public String getMystoreItemCnt(String userid) {

		return mystoreDAO.getMystoreItemCnt(userid);
	}

	@Override
	public String getMystoreWishCnt(String userid) {
		// TODO Auto-generated method stub
		return mystoreDAO.getMystoreWishCnt(userid);
	}

	@Override
	public String getMystoreReviewCnt(String userid) {
		// TODO Auto-generated method stub
		return mystoreDAO.getMystoreReviewCnt(userid);
	}

	@Override
	public List<ItemDTO> getMystoreItemPopularList(String pg, String userid) {
		// 占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 25占쏙옙占쏙옙

		int endNum = Integer.parseInt(pg) * 25;
		int startNum = endNum - 24;

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);
		// 占쏙옙占쌩울옙 占쌍억옙占쏙옙占쏙옙占�..<String,Object>占쏙옙 占쌕꾸댐옙占쏙옙
		// map.put("userid", session.getAttribute("userid"));

		List<ItemDTO> list = mystoreDAO.getMystoreItemPopularList(map);
		return list;
	}

	public List<ItemDTO> getMystoreItemLowerPriceList(String pg, String userid) {
		// 占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 25占쏙옙占쏙옙
		int endNum = Integer.parseInt(pg) * 25;
		int startNum = endNum - 24;

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);
		// 占쏙옙占쌩울옙 占쌍억옙占쏙옙占쏙옙占�..<String,Object>占쏙옙 占쌕꾸댐옙占쏙옙
		// map.put("userid", session.getAttribute("userid"));

		List<ItemDTO> list = mystoreDAO.getMystoreItemLowerPriceList(map);
		return list;
	}

	@Override
	public List<ItemDTO> getMystoreItemHighestPriceList(String pg, String userid) {
		// 占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 25占쏙옙占쏙옙
		int endNum = Integer.parseInt(pg) * 25;
		int startNum = endNum - 24;

		Map<String,Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);
		// 占쏙옙占쌩울옙 占쌍억옙占쏙옙占쏙옙占�..<String,Object>占쏙옙 占쌕꾸댐옙占쏙옙
		// map.put("userid", session.getAttribute("userid"));


		List<ItemDTO> list = mystoreDAO.getMystoreItemHighestPriceList(map);
		return list;
	}

	@Override
	public List<ItemDTO> getMystoreWishPopularList(String pg, String userid) {
		// 占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 6占쏙옙占쏙옙
		int endNum = Integer.parseInt(pg) * 6;
		int startNum = endNum - 5;

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);
		// 占쏙옙占쌩울옙 占쌍억옙占쏙옙占쏙옙占�..<String,Object>占쏙옙 占쌕꾸댐옙占쏙옙
		// map.put("userid", session.getAttribute("userid"));

		List<ItemDTO> list = mystoreDAO.getMystoreWishPopularList(map);
		return list;
	}

	@Override
	public List<ItemDTO> getMystoreWishHighestPriceList(String pg, String userid) {
		// 占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 6占쏙옙占쏙옙
		int endNum = Integer.parseInt(pg) * 6;
		int startNum = endNum - 5;

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);
		// 占쏙옙占쌩울옙 占쌍억옙占쏙옙占쏙옙占�..<String,Object>占쏙옙 占쌕꾸댐옙占쏙옙
		// map.put("userid", session.getAttribute("userid"));
		List<ItemDTO> list = mystoreDAO.getMystoreWishHighestPriceList(map);
		return list;
	}

	@Override
	public List<ItemDTO> getMystoreWishLowerPriceList(String pg, String userid) {
		// 占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙 6占쏙옙占쏙옙
		int endNum = Integer.parseInt(pg) * 6;
		int startNum = endNum - 5;

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		map.put("userid", userid);
		// 占쏙옙占쌩울옙 占쌍억옙占쏙옙占쏙옙占�..<String,Object>占쏙옙 占쌕꾸댐옙占쏙옙
		// map.put("userid", session.getAttribute("userid"));

		List<ItemDTO> list = mystoreDAO.getMystoreWishLowerPriceList(map);
		return list;
	}
	
	
	//---------------------------------todayItem------------------------------------//

	@Override
	public List<ItemDTO> getIndexBoardList(String pg) {
		
		int endNum = Integer.parseInt(pg)*20;
		int startNum = endNum-19;
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		
		return boardDAO.getIndexBoardList(map);
	}

	@Override
	public String getTotalItem() {
		return boardDAO.getTotalItem();
	}


	//----------------------------------------searchBoard-------------------------------------------//
	
	
		//bestItem 목록
		@Override
		public List<Object> indexSearchBoardList(String searchKeyword) {
			return boardDAO.indexSearchBoardList(searchKeyword);
		}
		
		
		//검색어 전체에 해당하는 아이템개수
		@Override
		public int getTotalSearchItem(String searchKeyword) {
			return boardDAO.getTotalSearchItem(searchKeyword);
		}

		//페이징
		@Override
		public BoardPaging boardPaging(String pg, int totalA) {
			//int totalA = boardDAO.getTotalSearchItem(searchKeyword);
			
			boardPaging.setCurrentPage(Integer.parseInt(pg));
			boardPaging.setPageBlock(5);
			boardPaging.setPageSize(20);
			boardPaging.setTotalA(totalA);
			boardPaging.makePagingHTML();
			
			return boardPaging;
		}
		
		//검색어에 관련된 카테고리 1,2,3 목록
		@Override
		public List<Object> getCategory1List(String searchKeyword) {
			return boardDAO.getCategory1List(searchKeyword);
		}
		
		@Override
		public List<Object> getCategory2List(String category1, String searchKeyword) {
			return boardDAO.getCategory2List(category1, searchKeyword);
		}
		
		@Override
		public List<Object> getCategory3List(Map<String, Object> map) {
			return boardDAO.getCategory3List(map);
		}
		
		
		//카테고리에 해당하는 아이템 출력
		@Override
		public List<ItemDTO> getSearchItemList(Map<String, Object> map) {
			//1페이지당 20개씩
			int pg = Integer.parseInt((String)map.get("pg"));
			int endNum = pg*20;
			int startNum = endNum-19;
							
			map.put("startNum", startNum);
			map.put("endNum", endNum);
			
			return boardDAO.getSearchItemList(map);
		}
		
		@Override
		public List<ItemDTO> getSearchItem1List(Map<String, Object> map) {
			//1페이지당 20개씩
			int pg = Integer.parseInt((String)map.get("pg"));
			int endNum = pg*20;
			int startNum = endNum-19;
									
			map.put("startNum", startNum);
			map.put("endNum", endNum);
					
			return boardDAO.getSearchItem1List(map);
			
		}

		
		@Override
		public List<ItemDTO> getSearchItem2List(Map<String, Object> map) {
			//1페이지당 20개씩
			int pg = Integer.parseInt((String)map.get("pg"));
			int endNum = pg*20;
			int startNum = endNum-19;
											
			map.put("startNum", startNum);
			map.put("endNum", endNum);
							
			return boardDAO.getSearchItem2List(map);
		}
		
		@Override
		public List<ItemDTO> getSearchItem3List(Map<String, Object> map) {
			//1페이지당 20개씩
			int pg = Integer.parseInt((String)map.get("pg"));
			int endNum = pg*20;
			int startNum = endNum-19;
													
			map.put("startNum", startNum);
			map.put("endNum", endNum);
									
			return boardDAO.getSearchItem3List(map);

		}
		
		@Override
		public List<Object> hashtagBoardList(String hashtag) {
			return boardDAO.hashtagBoardList(hashtag);
		}

		@Override
		public List<Object> getHashtagCategory1List(String hashtag) {
			return boardDAO.getHashtagCategory1List(hashtag);
		}

		@Override
		public int getHashtagTotalSearchItem(String hashtag) {
			return boardDAO.getHashtagTotalSearchItem(hashtag);
		}

		@Override
		public List<ItemDTO> getHashtagItemList(Map<String, Object> map) {
			//1페이지당 20개씩
			int pg = Integer.parseInt((String)map.get("pg"));
			int endNum = pg*20;
			int startNum = endNum-19;
													
			map.put("startNum", startNum);
			map.put("endNum", endNum);
			
			return boardDAO.getHashtagItemList(map);
		}

		@Override
		public List<Object> getHashtagCategory2List(String category1, String hashtag) {
			return boardDAO.getHashtagCategory2List(category1, hashtag);
		}

		@Override
		public List<ItemDTO> getHashtagItem1List(Map<String, Object> map) {
			//1페이지당 20개씩
			int pg = Integer.parseInt((String)map.get("pg"));
			int endNum = pg*20;
			int startNum = endNum-19;
													
			map.put("startNum", startNum);
			map.put("endNum", endNum);
			
			
			return boardDAO.getHashtagItem1List(map);
		}

		@Override
		public List<Object> getHashtagCategory3List(Map<String, Object> map) {
			return boardDAO.getHashtagCategory3List(map);
		}

		@Override
		public List<ItemDTO> getHashtagItem2List(Map<String, Object> map) {
			//1페이지당 20개씩
			int pg = Integer.parseInt((String)map.get("pg"));
			int endNum = pg*20;
			int startNum = endNum-19;
													
			map.put("startNum", startNum);
			map.put("endNum", endNum);
			
			
			return boardDAO.getHashtagItem2List(map);
		}

		@Override
		public List<ItemDTO> getHashtagItem3List(Map<String, Object> map) {
			//1페이지당 20개씩
			int pg = Integer.parseInt((String)map.get("pg"));
			int endNum = pg*20;
			int startNum = endNum-19;
													
			map.put("startNum", startNum);
			map.put("endNum", endNum);
			
			
			return boardDAO.getHashtagItem3List(map);
		}

		
		//검색
		@Override
		public void setSearchKeyword(String keyword, String userid) {
			boardDAO.setSearchKeyword(keyword, userid);
			
		}

		@Override
		public List<SearchDTO> getSearchKeyword(String userid) {
			return boardDAO.getSearchKeyword(userid);
		}

		@Override
		public void removeSearch(String keyword, String userid) {
			boardDAO.removeSearch(keyword, userid);
			
		}

		@Override
		public void searchAllDelete(String userid) {
			boardDAO.searchAllDelete(userid);
			
		}
		
		


		

	@Override
	public AdminDTO getAdmin() {
		int userCount=mystoreDAO.getUserCnt();
		int itemCount=mystoreDAO.getItemCnt();
		
		AdminDTO adminDTO=new AdminDTO();
		adminDTO.setItemCount(itemCount);
		adminDTO.setUserCount(userCount);
		
		return adminDTO;
	}

	@Override
	public List<ReportDTO> getReportList() {
		return mystoreDAO.getReportList();
	}

	

	@Override
	public List<ReportDTO> getReport(String userid) {
		return mystoreDAO.getReport(userid);
	}

	@Override
	public List<String> getReportTarget() {
		return mystoreDAO.getReportTarget();
	}

	@Override
	public void noticeWrite(Map<String, String> map) {
		mystoreDAO.noticeWrite(map);
	}


	@Override
	public List<NoticeDTO> getNoticeList() {
		return boardDAO.getNoticeList();
	}
	
	@Override
	public void qnaWrite(QnaDTO qnaDTO) {
		boardDAO.qnaWrite(qnaDTO);

	}



	@Override
	public List<WishlistDTO> getMyZzim(String userId) {
		return boardDAO.getMyZzim(userId);
	}
	
	@Override
	public List<QnaDTO> getQnaList(String userid) {
		return boardDAO.getQnaList(userid);
	}



	@Override
	public List<QnaDTO> getQna() {
		return boardDAO.getQna();
	}



	@Override
	public void qnaReplyWrite(String qna_seq,String qnaContent) {
		boardDAO.qnaReplyWrite(qna_seq,qnaContent);
	}



	@Override
	public ItemDTO getItemInfo(String item_seq) {
		return boardDAO.getItemInfo(item_seq);
	}




	@Override
	public SellerDTO getSellerInfo(String userId) {
		return boardDAO.getSellerInfo(userId);
	}



	
}

