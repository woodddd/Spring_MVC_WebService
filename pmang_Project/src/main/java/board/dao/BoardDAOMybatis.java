package board.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import board.bean.CommentDTO;
import board.bean.ItemDTO;
import board.bean.NoticeDTO;
import board.bean.QnaDTO;
import board.bean.ReviewDTO;
import board.bean.SearchDTO;
import board.bean.WishlistDTO;
import member.bean.SellerDTO;


@Transactional
@Repository
public class BoardDAOMybatis implements BoardDAO {

	@Autowired
	private SqlSession sqlSession;

	@Override
	public ItemDTO getItem(int item_seq) {
		return sqlSession.selectOne("boardSQL.getItem", item_seq);
	}

	@Override
	public List<CommentDTO> getCommentList(int item_seq) {
		return sqlSession.selectList("boardSQL.getCommentList", item_seq);
	}

	@Override
	public void itemComment(Map<String, Object> map) {
		sqlSession.insert("boardSQL.itemComment", map);
	}

	@Override
	public void commentDelete(String comment_seq) {
		sqlSession.delete("boardSQL.commentDelete", comment_seq);
	}

	@Override
	public CommentDTO getAComment(String comment_seq) {
		return sqlSession.selectOne("boardSQL.getAComment", comment_seq);
	}


	@Override
	public List<WishlistDTO> getWishlist(int item_seq) {
		return sqlSession.selectList("boardSQL.getWishlist", item_seq);
	}

	@Override
	public void pushLike(Map<String, Object> map) {
		sqlSession.insert("boardSQL.pushLike", map);

	}

	@Override
	public void cancelLike(Map<String, Object> map) {
		sqlSession.delete("boardSQL.cancelLike", map);
	}

	@Override
	public void reportUser(Map<String, Object> map) {
		sqlSession.insert("boardSQL.reportUser", map);
	}

	@Override
	public void countReport(String userId) {
		sqlSession.insert("boardSQL.countReport", userId);
	}

	@Override
	public String getUserId(Map<String, Object> map) {
		return sqlSession.selectOne("boardSQL.getUserId", map);
	}

	// ------------------------------ItemBoard------------------------------------//

	@Override
	public void itemHitUpdate(int item_seq) {
		sqlSession.selectOne("boardSQL.itemHitUpdate", item_seq);
	}



	@Override
	public List<ItemDTO> getItemBoardList(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getItemBoardList", map);
	}

	
	@Override
	public List<Object> getItemBoardCount(Map<String, Object> map) {
		System.out.println(map.get("category1"));
		System.out.println(map.get("category2"));
		if (map.get("category2") == null) {
			return sqlSession.selectList("boardSQL.getItemBoardCount1", map);
		} else {
			return sqlSession.selectList("boardSQL.getItemBoardCount2", map);
		}

	}
	
	@Override
	public int getEntireItemNum(Map<String, Object> map) {
		return sqlSession.selectOne("boardSQL.getEntireItemNum", map);

	}

	@Override
	public List<Object> getOrderbyItem(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getOrderbyItem", map);
	}
	
	@Override
	public List<Object> getMainLoc(String userId) {
		return sqlSession.selectList("boardSQL.getMainLoc", userId);
	}
	
	@Override
	public void setMainLoc(String userId, String address) {
		
		List<Map<String,String>> list = sqlSession.selectList("boardSQL.getMainLoc", userId);
		Map<String,String> map = new HashMap<String,String>();
		map.put("userId", userId);
		map.put("addr", address);
		if(list.isEmpty()) {
			sqlSession.insert("boardSQL.setMainLoc", map);
		}else {
			for(Map<String, String> listMap : list) {
				if(!listMap.get("ADDR").equals(address)){
					sqlSession.insert("boardSQL.setMainLoc", map);
				}
			}
		}
		
	}

	public void deleteMainLoc(Map<String, String> map) {
		sqlSession.delete("boardSQL.deleteMainLoc", map);
		
	}
	
	//--------------------------------------------searchBoard------------------------------------------//

	@Override
	public List<Object> indexSearchBoardList(String searchKeyword) {
		return sqlSession.selectList("boardSQL.indexSearchBoardList", searchKeyword);
	}

	@Override
	public List<Object> getCategory1List(String searchKeyword) {
		return sqlSession.selectList("boardSQL.getCategory1List", searchKeyword);
	}

	@Override
	public int getTotalSearchItem(String searchKeyword) {
		return sqlSession.selectOne("boardSQL.getTotalSearchItem", searchKeyword);
	}

	@Override
	public List<ItemDTO> getSearchItemList(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getSearchItemList", map);
	}

