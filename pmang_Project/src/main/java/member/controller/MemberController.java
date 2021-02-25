package member.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import board.bean.ItemDTO;
import data.url.Base64Utils;
import member.bean.MemberDTO;
import member.bean.RecentlyDTO;
import member.bean.ZipcodeDTO;
import member.service.MemberService;

@Controller
@RequestMapping(value = "member")
public class MemberController {
	@Autowired
	private MemberService memberService;

    @Autowired
	private MemberService mailsender;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    
	@RequestMapping(value="login", method=RequestMethod.POST)
	@ResponseBody 
	public String login(Model model, HttpSession session, HttpServletRequest request) {
		String userId = request.getParameter("userId");
		String pwd = request.getParameter("pwd");
				
		
		MemberDTO memberDTO = memberService.login(userId);
		
		if(memberDTO == null) {
			return "idFail";
		}
		
		//비밀번호 암호화 후  입력비밀번호와 비교
		if(!passwordEncoder.matches(pwd, memberDTO.getPwd())) {
			return "pwdfail";
		} 

		if(!memberDTO.getEmail_key().equals("Y")) {
			return "authFail";
		}
		
		model.addAttribute("memberDTO", memberDTO);
		session.setAttribute("memUserId", memberDTO.getUserId());
		
		return "success";

	}
	
	
    @RequestMapping(value="loginForm")
    public String loginForm(@RequestParam(value = "code", required = false) String code) throws Exception{
        System.out.println("#########" + code);
        return "/member/loginForm";
    }
    
    @RequestMapping(value="logout", method=RequestMethod.GET)
	public String logout(HttpSession session, Model model) {
		session.invalidate();
		model.addAttribute("display", "/member/logout.jsp");
		return "/index"; 
	}
	
	@RequestMapping(value="writeForm", method=RequestMethod.GET)
	public String notice(Model model) {
		model.addAttribute("display", "/member/writeForm.jsp");
		return "/index";
	}
	
	@RequestMapping(value="write", method=RequestMethod.POST)
	public String write(@ModelAttribute MemberDTO memberDTO, Model model,HttpServletRequest request) throws IOException {
		memberDTO.setPwd(passwordEncoder.encode(memberDTO.getPwd()));
		int su = memberService.write(memberDTO);

		// 인증 메일 보내기 메서드
		mailsender.mailSendWithUserKey(memberDTO.getEmail1(),memberDTO.getEmail2(), memberDTO.getUserId(), request);
		
		model.addAttribute("su", su);
		model.addAttribute("display", "/member/write.jsp");
		return "/index";
	}
	
	
	@RequestMapping(value="/checkId", 
			produces = "application/String;charset=UTF-8",
			method=RequestMethod.POST)
	public @ResponseBody String checkId(String userId) {
		String result = memberService.checkId(userId);
		return result;
		
	}
	
	@RequestMapping(value="checkPost", method=RequestMethod.GET)
	public String checkPost() {
		return "/member/checkPost";
	}
	
