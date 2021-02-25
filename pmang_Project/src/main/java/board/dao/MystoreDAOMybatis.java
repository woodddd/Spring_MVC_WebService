package board.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import board.bean.ItemDTO;
import board.bean.ReviewDTO;
import board.bean.WishDTO;
import member.bean.SellerDTO;
import board.bean.ReportDTO;


@Transactional
@Repository
public class MystoreDAOMybatis implements MystoreDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public void profileImgModify(SellerDTO sellerDTO) {
		sqlSession.update("mystoreSQL.profileImgModify", sellerDTO);

	}

	@Override
	public SellerDTO getMystore(String userid) {
		
		return sqlSession.selectOne("mystoreSQL.getMystore",userid);
	}

	@Override
	public void mystoreHitUpdate(String userid) {
		sqlSession.update("mystoreSQL.mystoreHitUpdate",userid);
		
	}

	@Override
	public void mystoreModify(Map<String, String> map) {
		sqlSession.update("mystoreSQL.mystoreModify",map);
	}

	@Override
	public List<ItemDTO> getMystoreItemList(Map<String, Object> map) {
		return sqlSession.selectList("mystoreSQL.getMystoreItemList",map);
	}

	@Override
	public List<WishDTO> getMystoreWishList(Map<String, Object> map) {
		return sqlSession.selectList("mystoreSQL.getMystoreWishList",map);
		
	}

	@Override
	public void wishListDelete(Map<String, Object> map) {
		sqlSession.delete("mystoreSQL.wishListDelete",map);
	}

	@Override
	public List<ReviewDTO> getMystoreReviewList(Map<String, Object> map) {
		return sqlSession.selectList("mystoreSQL.getMystoreReviewList",map);
	}

	@Override
	public String getMystoreItemCnt(String userid) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("mystoreSQL.getMystoreItemCnt",userid);
	}

	@Override
	public String getMystoreWishCnt(String userid) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("mystoreSQL.getMystoreWishCnt",userid);
	}

	@Override
	public String getMystoreReviewCnt(String userid) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("mystoreSQL.getMystoreReviewCnt",userid);
	}

	@Override
	public List<ItemDTO> getMystoreItemPopularList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("mystoreSQL.getMystoreItemPopularList",map);
	}

	@Override
	public List<ItemDTO> getMystoreItemLowerPriceList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("mystoreSQL.getMystoreItemlowerPriceList",map);
	}

	@Override
	public List<ItemDTO> getMystoreItemHighestPriceList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("mystoreSQL.getMystoreItemHighestPriceList",map);
	}

	@Override
	public List<ItemDTO> getMystoreWishPopularList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("mystoreSQL.getMystoreWishPopularList",map);
	}

	@Override
	public List<ItemDTO> getMystoreWishHighestPriceList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("mystoreSQL.getMystoreWishHighestPriceList",map);
	}

	@Override
	public List<ItemDTO> getMystoreWishLowerPriceList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("mystoreSQL.getMystoreWishLowerPriceList",map);
	}

	@Override
	public int getUserCnt() {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("mystoreSQL.getUserCnt");
	}

	@Override
	public int getItemCnt() {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("mystoreSQL.getItemCnt");
	}

	@Override
	public List<ReportDTO> getReportList() {
		// TODO Auto-generated method stub
		return sqlSession.selectList("mystoreSQL.getReportList");
	}

	@Override
	public int getTotalA() {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("mystoreSQL.getTotalA");
	}

	@Override
	public List<ReportDTO> getReport(String userid) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("mystoreSQL.getReport",userid);
	}

	@Override
	public List<String> getReportTarget() {
		// TODO Auto-generated method stub
		return sqlSession.selectList("mystoreSQL.getReportTarget");
	}

	@Override
	public void noticeWrite(Map<String, String> map) {
		sqlSession.insert("mystoreSQL.noticeWrite",map);
	}

	
	//상품등록 -> insert!
	@Override
	public void insertSeller(String userId) {
		
		SellerDTO sellerDTO = sqlSession.selectOne("mystoreSQL.getMystore", userId);
		
		if(sellerDTO == null) {
			sqlSession.insert("mystoreSQL.insertSeller", userId);
		}
	}
}
