package member.dao;

import java.util.List;
import java.util.Map;

import board.bean.ItemDTO;
import member.bean.MemberDTO;
import member.bean.RecentlyDTO;
import member.bean.ZipcodeDTO;

public interface MemberDAO {
	public MemberDTO login(String userId);

	public int write(MemberDTO memberDTO);

	public MemberDTO checkId(String userId);

	public List<ZipcodeDTO> checkPostSearch(Map<String, String> map);

	public int GetKey(String userId, String user_key);

	public int regSuccess(String userId, String key);

	public int checkKakaoId(String kakaoId);

	public int kakaoWrite(MemberDTO memberDTO);

	public String findId(MemberDTO memberDTO);

	public void updatePwd(MemberDTO resultMember);

	public MemberDTO findPwd(MemberDTO memberDTO);
	
	public MemberDTO getMember(String userId);
	
	public void modify(MemberDTO memberDTO);
	
	//-----------------------seller---------------------------//	
	public void sellerWrite(ItemDTO itemDTO);

	public List<ZipcodeDTO> searchlocation(String address);

	public String adminUserDeleteSearch(String userid);

	public void adminUserDelete(String userid);

	public String getSellerLocation(String userId);

	public void insertRecentlyLoc(String userId, String location);

	public List<RecentlyDTO> getRecentlyLoc(String userId);

	public void deleteRecentlyLoc(String userId, String address);

	public List<ZipcodeDTO> mainLoc(Map<String, String> map);

	public void deleteId(MemberDTO memberDTO);




}
