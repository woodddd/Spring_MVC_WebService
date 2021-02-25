package seller.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import seller.bean.SellerManagementDTO;

@Transactional
@Repository
public class SellerManagementDAOMybatis implements SellerManagementDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<SellerManagementDTO> getSellerManagementList(Map<String, Object> map) {
		return sqlSession.selectList("sellerManagementSQL.getSellerManagementList", map);
	}

	@Override
	public int getSellerManagementTotalA(String userid) {
		return sqlSession.selectOne("sellerManagementSQL.getSellerManagementTotalA", userid);
	}

	@Override
	public void sellerManagementDelete(int item_seq) {
		sqlSession.delete("sellerManagementSQL.sellerManagementDelete", item_seq);
	}

	@Override
	public void sellerModify(Map<String, String> map) {
		sqlSession.update("sellerManagementSQL.sellerModify", map);		
	}

	@Override
	public int getManagementSearchTotalA(Map<String, String> map) {
		return sqlSession.selectOne("sellerManagementSQL.getSellerManagementTotalA", map);
	}

	@Override
	public List<SellerManagementDTO> getsellerManagementSearch(Map<String, String> map) {
		return sqlSession.selectList("sellerManagementSQL.getsellerManagementSearch", map);
	}

	@Override
	public void sellerLogtimeUpdate(int item_seq) {
		sqlSession.update("sellerManagementSQL.sellerLogtimeUpdate", item_seq);		
	}

	@Override
	public void itemstateChange(Map<String, String> map) {
		sqlSession.update("sellerManagementSQL.itemstateChange", map);
	}

}