	@Override
	public List<Object> getCategory2List(String category1, String searchKeyword) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("category1", category1);
		map.put("searchKeyword", searchKeyword);
		// TODO Auto-generated method stub
		return sqlSession.selectList("boardSQL.getCategory2List", map);
	}

	@Override
	public List<ItemDTO> getSearchItem1List(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getSearchItem1List", map);
	}

	@Override
	public List<Object> getCategory3List(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getCategory3List", map);
	}

	@Override
	public List<ItemDTO> getSearchItem2List(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getSearchItem2List", map);
	}

	@Override
	public List<ItemDTO> getSearchItem3List(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getSearchItem3List", map);
	}

	
	//------------------------------todayItem-----------------------------//
	@Override
	public List<ItemDTO> getIndexBoardList(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getIndexBoardList", map);
	}

	@Override
	public String getTotalItem() {
		return sqlSession.selectOne("boardSQL.getTotalItem");
	}
	
	//--------------------------------hashtagBoard------------------------------------//

	@Override
	public List<Object> hashtagBoardList(String hashtag) {
		return sqlSession.selectList("boardSQL.hashtagBoardList", hashtag);
	}

	@Override
	public List<Object> getHashtagCategory1List(String hashtag) {
		return sqlSession.selectList("boardSQL.getHashtagCategory1List", hashtag);
	}

	@Override
	public int getHashtagTotalSearchItem(String hashtag) {
		return sqlSession.selectOne("boardSQL.getHashtagTotalSearchItem", hashtag);
	}

	@Override
	public List<ItemDTO> getHashtagItemList(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getHashtagItemList", map);
	}

	@Override
	public List<Object> getHashtagCategory2List(String category1, String hashtag) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("category1", category1);
		map.put("hashtag", hashtag);
		return sqlSession.selectList("boardSQL.getHashtagCategory2List", map);
	}

	@Override
	public List<ItemDTO> getHashtagItem1List(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getHashtagItem1List", map);
	}

	@Override
	public List<Object> getHashtagCategory3List(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getHashtagCategory3List", map);
	}

	@Override
	public List<ItemDTO> getHashtagItem2List(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getHashtagItem2List", map);
	}

	@Override
	public List<ItemDTO> getHashtagItem3List(Map<String, Object> map) {
		return sqlSession.selectList("boardSQL.getHashtagItem3List", map);
	}

	
	//검색
	@Override
	public void setSearchKeyword(String keyword, String userid) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("keyword", keyword);
		map.put("userid", userid);
		sqlSession.insert("boardSQL.setSearchKeyword", map);
		
	}

	@Override
	public List<SearchDTO> getSearchKeyword(String userid) {
		return sqlSession.selectList("boardSQL.getSearchKeyword", userid);
	}

	@Override
	public void removeSearch(String keyword, String userid) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("keyword", keyword);
		map.put("userid", userid);
		sqlSession.delete("boardSQL.removeSearch", map);
		
	}

	@Override
	public void searchAllDelete(String userid) {
		sqlSession.delete("boardSQL.searchAllDelete", userid);
		
	}


	//리뷰작성
	@Override
	public void reviewWrite(ReviewDTO reviewDTO) {
		 sqlSession.insert("boardSQL.reviewWrite", reviewDTO);

	}

	@Override
	public List<NoticeDTO> getNoticeList() {
		return sqlSession.selectList("boardSQL.getNoticeList");
	}

	@Override
	public List<WishlistDTO> getMyZzim(String userId) {
		 return sqlSession.selectList("boardSQL.getMyZzim", userId);
	}
	
	@Override
	public void qnaWrite(QnaDTO qnaDTO) {
		sqlSession.insert("boardSQL.qnaWrite",qnaDTO);
		
	}

	@Override
	public List<QnaDTO> getQnaList(String userid) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("boardSQL.getQnaList",userid);
	}

	@Override
	public List<QnaDTO> getQna() {
		// TODO Auto-generated method stub
		return sqlSession.selectList("boardSQL.getQna");
	}

	@Override
	public void qnaReplyWrite(String qna_seq,String qnaContent) {
		Map<String,String> map=new HashMap<String,String>();
		map.put("qna_seq", qna_seq);
		map.put("qnaContent", qnaContent);
		
		sqlSession.update("boardSQL.qnaReplyWrite",map);
		
	}

	@Override
	public ItemDTO getItemInfo(String item_seq) {
		return sqlSession.selectOne("boardSQL.getItemInfo", item_seq);
	}

	@Override
	public SellerDTO getSellerInfo(String userId) {
		return sqlSession.selectOne("boardSQL.getSellerInfo", userId);
	}







}