	@RequestMapping(value="checkPostSearch", method=RequestMethod.POST)
	public ModelAndView checkPostSearch(@RequestParam Map<String, String> map) {
		List<ZipcodeDTO> list = memberService.checkPostSearch(map);
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// e-mail 인증 컨트롤러
	@RequestMapping(value = "regSuccess", method = RequestMethod.GET)
	public String regSuccess(@RequestParam("userId") String userId, @RequestParam("email_key") String key) {

		mailsender.regSuccess(userId, key); // mailsender의 경우 @Autowired
		
		return "/member/regSuccess";
	}
	
	// kakao Login
	@RequestMapping(value="kakaoLogin", method=RequestMethod.POST)
	@ResponseBody 
	public String kakaoLogin(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
		return memberService.kakaoLogin(memberDTO, session);
		
	}
	
	//id 찾기
	@RequestMapping(value="findId", method=RequestMethod.POST)
	@ResponseBody 
	public String findId(@ModelAttribute MemberDTO memberDTO) {
		return memberService.findId(memberDTO);
		
	}
	
	//pwd 찾기
	@RequestMapping(value="findPwd", method=RequestMethod.POST)
	@ResponseBody 
	public String findPwd(@ModelAttribute MemberDTO memberDTO) {
		return memberService.findPwd(memberDTO);

		
	}
	
	@RequestMapping(value="modifyForm", method=RequestMethod.GET)
	public String modifyForm(HttpSession session, Model model) {
		String userId = (String) session.getAttribute("memUserId");
		MemberDTO memberDTO = memberService.getMember(userId); 
		
		model.addAttribute("memberDTO", memberDTO); 
		model.addAttribute("display", "/member/modifyForm.jsp");
		return "/index";
		
	}
	
	@RequestMapping(value="modify", method=RequestMethod.POST)
	@ResponseBody
	public void modify(@ModelAttribute MemberDTO memberDTO) {
		memberDTO.setPwd(passwordEncoder.encode(memberDTO.getPwd()));
		memberService.modify(memberDTO);
	}
	
	//아이디찾기 폼
	@RequestMapping(value="searchId", method=RequestMethod.GET)
	public String searchId(Model model) {
		model.addAttribute("display", "/member/searchId.jsp");
		return "/index";
	}
	
	//비밀번호찾기 폼
	@RequestMapping(value="searchPw", method=RequestMethod.GET)
	public String searchPw(Model model) {
		model.addAttribute("display", "/member/searchPw.jsp");
		return "/index";
	}
	
	@RequestMapping(value="deleteId", method=RequestMethod.POST)
	@ResponseBody
	public void deleteId(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
		memberService.deleteId(memberDTO, session);
	}
	
	
	
	//------------------------------------seller------------------------------------------------------//
	
	@RequestMapping(value="sellerWriteForm", method=RequestMethod.GET)
	public String sellerWriteForm(Model model) {
		model.addAttribute("display", "/pm_sellerWriteForm/sellerWriteForm.jsp");
		return "/index";
	}
		
	@RequestMapping(value="sellerWrite", method=RequestMethod.POST)
	@ResponseBody
	public void sellerWrite(@ModelAttribute ItemDTO itemDTO, HttpSession session, HttpServletRequest request, @RequestParam("img1url") String img1url, @RequestParam(value="img2url") String img2url, @RequestParam(value="img3url") String img3url) {
		//String filePath ="http://localhost:8080/pmang/storage";
		System.out.println(itemDTO.getItem_location());//null
		System.out.println(session.getAttribute("memUserId"));
		
		if(itemDTO.getItem_location().length() == 0) {
			itemDTO.setItem_location("위치 정보 없음.");
		}
		
		String img1 = itemDTO.getImg1().replaceAll(" ","");
		itemDTO.setImg1(img1);
		System.out.println(img1);
		if(itemDTO.getImg2() != null) {
			String img2 = itemDTO.getImg2().replaceAll(" ","");
			itemDTO.setImg2(img2);
		}
		if(itemDTO.getImg3() != null) {
			String img3 = itemDTO.getImg3().replaceAll(" ","");
			itemDTO.setImg2(img3);		
		}
		
		System.out.println(itemDTO.getItem_location());
							
		String filePath = "C:\\git_home\\project\\Pmang\\pmang_Project\\src\\main\\webapp\\storage";
		//C:\\Programmer\\project\\Pmang\\pmang_Project\\src\\main\\webapp\\storage
		//D:\git_home\Pmang\.metadata\.plugins\org.eclipse.wst.server.core\tmp1\wtpwebapps\pmang_Project\storage;
		//System.out.println(filePath);
		
		/*
		 * URL resource = ClassLoader.getSystemClassLoader().getResource();
		 * "http:/localhost:8080/pmang/storage"); String path = resource.getPath();
		 * System.out.println(path);
		 */
		
		//ServletContext sc = request.getSession().getServletContext();
		//String realPath = request.getServletPath();
		//System.out.println(realPath);
		
		UUID uuid = UUID.randomUUID(); //이미지 이름 중복되지 못하게!
		

		try {
			byte[] in1 = Base64Utils.decodeBase64ToBytes(img1url);
			File file1 = new File(filePath, uuid.toString()+"_"+itemDTO.getImg1());
			FileCopyUtils.copy(in1, new FileOutputStream(file1));
			itemDTO.setImg1(uuid.toString()+"_"+itemDTO.getImg1());

			byte[] in2 = null;
			byte[] in3 = null;
			if (!img2url.equals("undefined")) {
				in2 = Base64Utils.decodeBase64ToBytes(img2url);
				File file2 = new File(filePath, uuid.toString()+"_"+itemDTO.getImg2());
				FileCopyUtils.copy(in2, new FileOutputStream(file2));
				itemDTO.setImg2(uuid.toString()+"_"+itemDTO.getImg2());
			}

			if (!img3url.equals("undefined")) {
				in3 = Base64Utils.decodeBase64ToBytes(img3url);
				File file3 = new File(filePath, uuid.toString()+"_"+itemDTO.getImg3());
				FileCopyUtils.copy(in3, new FileOutputStream(file3));
				itemDTO.setImg3(uuid.toString()+"_"+itemDTO.getImg3());
			}
			

			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
			String userId = (String) session.getAttribute("memUserId");
			String location = itemDTO.getItem_location();
			
			itemDTO.setUserId(userId);
			
			
			//seller-insert해주기
			//memberService.insertSeller(userId);			
			//최근지역 넣어주기
			
			if(itemDTO.getItem_location() != "위치 정보 없음.") {
				memberService.insertRecentlyLoc(userId, location);
			}
			
			//DB
			memberService.sellerWrite(itemDTO);
		
	}
		
	@RequestMapping(value="searchlocation", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView searchlocation(@RequestParam String address) {
		List<ZipcodeDTO> zipcodeList = memberService.searchlocation(address);
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		mav.addObject("list", zipcodeList);
		
		return mav;
	}
	
	@RequestMapping(value="getSellerLocation", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getSellerLocation(@RequestParam String userId, HttpServletResponse response) {
		String location = memberService.getSellerLocation(userId);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("location", location);
		mav.setViewName("jsonView");
		
		
		return mav;
	}
	
	@RequestMapping(value="getRecentlyLoc", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getRecentlyLoc(HttpSession session) {
		String userId = (String) session.getAttribute("memUserId");
		
		List<RecentlyDTO> list = memberService.getRecentlyLoc(userId);
		
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		
		
		return mav;
	}
	
	@RequestMapping(value="deleteRecentlyLoc", method=RequestMethod.POST)
	@ResponseBody
	public void delectRecentlyLoc(@RequestParam String address, HttpSession session) {
		String userId = (String) session.getAttribute("memUserId");
		memberService.deleteRecentlyLoc(userId, address);
		
		
	}


	// -----------------admin
	@RequestMapping(value = "adminUserDeleteForm", method = RequestMethod.GET)
	public String adminUserDelete() {
		return "/pm_admin/adminUserDeleteForm";
	}

	@RequestMapping(value = "adminUserDeleteSearch", method = RequestMethod.POST)
	@ResponseBody
	public String adminUserDeleteSearch(@RequestParam String userid) {
		//System.out.println(userid);
		String resultId = memberService.adminUserDeleteSearch(userid);
		//System.out.println(resultId);
		return resultId;
	}

	@RequestMapping(value = "adminUserDelete", method = RequestMethod.POST)
	@ResponseBody
	public void adminUserDelete(@RequestParam String userid) {
		memberService.adminUserDelete(userid);
	}
	
	@RequestMapping(value="mainLoc", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView mainLoc(@RequestParam Map<String, String> map) {
		List<ZipcodeDTO> list = memberService.mainLoc(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		
		
		return mav;
		
	}
	
	
	
}