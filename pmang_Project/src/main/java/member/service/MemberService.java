package member.service;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import board.bean.ItemDTO;
import member.bean.MemberDTO;
import member.bean.RecentlyDTO;
import member.bean.ZipcodeDTO;

public interface MemberService {

	public MemberDTO login(String userId);

	public int write(MemberDTO memberDTO);

	public String checkId(String userId);

	public List<ZipcodeDTO> checkPostSearch(Map<String, String> map);
	
	public void mailSendWithUserKey(String email1, String email2, String userId, HttpServletRequest request);

	public int regSuccess(String userId, String key);

	public String kakaoLogin(MemberDTO memberDTO, HttpSession session);

	public String findId(MemberDTO memberDTO);

	public String findPwd(MemberDTO memberDTO);
	
	public MemberDTO getMember(String userId);
	
	public void modify(MemberDTO memberDTO);
	
	//-----------------------seller---------------------------//
	public void sellerWrite(ItemDTO itemDTO);


	public List<ZipcodeDTO> searchlocation(String address);


	public String adminUserDeleteSearch(String userid);

	public void adminUserDelete(String userid);

	public String getSellerLocation(String userId);

	public void insertSeller(String userId);

	public void insertRecentlyLoc(String userId, String location);

	public List<RecentlyDTO> getRecentlyLoc(String userId);

	public void deleteRecentlyLoc(String userId, String address);

	public List<ZipcodeDTO> mainLoc(Map<String, String> map);

	public void deleteId(MemberDTO memberDTO, HttpSession session);



}
