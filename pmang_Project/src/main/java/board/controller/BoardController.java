package board.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.CookieValue;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.ModelAttribute;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.servlet.ModelAndView;

import board.bean.AdminDTO;
import board.bean.BoardPaging;
import board.bean.CommentDTO;

import board.service.BoardService;
import data.url.Base64Utils;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import board.bean.BoardPaging;
import board.bean.CommentDTO;
import board.bean.ItemDTO;

import board.bean.WishlistDTO;

import board.bean.NoticeDTO;
import board.bean.QnaDTO;
import board.bean.ReportDTO;

import board.bean.ReviewDTO;
import board.bean.SearchDTO;
import board.bean.WishDTO;

import board.service.BoardService;
import member.bean.SellerDTO;

@Controller
@RequestMapping(value = "board")
public class BoardController {
	@Autowired
	private BoardService boardService;

	// -------------------mystote------------------------

	// 내상점 기본정보
	@RequestMapping(value = "mystore")
	public String mystore(HttpSession session, Model model,@RequestParam String userid) {
		
		//System.out.println(userid);
	
		model.addAttribute("userid",userid);
		model.addAttribute("display", "/pm_mystore/mystore.jsp");
		return "/index";
	}

	// 수정 후 바뀐 내상점 정보를 출력하기 위해 -- 조회수 처리 안해줬음
	@RequestMapping(value = "getMystore", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getMystore(@RequestParam String userid,HttpSession session, @CookieValue(value = "memHit", required = false) Cookie cookie,
			HttpServletResponse response) {
		
		
		//System.out.println("userid :"+userid);
		//System.out.println(session.getAttribute("memUserId"));
		// 조회수 - 새로고침방지
		if (cookie != null) {
			boardService.mystoreHitUpdate(userid);
			cookie.setMaxAge(0);
			response.addCookie(cookie);
		}
		SellerDTO sellerDTO = boardService.getMystore(userid);

		ModelAndView mav = new ModelAndView();
		mav.addObject("sellerDTO", sellerDTO);
		mav.addObject("userid", userid);
		mav.setViewName("jsonView");

		return mav;
	}

	// 내상점 탭메뉴1
	@RequestMapping(value = "mystoreTab1", method = RequestMethod.GET)
	public String mystoreTab1() {

		return "/pm_mystore/tab1";
	}

	// 내상점 탭메뉴2
	@RequestMapping(value = "mystoreTab2", method = RequestMethod.GET)
	public String mystoreTab2() {

		return "/pm_mystore/tab2";
	}

	// 내상점 탭메뉴3
	@RequestMapping(value = "mystoreTab3", method = RequestMethod.GET)
	public String mystoreTab3() {

		return "/pm_mystore/tab3";
	}

	@RequestMapping(value = "mystoreModify", method = RequestMethod.POST)
	@ResponseBody
	public void mystoreModify(@RequestParam String marketname, @RequestParam String marketcontent,HttpSession session) {
		String userid=(String) session.getAttribute("memUserId");
		Map<String, String> map = new HashMap<String, String>();
		map.put("marketname", marketname);
		map.put("pf_content", marketcontent);
		map.put("userid", userid);

		boardService.mystoreModify(map);
	}

	// 프로필 사진 수정
	@RequestMapping(value = "profileImgModify", method = RequestMethod.POST)
	//@ResponseBody
	public String profileImgModify(@ModelAttribute SellerDTO sellerDTO, @RequestParam("img") MultipartFile img,
			Model model,HttpSession session) {
		String filePath = "D:\\git_home\\Pmang\\pmang_Project\\src\\main\\webapp\\storage";
		String fileName = img.getOriginalFilename();
		File file = new File(filePath, fileName);

		// 파일복사
		try {
			FileCopyUtils.copy(img.getInputStream(), new FileOutputStream(file));

		} catch (IOException e) {
			e.printStackTrace();
		}
		String userid=(String) session.getAttribute("memUserId");
		System.out.println("userid : "+userid);
		
		
		sellerDTO.setPf_photo(fileName);
		sellerDTO.setUserid(userid);
		System.out.println(sellerDTO+"");
		// db
		boardService.profileImgModify(sellerDTO);
		model.addAttribute("display", "/pm_mystore/mystore.jsp");
		return "/index";
	}

	// 내상점 상품 탭메뉴 최신순으로 출력(기본)
	@RequestMapping(value = "getMystoreItemList", method = RequestMethod.POST)
	public ModelAndView getMystoreItemList(@RequestParam(required = false, defaultValue = "1") String pg,
			HttpSession session, HttpServletResponse response) {

		// String userid = (String) session.getAttribute("userid");
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함

		List<ItemDTO> list = boardService.getMystoreItemList(pg, userid);

		// 조회수 - 새로고침 방지
		if (session.getAttribute("memUserId") != null) {
			Cookie cookie = new Cookie("memHit", "0");// 생성
			cookie.setMaxAge(30 * 60);// 초 단위 생존기간
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);// 클라이언트에게 보내기
		}

		// 페이징처리
		// MystoreTab1Paging mystoreTab1Paging = boardService.mystoreTab1Paging(pg,
		// userid);

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("userid", userid);
		// mav.addObject("mystoreTab1Paging", mystoreTab1Paging);

		mav.setViewName("jsonView");
		return mav;
	}

