package member.service;

import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import board.bean.ItemDTO;
import board.dao.MystoreDAO;
import member.bean.MemberDTO;
import member.bean.RecentlyDTO;
import member.bean.ZipcodeDTO;
import member.dao.MemberDAO;


@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private MystoreDAO mystoreDAO;
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
    private PasswordEncoder passwordEncoder;
	// 난수를 이용한 키 생성
	private boolean lowerCheck;
	private int size;
	
	@Override
	public MemberDTO login(String userId) {
		MemberDTO memberDTO = memberDAO.login(userId);
		return memberDTO;
	}
	
	@Override
	public int write(MemberDTO memberDTO) {
		return memberDAO.write(memberDTO);
	}
	@Override
	public String checkId(String userId) {
		MemberDTO memberDTO = memberDAO.checkId(userId);
		if(memberDTO == null)
			return "non_exist";
		else
			return "exist";
	}
	@Override
	public List<ZipcodeDTO> checkPostSearch(Map<String, String> map) {
		return memberDAO.checkPostSearch(map);
	}

	// 이메일 난수 만드는 메서드
	private String init() {
		Random ran = new Random();
		StringBuffer sb = new StringBuffer();
		int num = 0;

		do {
			num = ran.nextInt(75) + 48;
			if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
				sb.append((char) num);
			} else {
				continue;
			}

		} while (sb.length() < size);
		if (lowerCheck) {
			return sb.toString().toLowerCase();
		}
		return sb.toString();
	}



	public String getKey(boolean lowerCheck, int size) {
		this.lowerCheck = lowerCheck;
		this.size = size;
		return init();
	}
	@Override
	public void mailSendWithUserKey(String email1, String email2, String userId, HttpServletRequest request) {
		String email = email1+"@"+email2;
		String key = getKey(false, 20);
		memberDAO.GetKey(userId, key);
		MimeMessage mail = mailSender.createMimeMessage();
		String htmlStr = "<h2>안녕하세요 PM :p 피망마켓~ 입니다!</h2><br><br>" 
				+ "<h3>" + userId + "님</h3>" + "<p>인증하기 버튼을 누르시면 로그인을 하실 수 있습니다 : " 
				+ "<a href='http://localhost:8080" + request.getContextPath() + "/member/regSuccess?userId="+ userId +"&email_key="+key+"'>인증하기</a></p>"
				+ "(혹시 잘못 전달된 메일이라면 이 이메일을 무시하셔도 됩니다)";
		try {
			mail.setSubject("[본인인증] PM :p 피망마켓의 인증메일입니다", "utf-8");
			mail.setText(htmlStr, "utf-8", "html");
			mail.addRecipient(RecipientType.TO, new InternetAddress(email));
			
			mailSender.send(mail);
		} catch (MessagingException e) {
			e.printStackTrace();
		}	
		
	}
	@Override
	public int regSuccess(String userId, String key) {
		
		int resultCnt = 0;
		
		resultCnt = memberDAO.regSuccess(userId, key);
		
		if(resultCnt ==  1) {
			insertSeller(userId);
		}
		
		return resultCnt;
		
		
	}
	@Override
	public String kakaoLogin(MemberDTO memberDTO, HttpSession session) {
		// 카카오 회원가입, 로그인
		
		int count = memberDAO.checkKakaoId(memberDTO.getKakaoId());

		//로그인
		if(count > 0) {	
			session.setAttribute("memUserId", memberDTO.getUserId());
			session.setAttribute("memEmail", memberDTO.getEmail1()+"@"+memberDTO.getEmail2());
			return "loginSuccess";
		} else {
		//회원가입	
			int success = memberDAO.kakaoWrite(memberDTO);
			if(success == 1) {
				String userId = memberDTO.getUserId();
				insertSeller(userId);
				session.setAttribute("memUserId", memberDTO.getUserId());
				session.setAttribute("memEmail", memberDTO.getEmail1()+"@"+memberDTO.getEmail2());
			}
			return "JoinSuccess";
		}
		
		
	}

	@Override
	public String findId(MemberDTO memberDTO) {
		String result = memberDAO.findId(memberDTO);
		if(result == null) {
			return "fail";
		} else {
			return result;
		}
	}

	@Override
	public String findPwd(MemberDTO memberDTO) {
		MemberDTO resultMember =  memberDAO.findPwd(memberDTO); 
		if(resultMember == null) return "findfail";
		String email1 = resultMember.getEmail1();
		String email2 = resultMember.getEmail2();
		String email = email1 + "@" + email2;


		String key = getKey(true, 6);
		MimeMessage mail = mailSender.createMimeMessage();
		String htmlStr = "<h2>안녕하세요 PM :p 피망마켓~ 입니다!</h2><br><br>" 
				+ "<h3>" + resultMember.getUserId() + "님</h3>" + "<p>임시비밀번호를 발급해드렸습니다 : "
				+ "<h3>" + "임시비밀번호는: "+key + "</h3>";
			
		try {
			mail.setSubject("[임시비밀번호] PM :p 피망마켓의 임시비밀번호 입니다", "utf-8");
			mail.setText(htmlStr, "utf-8", "html");
			mail.addRecipient(RecipientType.TO, new InternetAddress(email));
			
			mailSender.send(mail);
		} catch (MessagingException e) {
			e.printStackTrace();
			return "fail";
		}
		String newPwd = passwordEncoder.encode(key);
		
		resultMember.setPwd(newPwd);
		memberDAO.updatePwd(resultMember);
		
		return "success";
	}
	
	@Override
	public MemberDTO getMember(String userId) {
		return memberDAO.getMember(userId);
	}
	
	@Override
	public void modify(MemberDTO memberDTO) {
		memberDAO.modify(memberDTO);
		
	}
	
	@Override
	public void deleteId(MemberDTO memberDTO, HttpSession session) {
		memberDAO.deleteId(memberDTO);
		session.invalidate();
		
	}
		

	//-------------------------seller-----------------------------------//
	
	@Override
	public void sellerWrite(ItemDTO itemDTO) {
		
		System.out.println(itemDTO.getItem_location());
		/*
		 * if(itemDTO.getItem_location().equals('')) {
		 * itemDTO.setItem_location("위치 정보 없음"); }
		 */
		
		memberDAO.sellerWrite(itemDTO);
	}


	@Override
	public List<ZipcodeDTO> searchlocation(String address) {
		return memberDAO.searchlocation(address);
	}
	
	@Override
	public String getSellerLocation(String userId) {
		return memberDAO.getSellerLocation(userId);
	}
	
	@Override
	public void insertRecentlyLoc(String userId, String location) {
		memberDAO.insertRecentlyLoc(userId, location);
		
	}
	
	@Override
	public List<RecentlyDTO> getRecentlyLoc(String userId) {
		return memberDAO.getRecentlyLoc(userId);
	}

	@Override
	public void deleteRecentlyLoc(String userId, String address) {
		memberDAO.deleteRecentlyLoc(userId, address);
		
	}


	
	//--------------------------------admin------------------------
	@Override
	public String adminUserDeleteSearch(String userid) {
		String resultId=memberDAO.adminUserDeleteSearch(userid);
		
		return resultId;
	}
	
	//------------------mystore------------------------------------

	@Override
	public void adminUserDelete(String userid) {
		memberDAO.adminUserDelete(userid);
		
	}

	@Override
	public void insertSeller(String userId) {
		mystoreDAO.insertSeller(userId);
		
	}

	@Override
	public List<ZipcodeDTO> mainLoc(Map<String, String> map) {
		return memberDAO.mainLoc(map);
	}



}
