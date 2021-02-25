package member.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import board.bean.ItemDTO;
import member.bean.MemberDTO;
import member.bean.RecentlyDTO;
import member.bean.ZipcodeDTO;

@Repository
@Transactional
public class MemberDAOMybatis implements MemberDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public MemberDTO login(String userId) {
		return sqlSession.selectOne("memberSQL.login", userId);
	}


	@Override
	public int write(MemberDTO memberDTO) {
		return sqlSession.insert("memberSQL.write", memberDTO);
	}

	@Override
	public MemberDTO checkId(String userId) {
		return sqlSession.selectOne("memberSQL.checkId", userId);
	}

	@Override
	public List<ZipcodeDTO> checkPostSearch(Map<String, String> map) {
		return sqlSession.selectList("memberSQL.checkPostSearch", map);
	}

	@Override
	public int GetKey(String userId, String email_key) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userId", userId);
		map.put("email_key", email_key);
		return sqlSession.update("memberSQL.GetKey", map);
		
	}

	@Override
	public int regSuccess(String userId, String email_key) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userId", userId);
		map.put("email_key", email_key);
		return sqlSession.update("memberSQL.regSuccess", map);
	}

	
	@Override
	public int checkKakaoId(String kakaoId) {
		return sqlSession.selectOne("memberSQL.checkKakaoId", kakaoId);
	}
	
	@Override
	public int kakaoWrite(MemberDTO memberDTO) {
		return sqlSession.insert("memberSQL.kakaoWrite", memberDTO);
	}


	@Override
	public String findId(MemberDTO memberDTO) {
		return sqlSession.selectOne("memberSQL.findId", memberDTO);
	}


	@Override
	public void updatePwd(MemberDTO resultMember) {
		sqlSession.update("memberSQL.updatePwd", resultMember);
	}


	@Override
	public MemberDTO findPwd(MemberDTO memberDTO) {
		return sqlSession.selectOne("memberSQL.findPwd", memberDTO);
	}
	
	@Override
	public MemberDTO getMember(String userId) {
		return sqlSession.selectOne("memberSQL.getMember", userId);
	}
	
	@Override
	public void modify(MemberDTO memberDTO) {
		sqlSession.update("memberSQL.modify", memberDTO);
		
	}
	
	@Override
	public void deleteId(MemberDTO memberDTO) {
		sqlSession.delete("memberSQL.deleteId", memberDTO);

	}


	
	
	
	//---------------------------seller----------------------------------------//
	
	@Override
	public List<ZipcodeDTO> searchlocation(String address) {
		List<ZipcodeDTO> list = sqlSession.selectList("memberSQL.searchlocation", address);
		System.out.println(list);
		return sqlSession.selectList("memberSQL.searchlocation", address);
	}

	public void sellerWrite(ItemDTO itemDTO) {
		
		sqlSession.insert("memberSQL.sellerWrite", itemDTO);
	}
	
	@Override
	public String getSellerLocation(String userId) {
		return sqlSession.selectOne("memberSQL.getSellerLocation", userId);
	}
	
	@Override
	public void insertRecentlyLoc(String userId, String location) {
		Map<String, String> insertMap = new HashMap<String, String>();
		insertMap.put("userId", userId);
		insertMap.put("address", location);
		
		List<RecentlyDTO> list = sqlSession.selectList("memberSQL.checkRecentlyLoc", userId);

		if(insertMap.get("address") != null) {
			if(list.isEmpty()) {
				sqlSession.insert("memberSQL.insertRecentlyLoc", insertMap);
			}
			else {
				for(RecentlyDTO dto : list) {
					if(!dto.getAddress().equals(location)) {
						sqlSession.insert("memberSQL.insertRecentlyLoc", insertMap);	
					}
				}
			}	
		}
		
		
	}
	
	@Override
	public List<RecentlyDTO> getRecentlyLoc(String userId) {
		return sqlSession.selectList("memberSQL.checkRecentlyLoc", userId);
	}
	
	@Override
	public void deleteRecentlyLoc(String userId, String address) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userId", userId);
		map.put("address", address);
		
		sqlSession.delete("memberSQL.deleteRecentlyLoc", map);
		
	}
	
	
	//-----------------------------admin
	@Override
	public String adminUserDeleteSearch(String userid) {
		// TODO Auto-generated method stub
		String result=sqlSession.selectOne("memberSQL.adminUserDeleteSearch",userid);
		//System.out.println(result);
		return result;
	}

	@Override
	public void adminUserDelete(String userid) {
		// TODO Auto-generated method stub
		sqlSession.delete("memberSQL.adminUserDelete",userid);
	}


	@Override
	public List<ZipcodeDTO> mainLoc(Map<String, String> map) {
		return sqlSession.selectList("memberSQL.mainLoc", map);
	}




}