	// 내상점 찜 탭메뉴 내가 찜한 최신순으로 출력(기본)
	@RequestMapping(value = "getMystoreWishList", method = RequestMethod.POST)
	public ModelAndView getMystoreWishList(@RequestParam(required = false, defaultValue = "1") String pg,
			HttpSession session, HttpServletResponse response) {
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함
		List<WishDTO> list = boardService.getMystoreWishList(pg, userid);

		// 조회수 - 새로고침 방지
		if (session.getAttribute("memUserId") != null) {
			Cookie cookie = new Cookie("memHit", "0");// 생성
			cookie.setMaxAge(30 * 60);// 초 단위 생존기간
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);// 클라이언트에게 보내기
		}
		// 페이징처리
		// MystoreTab2Paging mystoreTab2Paging = boardService.mystoreTab2Paging(pg,
		// userid);

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("userid", userid);
		// mav.addObject("mystoreTab2Paging", mystoreTab2Paging);
		mav.setViewName("jsonView");
		return mav;

	}

	// 내상점 찜 탭메뉴 항목 삭제
	@RequestMapping(value = "wishListDelete", method = RequestMethod.POST)
	@ResponseBody
	public int wishListDelete(@RequestParam Map<String, Object> map, HttpSession session) {
		String userid = (String) session.getAttribute("memUserId"); // 세션값을 받아야함

		int result = 0;
		int cnt = Integer.parseInt((String) map.get("cnt"));
		String item_seq = (String) map.get("item_seq");
		String[] arr = item_seq.split(",");
		map.put("userid", userid);
		for (int i = 0; i < cnt; i++) {
			int temp = Integer.parseInt((String) arr[i]);
			map.put("item_seq", temp);
			boardService.wishListDelete(map);
			result++;
		}

		return result;
	}

	// 내상점 상점후기 탭메뉴 최신순으로 출력(기본)

	@RequestMapping(value = "getMystoreReviewList", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getMystoreReviewList(@RequestParam(required = false) String pg, HttpSession session,
			HttpServletResponse response) {

		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함

		List<ReviewDTO> list = boardService.getMystoreReviewList(pg, userid);

		// 조회수 - 새로고침 방지
		if (session.getAttribute("memUserId") != null) {
			Cookie cookie = new Cookie("memHit", "0");// 생성
			cookie.setMaxAge(30 * 60);// 초 단위 생존기간
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);// 클라이언트에게 보내기
		}

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("userid", userid);
		mav.setViewName("jsonView");
		return mav;
	}

	// 내상점 상품 탭메뉴 목록 총개수
	@RequestMapping(value = "getMystoreItemCnt", method = RequestMethod.POST)
	@ResponseBody
	public String getMystoreItemCnt(HttpSession session, HttpServletResponse reponse) {
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함

		String result = boardService.getMystoreItemCnt(userid);
		return result;
	}

	// 내상점 찜 탭메뉴 목록 총개수
	@RequestMapping(value = "getMystoreWishCnt", method = RequestMethod.POST)
	@ResponseBody
	public String getMystoreWishCnt(HttpSession session, HttpServletResponse reponse) {
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함

		String result = boardService.getMystoreWishCnt(userid);
		return result;
	}

	// 내상점 상점후기 탭메뉴 목록 총개수
	@RequestMapping(value = "getMystoreReviewCnt", method = RequestMethod.POST)
	@ResponseBody
	public String getMystoreReviewCnt(HttpSession session, HttpServletResponse reponse) {
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함
		String result = boardService.getMystoreReviewCnt(userid);
		return result;
	}

	// 내상점 상점 탭메뉴 인기순 출력
	@RequestMapping(value = "getMystoreItemPopularList", method = RequestMethod.POST)
	public ModelAndView getMystoreItemPopularList(@RequestParam(required = false, defaultValue = "1") String pg,
			HttpSession session, HttpServletResponse response) {

		// 나중에 변경 세션받으면!
		// String userid = (String) session.getAttribute("userid");
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함

		List<ItemDTO> list = boardService.getMystoreItemPopularList(pg, userid);

		// 조회수 - 새로고침 방지
		if (session.getAttribute("memUserId") != null) {
			Cookie cookie = new Cookie("memHit", "0");// 생성
			cookie.setMaxAge(30 * 60);// 초 단위 생존기간
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);// 클라이언트에게 보내기
		}

		// 페이징처리
		// MystoreTab1Paging mystoreTab1Paging = boardService.mystoreTab1Paging(pg,
		// userid);

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("userid", userid);
		// mav.addObject("mystoreTab1Paging", mystoreTab1Paging);

		mav.setViewName("jsonView");
		return mav;
	}

	// 내상점 상점 탭메뉴 저가순 출력
	@RequestMapping(value = "getMystoreItemLowerPriceList", method = RequestMethod.POST)
	public ModelAndView getMystoreItemLowerPriceList(@RequestParam(required = false, defaultValue = "1") String pg,
			HttpSession session, HttpServletResponse response) {

		// 나중에 변경 세션받으면!
		// String userid = (String) session.getAttribute("userid");
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함


		List<ItemDTO> list = boardService.getMystoreItemLowerPriceList(pg, userid);

		// 조회수 - 새로고침 방지
		if (session.getAttribute("memUserId") != null) {
			Cookie cookie = new Cookie("memHit", "0");// 생성
			cookie.setMaxAge(30 * 60);// 초 단위 생존기간
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);// 클라이언트에게 보내기
		}

		// 페이징처리
		// MystoreTab1Paging mystoreTab1Paging = boardService.mystoreTab1Paging(pg,
		// userid);

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("userid", userid);
		// mav.addObject("mystoreTab1Paging", mystoreTab1Paging);

		mav.setViewName("jsonView");
		return mav;
	}

	// 내상점 상점 탭메뉴 고가순출력
	@RequestMapping(value = "getMystoreItemHighestPriceList", method = RequestMethod.POST)
	public ModelAndView getMystoreItemHighestPriceList(@RequestParam(required = false, defaultValue = "1") String pg,
			HttpSession session, HttpServletResponse response) {

		// String userid = (String) session.getAttribute("userid");
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함

		List<ItemDTO> list = boardService.getMystoreItemHighestPriceList(pg, userid);

		// 조회수 - 새로고침 방지
		if (session.getAttribute("memUserId") != null) {
			Cookie cookie = new Cookie("memHit", "0");// 생성
			cookie.setMaxAge(30 * 60);// 초 단위 생존기간
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);// 클라이언트에게 보내기
		}

		// 페이징처리
		// MystoreTab1Paging mystoreTab1Paging = boardService.mystoreTab1Paging(pg,
		// userid);

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("userid", userid);
		// mav.addObject("mystoreTab1Paging", mystoreTab1Paging);

		mav.setViewName("jsonView");
		return mav;
	}

	// 내상점 찜 탭메뉴 인기순출력
	@RequestMapping(value = "getMystoreWishPopularList", method = RequestMethod.POST)
	public ModelAndView getMystoreWishPopularList(@RequestParam(required = false, defaultValue = "1") String pg,
			HttpSession session, HttpServletResponse response) {
		// 나중에 변경 세션받으면!

		// String userid = (String) session.getAttribute("userid");
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함

		List<ItemDTO> list = boardService.getMystoreWishPopularList(pg, userid);

		// 조회수 - 새로고침 방지
		if (session.getAttribute("memUserId") != null) {
			Cookie cookie = new Cookie("memHit", "0");// 생성
			cookie.setMaxAge(30 * 60);// 초 단위 생존기간
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);// 클라이언트에게 보내기
		}

		// 페이징처리
		// MystoreTab1Paging mystoreTab1Paging = boardService.mystoreTab1Paging(pg,
		// userid);

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("userid", userid);
		// mav.addObject("mystoreTab1Paging", mystoreTab1Paging);

		mav.setViewName("jsonView");
		return mav;
	}

	// 내상점 찜 탭메뉴 저가순출력

	@RequestMapping(value = "getMystoreWishLowerPriceList", method = RequestMethod.POST)
	public ModelAndView getMystoreWishLowerPriceList(@RequestParam(required = false, defaultValue = "1") String pg,
			HttpSession session, HttpServletResponse response) {
		// 나중에 변경 세션받으면!

		// String userid = (String) session.getAttribute("userid");
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함

		List<ItemDTO> list = boardService.getMystoreWishLowerPriceList(pg, userid);

		// 조회수 - 새로고침 방지
		if (session.getAttribute("memUserId") != null) {
			Cookie cookie = new Cookie("memHit", "0");// 생성
			cookie.setMaxAge(30 * 60);// 초 단위 생존기간
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);// 클라이언트에게 보내기
		}

		// 페이징처리
		// MystoreTab1Paging mystoreTab1Paging = boardService.mystoreTab1Paging(pg,
		// userid);

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("userid", userid);
		// mav.addObject("mystoreTab1Paging", mystoreTab1Paging);

		mav.setViewName("jsonView");
		return mav;

	}

	// 내상점 찜 탭메뉴 고가순출력
	@RequestMapping(value = "getMystoreWishHighestPriceList", method = RequestMethod.POST)
	public ModelAndView getMystoreWishHighestPriceList(@RequestParam(required = false, defaultValue = "1") String pg,
			HttpSession session, HttpServletResponse response) {
		// 나중에 변경 세션받으면!

		// String userid = (String) session.getAttribute("userid");
		String userid = (String) session.getAttribute("memUserId"); // 세션값 받아야함
		List<ItemDTO> list = boardService.getMystoreWishHighestPriceList(pg, userid);

		// 조회수 - 새로고침 방지
		if (session.getAttribute("memUserId") != null) {
			Cookie cookie = new Cookie("memHit", "0");// 생성
			cookie.setMaxAge(30 * 60);// 초 단위 생존기간
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);// 클라이언트에게 보내기
		}

		// 페이징처리
		// MystoreTab1Paging mystoreTab1Paging = boardService.mystoreTab1Paging(pg,
		// userid);

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("userid", userid);
		// mav.addObject("mystoreTab1Paging", mystoreTab1Paging);

		mav.setViewName("jsonView");
		return mav;
	}

	// -----------------------mystore ---------------------- //

	// -------------------review-------------------
	// 리뷰 작성폼
	@RequestMapping(value = "reviewWriteForm", method = RequestMethod.GET)
	public String reviewWriteForm(/* @RequestParam(required=false) String item_seq, */Model model) {
		
		//String userid=(String) session.getAttribute("memUserId");
		
		//model.addAttribute("memUserId",userid);
		//model.addAttribute("item_seq",item_seq);
		return "/pm_review/reviewWriteForm";
	}

	// 리뷰 작성
	@RequestMapping(value = "reviewWrite", method = RequestMethod.POST)
	@ResponseBody
	public void reviewWrite(@ModelAttribute ReviewDTO reviewDTO, HttpServletRequest request,
			@RequestParam(value="img1url",required=false) String img1url, @RequestParam(value="img2url",required=false) String img2url,
			@RequestParam(value="img3url",required=false) String img3url, HttpSession session) {
		
		String filePath = "D:\\git_home\\Pmang\\pmang_Project\\src\\main\\webapp\\storage";

		String reviewWriter = (String) session.getAttribute("memUserId");// 작성자 아이디 세션으로 넣어야함
		//String reviewWriter="tmddms2292";
		reviewDTO.setReviewWriter(reviewWriter);

		UUID uuid = UUID.randomUUID(); // 중복파일이름방지를 위한 uuid설정

		try {

			byte[] in1 = null;
			byte[] in2 = null;
			byte[] in3 = null;

			if (!img1url.equals("undefined")) {
				in1 = Base64Utils.decodeBase64ToBytes(img1url);
				File file1 = new File(filePath, uuid.toString() + "_" + reviewDTO.getImg1());
				FileCopyUtils.copy(in1, new FileOutputStream(file1));
				reviewDTO.setImg1(uuid.toString() + "_" + reviewDTO.getImg1());
			}
			if (!img2url.equals("undefined")) {
				in2 = Base64Utils.decodeBase64ToBytes(img2url);
				File file2 = new File(filePath, uuid.toString() + "_" + reviewDTO.getImg2());
				FileCopyUtils.copy(in2, new FileOutputStream(file2));
				reviewDTO.setImg2(uuid.toString() + "_" + reviewDTO.getImg2());

			}
			if (!img3url.equals("undefined")) {
				in3 = Base64Utils.decodeBase64ToBytes(img3url);
				File file3 = new File(filePath, uuid.toString() + "_" + reviewDTO.getImg3());
				FileCopyUtils.copy(in3, new FileOutputStream(file3));
				reviewDTO.setImg3(uuid.toString() + "_" + reviewDTO.getImg3());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		// db
		boardService.reviewWrite(reviewDTO);

	}

	// -------------------review------------------- //

	// -------------------itemView----------------------------//


	//공지사항 창 열기
	@RequestMapping(value="notice", method=RequestMethod.GET)
	public String notice(@RequestParam(required=false, defaultValue="0") int tabNo, Model model) {
		
		model.addAttribute("tabNo",tabNo);

		model.addAttribute("display", "/pm_notice/notice.jsp");

		return "/index";
	}

	// 판매글 창 열기
	@RequestMapping(value = "itemView", method = RequestMethod.GET)
	public String itemView(Model model/* @RequestParam(required=false, defaultValue="999") int item_seq */ ) {

		/* model.addAttribute("item_seq", item_seq); */

		model.addAttribute("display", "/pm_itemView/itemView.jsp");
		return "/index";
	}

	// 판매글 정보 DB 읽어오기
	@RequestMapping(value = "getItem", method = RequestMethod.POST)
	public ModelAndView getItem(@RequestParam int item_seq,
			@CookieValue(value = "itemHit", required = false) Cookie cookie, HttpServletResponse response,
			HttpSession session) {
		// 맨 위에 전역변수로 선언하고 Autowired 걸면 안됨. --> 고치면서 본건대 이게 무슨소리인가요..?

		// 조회수 - 새로고침 방지
		if (cookie != null) {
			boardService.itemHitUpdate(item_seq); // 조회수 증가 -->서비스쪽이랑 디비, 매퍼 추가됬음요
			cookie.setMaxAge(0); // 쿠키 삭제
			response.addCookie(cookie); // 쿠키 삭제된걸 클라이언트에게 보내주기.
		}

		ItemDTO itemDTO = boardService.getItem(item_seq);

		ModelAndView mav = new ModelAndView();

		// 임의로 입력한 값 999, click한 상품의 item_seq가 parameter로 들어와야 함.
		// -------------------------------------->해결!

		mav.addObject("itemDTO", itemDTO);
		mav.setViewName("jsonView");

		return mav;

	}

	// 댓글리스트 DB 읽어오기
	@RequestMapping(value = "getCommentList", method = RequestMethod.POST)
	public ModelAndView getCommentList(int item_seq) {

		List<CommentDTO> list = boardService.getCommentList(item_seq);

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");

		return mav;
	}

	// 댓글 생성-------------------------------------->세션에서 받아온 유저 아이디 파라메타로 넣었습니당.
	@RequestMapping(value = "itemComment", method = RequestMethod.POST)
	public void itemComment(int item_seq, @RequestParam String userId, @RequestParam String item_comment) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item_seq", item_seq);
		map.put("item_comment", item_comment);
		// --------------------------------------------------//
		map.put("userId", userId);
		
		SellerDTO sellerDTO = boardService.getSellerInfo(userId);
		System.out.println(sellerDTO);
		if(sellerDTO==null) {
			map.put("pf_photo", "/pmang/image/profileimg.png");
		}else {
			map.put("pf_photo", "/pmang/storage/"+sellerDTO.getPf_photo());

		}
		boardService.itemComment(map); // -->서비스쪽이랑 디비, 메퍼쪽도 바뀌었으니 확인해보세용!

	}

	// 댓글삭제
	@RequestMapping(value = "commentDelete", method = RequestMethod.POST)
	@ResponseBody
	public void commentDelete(@RequestParam String comment_seq) {
		boardService.commentDelete(comment_seq);
	}

	// 댓글 1개 읽어오기 (대댓글용)
	@RequestMapping(value = "getAComment", method = RequestMethod.POST)
	public ModelAndView getAComment(@RequestParam String comment_seq) {

		CommentDTO commentDTO = boardService.getAComment(comment_seq);

		ModelAndView mav = new ModelAndView();
		mav.addObject("commentDTO", commentDTO);
		mav.setViewName("jsonView");

		return mav;
	}

	// 아이템 찜여부 체크
	@RequestMapping(value = "getWishlist", method = RequestMethod.POST)
	public ModelAndView getWishlist(@RequestParam(required = false, defaultValue = "999") int item_seq) {
		List<WishlistDTO> list = boardService.getWishlist(item_seq);

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");

		return mav;
	}

	// 아이템 찜하기
	@RequestMapping(value = "pushLike", method = RequestMethod.POST)
	@ResponseBody
	public void pushLike(@RequestParam int item_seq, @RequestParam String userId) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item_seq", item_seq);
		map.put("userId", userId);
		boardService.pushLike(map);
	}

	// 아이템 찜 해제
	@RequestMapping(value = "cancelLike", method = RequestMethod.POST)
	@ResponseBody
	public void cancelLike(@RequestParam int item_seq, @RequestParam String userId) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("item_seq", item_seq);
		map.put("userId", userId);
		boardService.cancelLike(map);
	}

	@RequestMapping(value = "reportUser", method = RequestMethod.POST)
	@ResponseBody
	public void reportUser(@RequestParam int target_seq, @RequestParam String targetType,
			@RequestParam String reportContent) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("target_seq", target_seq);
		map.put("targetType", targetType);
		String userId = boardService.getUesrId(map);

		map.put("userId", userId);
		map.put("reportContent", reportContent);
		boardService.reportUser(map);
		boardService.countReport(userId);

	}
	
	//------------------------------------itemBoard-------------------------------------//

	@RequestMapping(value="itemBoard", method=RequestMethod.GET)
	public String itemBoard(Model model) {
		model.addAttribute("display", "/pm_itemBoard/itemBoard.jsp");

		return "/index";
	}
	
	@RequestMapping(value="getItemBoardCount", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getItemBoardCount(@RequestParam Map<String, Object> categoryMap) {
		
		List<Object> list = boardService.getItemBoardCount(categoryMap);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("ctgMapList", list);
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	//처음 보여줄 때 리스트
	@RequestMapping(value="getitemBoardList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getitemBoardList(@RequestParam(required=false, defaultValue="1") String pg, @RequestParam(required=false, defaultValue="최신순") String order, @RequestParam Map<String, Object> map, HttpSession session, HttpServletResponse response) {
		System.out.println(map.get("category1"));
		System.out.println(map.get("category2"));
		System.out.println(map.get("category3"));
		System.out.println(map.get("location"));
		
		
		List<ItemDTO> list = boardService.getItemBoardList(pg, map);

		
		//전체 카테고리 수 구하기
		int entireItemNum = boardService.getEntireItemNum(map);
		
		//페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(pg, map);
		
		//조회수 - 새로고침 방지
		if(session.getAttribute("memUserId") != null) {
				Cookie cookie = new Cookie("itemHit", "0");//생성
				cookie.setMaxAge(30*60);//초 단위 생존기간
				response.addCookie(cookie);//클라이언트에게 보내기
		}

		
		

		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("boardPaging", boardPaging);
		mav.addObject("itemBoardList", list);
		mav.addObject("entireItemNum", entireItemNum);
		mav.setViewName("jsonView");

		return mav;
	}

	/*
	 * //최신순, 인기순, 고가순, 저가순...
	 * 
	 * @RequestMapping(value="getOrderbyItem", method=RequestMethod.POST)
	 * 
	 * @ResponseBody public ModelAndView
	 * getOrderbyItem(@RequestParam(required=false, defaultValue="1") String
	 * pg, @RequestParam Map<String, Object> map, HttpSession session,
	 * HttpServletResponse response) {
	 * 
	 * System.out.println(pg); List<Object> list = boardService.getOrderbyItem(pg,
	 * map); int entireItemNum = boardService.getEntireItemNum(map); //페이징 처리
	 * BoardPaging boardPaging = boardService.boardPaging(pg, map);
	 * 
	 * ModelAndView mav = new ModelAndView(); mav.addObject("orderbylist", list);
	 * mav.addObject("entireItemNum", entireItemNum); mav.addObject("pg", pg);
	 * mav.addObject("boardPaging", boardPaging);
	 * 
	 * mav.setViewName("jsonView");
	 * 
	 * return mav;
	 * 
	 * }
	 */
	
	
	
	//searchBoard

	@RequestMapping(value="searchBoard", method=RequestMethod.GET)
	public String searchBoard(Model model) {
		model.addAttribute("display", "/pm_itemBoard/searchBoard.jsp");
		return "/index";
	}
	
	@RequestMapping(value="indexSearchBoard", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView indexSearchBoard(@RequestParam(required=false, defaultValue="1") String pg, @RequestParam String searchKeyword, @RequestParam(required=false, defaultValue="최신순") String order, HttpSession session, HttpServletResponse response, HttpServletRequest request) {
		//System.out.println(searchKeyword);
		List<Object> indexSearchBoardList = boardService.indexSearchBoardList(searchKeyword);
		List<Object> category1List = boardService.getCategory1List(searchKeyword);
		int totalSearchItem = boardService.getTotalSearchItem(searchKeyword);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pg", pg);
		map.put("searchKeyword", searchKeyword);
		map.put("order", order);
		List<ItemDTO> itemList = boardService.getSearchItemList(map);
		
		
		/*
		 * //조회수 - 새로고침 방지 if(session.getAttribute("memUserId") != null) { Cookie[]
		 * cookies = request.getCookies(); if(cookies != null) { for(int i = 0; i<
		 * cookies.length; i++) { if(cookies[i].getName().equals("itemHit")){
		 * cookies[i].setMaxAge(0); } }
		 * 
		 * Cookie cookie = new Cookie("itemHit", "0");//생성 cookie.setMaxAge(30*60);//초
		 * 단위 생존기간 response.addCookie(cookie);//클라이언트에게 보내기 } }
		 */		
		
		//조회수 - 새로고침 방지
		if(session.getAttribute("memUserId") != null) {
				Cookie cookie = new Cookie("itemHit", "0");//생성
				cookie.setMaxAge(30*60);//초 단위 생존기간
				response.addCookie(cookie);//클라이언트에게 보내기
		}
		
		//페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(pg, totalSearchItem);
		
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("bestItemList", indexSearchBoardList);
		mav.addObject("category1List", category1List);
		mav.addObject("totalSearchItem", totalSearchItem);
		mav.addObject("itemList", itemList);
		mav.addObject("boardPaging", boardPaging);
		mav.setViewName("jsonView");

		return mav;

	}

	
	@RequestMapping(value="searchClickCtg1", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView searchClickCtg1(@RequestParam(required=false, defaultValue="1") String pg, @RequestParam String searchKeyword, @RequestParam String category1, @RequestParam(required=false, defaultValue="최신순") String order, HttpSession session, HttpServletResponse response) {

		List<Object> category2List = boardService.getCategory2List(category1, searchKeyword);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pg", pg);
		map.put("searchKeyword", searchKeyword);
		map.put("category1", category1);
		map.put("order", order);
		
		List<ItemDTO> itemList = boardService.getSearchItem1List(map);
		//System.out.println(itemList.size());
		//페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(pg, itemList.size());
		
		

		ModelAndView mav = new ModelAndView();
		mav.addObject("category2List", category2List);
		mav.addObject("itemList", itemList);
		mav.addObject("boardPaging", boardPaging);
		mav.setViewName("jsonView");
			
		

		return mav;
	}
	
	
	@RequestMapping(value="searchClickCtg2", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView searchClickCtg2(@RequestParam(required=false, defaultValue="1") String pg, @RequestParam String searchKeyword, @RequestParam String category2, @RequestParam(required=false, defaultValue="최신순") String order, HttpSession session, HttpServletResponse response) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pg", pg);
		map.put("searchKeyword", searchKeyword);
		map.put("category2", category2);
		map.put("order", order);
		
		List<Object> category3List = boardService.getCategory3List(map);
		List<ItemDTO> itemList = boardService.getSearchItem2List(map);
		
		//페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(pg, itemList.size());
		
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("category3List", category3List);
		mav.addObject("itemList", itemList);
		mav.addObject("boardPaging", boardPaging);
		mav.setViewName("jsonView");
			
		

		return mav;
		
		
	}
	
	@RequestMapping(value="searchClickCtg3", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView searchClickCtg3(@RequestParam(required=false, defaultValue="1") String pg, @RequestParam String searchKeyword, @RequestParam String category2, @RequestParam String category3,  @RequestParam(required=false, defaultValue="최신순") String order, HttpSession session, HttpServletResponse response) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pg", pg);
		map.put("searchKeyword", searchKeyword);
		map.put("category2", category2);
		map.put("category3", category3);
		map.put("order", order);
		
		List<ItemDTO> itemList = boardService.getSearchItem3List(map);

		//페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(pg, itemList.size());
		
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("itemList", itemList);
		mav.addObject("boardPaging", boardPaging);
		mav.setViewName("jsonView");
			
		

		return mav;
		
		
	}
	
	@RequestMapping(value="getMainLoc", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getMainLoc(HttpSession session) {
		
		String userId = (String)session.getAttribute("memUserId");
		
		List<Object> list = boardService.getMainLoc(userId);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		
		return mav;
		
	}
	
	@RequestMapping(value="setMainLoc", method=RequestMethod.POST)
	@ResponseBody
	public void setMainLoc(HttpSession session, @RequestParam String address) {
		String userId = (String)session.getAttribute("memUserId");
		boardService.setMainLoc(userId, address);
	}
	
	@RequestMapping(value="deleteMainLoc", method=RequestMethod.POST)
	@ResponseBody
	public void deleteMainLoc(HttpSession session, @RequestParam String address) {
		String userId = (String)session.getAttribute("memUserId");
		Map<String,String> map = new HashMap<String,String>();
		map.put("userId", userId);
		map.put("addr", address);
		boardService.deleteMainLoc(map);
	}
	
	
	
	//-----------------------------------------todayItem-------------------------------------------//
	@RequestMapping(value="getIndexBoardList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getIndexBoardList(String pg, HttpSession session, HttpServletResponse response, HttpServletRequest request ) {
		System.out.println(pg);
		List<ItemDTO> itemList = boardService.getIndexBoardList(pg);
		
		/*
		 * //전체페이지 String totalItem = boardService.getTotalItem(); int paging =
		 * (Integer.parseInt(totalItem) + 19) / 20; String pagingTotal = ""+paging;
		 */
		
		/*
		 * //조회수 - 새로고침 방지 if(session.getAttribute("memUserId") != null) { Cookie[]
		 * cookies = request.getCookies(); if(cookies != null) { for(int i = 0; i<
		 * cookies.length; i++) { if(cookies[i].getName().equals("itemHit")){
		 * cookies[i].setMaxAge(0); } }
		 * 
		 * Cookie cookie = new Cookie("itemHit", "0");//생성 cookie.setMaxAge(30*60);//초
		 * 단위 생존기간 response.addCookie(cookie);//클라이언트에게 보내기 } }
		 */
		
		//조회수 - 새로고침 방지
		if(session.getAttribute("memUserId") != null) {
				Cookie cookie = new Cookie("itemHit", "0");//생성
				cookie.setMaxAge(30*60);//초 단위 생존기간
				response.addCookie(cookie);//클라이언트에게 보내기
		}
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("itemList", itemList);
		//mav.addObject("pagingTotal", pagingTotal);
		mav.setViewName("jsonView");
		
		return mav;
	}
		
	
	  @RequestMapping(value="getIndexTotalItem", method=RequestMethod.POST)
	  @ResponseBody
	  public String getIndexTotalItem() { 
		  
		  String totalItem =boardService.getTotalItem(); 
		  
		  int paging = (Integer.parseInt(totalItem) + 19)/ 20; 
		  
		  String pagingTotal = ""+paging; 
		  
		  return pagingTotal;
		  
	  }
	 
	
	
	//-----------------------------hashtagBoard-----------------------------------------------------//
	@RequestMapping(value="hashtagBoard", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView hashtagBoard(@RequestParam(required=false, defaultValue="1") String pg, @RequestParam String hashtag, @RequestParam(required=false, defaultValue="최신순") String order, HttpSession session, HttpServletResponse response, HttpServletRequest request) {
		System.out.println(hashtag);
		List<Object> hashtagBoardList = boardService.hashtagBoardList(hashtag);
		List<Object> category1List = boardService.getHashtagCategory1List(hashtag);
		int totalHashtagItem = boardService.getHashtagTotalSearchItem(hashtag);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pg", pg);
		map.put("hashtag", hashtag);
		map.put("order", order);
		List<ItemDTO> itemList = boardService.getHashtagItemList(map);
		
		//페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(pg, totalHashtagItem);
		
		
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("bestItemList", hashtagBoardList);
		mav.addObject("category1List", category1List);
		mav.addObject("totalSearchItem", totalHashtagItem);
		mav.addObject("itemList", itemList);
		mav.addObject("boardPaging", boardPaging);
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@RequestMapping(value="hashtagClickCtg1", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView hashtagClickCtg1(@RequestParam(required=false, defaultValue="1") String pg, @RequestParam String hashtag, @RequestParam String category1, @RequestParam(required=false, defaultValue="최신순") String order, HttpSession session, HttpServletResponse response) {

		List<Object> category2List = boardService.getHashtagCategory2List(category1, hashtag);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pg", pg);
		map.put("hashtag", hashtag);
		map.put("category1", category1);
		map.put("order", order);
		
		List<ItemDTO> itemList = boardService.getHashtagItem1List(map);
		//System.out.println(itemList.size());
		//페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(pg, itemList.size());
		
	
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("category2List", category2List);
		mav.addObject("itemList", itemList);
		mav.addObject("boardPaging", boardPaging);
		mav.setViewName("jsonView");
			
		

		return mav;
	}
	
	
	@RequestMapping(value="hashtagClickCtg2", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView hashtagClickCtg2(@RequestParam(required=false, defaultValue="1") String pg, @RequestParam String hashtag, @RequestParam String category2, @RequestParam(required=false, defaultValue="최신순") String order, HttpSession session, HttpServletResponse response) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pg", pg);
		map.put("hashtag", hashtag);
		map.put("category2", category2);
		map.put("order", order);
		
		List<Object> category3List = boardService.getHashtagCategory3List(map);
		List<ItemDTO> itemList = boardService.getHashtagItem2List(map);
		
		//페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(pg, itemList.size());
		

		
		ModelAndView mav = new ModelAndView();
		mav.addObject("category3List", category3List);
		mav.addObject("itemList", itemList);
		mav.addObject("boardPaging", boardPaging);
		mav.setViewName("jsonView");
			
		

		return mav;
		
		
	}
	
	@RequestMapping(value="hashtagClickCtg3", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView hashtagClickCtg3(@RequestParam(required=false, defaultValue="1") String pg, @RequestParam String hashtag, @RequestParam String category2, @RequestParam String category3,  @RequestParam(required=false, defaultValue="최신순") String order, HttpSession session, HttpServletResponse response) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pg", pg);
		map.put("hashtag", hashtag);
		map.put("category2", category2);
		map.put("category3", category3);
		map.put("order", order);
		
		List<ItemDTO> itemList = boardService.getHashtagItem3List(map);

		//페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(pg, itemList.size());
		

		
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("itemList", itemList);
		mav.addObject("boardPaging", boardPaging);
		mav.setViewName("jsonView");
			
		

		return mav;
		
		
	}
	
	//검색
	@RequestMapping(value="setSearchKeyword", method=RequestMethod.POST)
	@ResponseBody
	public void setSearchKeyword(String keyword, HttpSession session) {
		if(session.getAttribute("memUserId") != null){
			String userid = (String)session.getAttribute("memUserId");
			boardService.setSearchKeyword(keyword, userid);
			System.out.println(keyword);
			System.out.println(userid);
		}
	}
		
	@RequestMapping(value="getSearchKeyword", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getSearchKeyword(HttpSession session) {
		List<SearchDTO> keywordList = null;
		if(session.getAttribute("memUserId") != null){
			String userid = (String)session.getAttribute("memUserId");
			keywordList = boardService.getSearchKeyword(userid);
			System.out.println(keywordList);
			System.out.println(userid);
		}
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("keywordList", keywordList);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="removeSearch", method=RequestMethod.POST)
	@ResponseBody
	public void removeSearch(String keyword, HttpSession session) {
		if(session.getAttribute("memUserId") != null){
			String userid = (String)session.getAttribute("memUserId");
			System.out.println(keyword);
			System.out.println(userid);
			boardService.removeSearch(keyword, userid);
		}
	}
	
	@RequestMapping(value="searchAllDelete", method=RequestMethod.POST)
	@ResponseBody
	public void searchAllDelete(HttpSession session) {
		if(session.getAttribute("memUserId") != null){
			String userid = (String)session.getAttribute("memUserId");
			System.out.println(userid);
			boardService.searchAllDelete(userid);
		}
	}
	

	// ------------------admin

	@RequestMapping(value = "getAdmin", method = RequestMethod.POST)
	public ModelAndView getAdmin() {
		AdminDTO adminDTO = boardService.getAdmin();

		ModelAndView mav = new ModelAndView();
		mav.addObject("adminDTO", adminDTO);
		// mav.addObject("userid", userid);
		mav.setViewName("jsonView");

		return mav;
	}

	// admin 탭메뉴1
	@RequestMapping(value = "adminTab1", method = RequestMethod.GET)
	public String adminTab1() {

		return "/pm_admin/tab1";
	}

	// admin 탭메뉴2
	@RequestMapping(value = "adminTab2", method = RequestMethod.GET)
	public String adminTab2() {

		return "/pm_admin/tab2";
	}

	// admin 탭메뉴3

	@RequestMapping(value = "adminTab3", method = RequestMethod.GET)
	public String adminTab3() {

		return "/pm_admin/tab3";
	}

	// 신고 리스트
	@RequestMapping(value = "getReportList", method = RequestMethod.POST)
	public ModelAndView getReportList() {
		List<ReportDTO> list = boardService.getReportList();

		// System.out.println(list);
		// 페이징 처리
		// ReportPaging reportPaging=boardService.reportPaging(pg);

		ModelAndView mav = new ModelAndView();
		// mav.addObject("pg", pg);
		mav.addObject("list", list);
		// mav.addObject("reportPaging", reportPaging);
		mav.setViewName("jsonView");

		return mav;

	}

	// 신고내역
	@RequestMapping(value = "reportView", method = RequestMethod.GET)
	public String reportView(@RequestParam String userid, Model model) {
		model.addAttribute("userid", userid);
		return "/pm_admin/reportView";
	}

	// 신고 내역 리스트
	@RequestMapping(value = "getReport", method = RequestMethod.POST)
	public ModelAndView getReport(@RequestParam String userid) {
		List<ReportDTO> list = boardService.getReport(userid);

		// System.out.println(list);
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");

		return mav;
	}

	// 신고 3회 이상 받은 회원 리스트
	@RequestMapping(value = "getReportTarget")
	public ModelAndView getReportTarget() {
		List<String> list = boardService.getReportTarget();

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");

		return mav;
	}

	// 공지사항 작성
	@RequestMapping(value = "noticeWrite", method = RequestMethod.POST)
	@ResponseBody
	public void noticeWrite(@RequestParam Map<String, String> map) {
		boardService.noticeWrite(map);
	}
	// ------------------admin
	
	// 공지사항 목록 불러오기
	@RequestMapping(value = "getNoticeList", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getNoticeList() {
		List<NoticeDTO> list = boardService.getNoticeList();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");

		return mav;
	}
	// 유저 총 찜수 불러오기
	@RequestMapping(value = "getMyZzim", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getMyZzim(@RequestParam String userId) {
		List<WishlistDTO> list = boardService.getMyZzim(userId);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");

		return mav;
	}
	
	
	//----------------------qna----------------------------//
	@RequestMapping(value="qna",method=RequestMethod.GET)
	public String qna(Model model) {
		model.addAttribute("display", "/pm_qna/qna.jsp");
		return "/index";
	}
	
	@RequestMapping(value="qnaWrite",method=RequestMethod.POST)
	@ResponseBody
	public void qnaWrite(@ModelAttribute QnaDTO qnaDTO,HttpServletRequest request,@RequestParam("img1url") String img1url
						,@RequestParam("img2url") String img2url,
						@RequestParam("img3url") String img3url) {
		//String filePath = "C:/project/Pmang/pmang_Project/src/main/webapp/storage/";

		String filePath = "D:\\git_home\\Pmang\\pmang_Project\\src\\main\\webapp\\storage";
		
		UUID uuid=UUID.randomUUID();
		
		try {

			byte[] in1 = null;
			byte[] in2 = null;
			byte[] in3 = null;

			if (!img1url.equals("undefined")) {
				in1 = Base64Utils.decodeBase64ToBytes(img1url);
				File file1 = new File(filePath, uuid.toString() + "_" + qnaDTO.getImg1());
				FileCopyUtils.copy(in1, new FileOutputStream(file1));
				qnaDTO.setImg1(uuid.toString() + "_" + qnaDTO.getImg1());
			}
			if (!img2url.equals("undefined")) {
				in2 = Base64Utils.decodeBase64ToBytes(img2url);
				File file2 = new File(filePath, uuid.toString() + "_" + qnaDTO.getImg2());
				FileCopyUtils.copy(in2, new FileOutputStream(file2));
				qnaDTO.setImg2(uuid.toString() + "_" + qnaDTO.getImg2());

			}
			if (!img3url.equals("undefined")) {
				in3 = Base64Utils.decodeBase64ToBytes(img3url);
				File file3 = new File(filePath, uuid.toString() + "_" + qnaDTO.getImg3());
				FileCopyUtils.copy(in3, new FileOutputStream(file3));
				qnaDTO.setImg3(uuid.toString() + "_" + qnaDTO.getImg3());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		boardService.qnaWrite(qnaDTO);
	}
	
	@RequestMapping(value="getQnaList",method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getQnaList(@RequestParam String userid) {
		List<QnaDTO> list=boardService.getQnaList(userid);
		
		ModelAndView mav=new ModelAndView();
		mav.addObject("list",list);
		mav.setViewName("jsonView");
		
		return mav;
	}
	
	@RequestMapping(value="getQna",method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getQna() {
		List<QnaDTO> list=boardService.getQna();
		
		ModelAndView mav=new ModelAndView();
		mav.addObject("list",list);
		mav.setViewName("jsonView");
		
		return mav;
	}

	@RequestMapping(value="qnaReplyWrite",method=RequestMethod.POST)
	@ResponseBody
	public void qnaReplyWrite(@RequestParam String qna_seq,@RequestParam String qnaContent) {
		boardService.qnaReplyWrite(qna_seq,qnaContent);
	}
	
	
	//---------------------------------------------우석수정
	@RequestMapping(value="getItemInfo",method=RequestMethod.POST)
	public ModelAndView getItemInfo(HttpSession session,@RequestParam String item_seq) {
		ItemDTO itemDTO = boardService.getItemInfo(item_seq);
		System.out.println("itemDTO.getUserId() : " + itemDTO.getUserId());
		
		ModelAndView mav=new ModelAndView();
		mav.addObject("itemDTO",itemDTO);
		mav.addObject("memUserId",session.getAttribute("memUserId"));
		System.out.println("test : "+session.getAttribute("memUserId"));
		mav.setViewName("jsonView");
		
		return mav;
	}
	//---------------------------------------------우석수정
	
	
}
