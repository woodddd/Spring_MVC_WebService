package talk.controller;


import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import board.bean.ItemDTO;
import member.bean.SellerDTO;
import talk.bean.MessageDTO;
import talk.bean.TalkRoomDTO;
import talk.service.TalkService;

@Controller
@RequestMapping(value="talk")
public class TalkController {
	
	@Autowired
	private TalkService talkService;
	
	@RequestMapping(value="talkRoom",method=RequestMethod.GET)
    public ModelAndView talkRoom(@RequestParam String item_seq,
                          @RequestParam String partner_userId,//상대방 user_id
                          HttpSession session) {
          
       System.out.println("아이템 seq : "+item_seq);
       System.out.println("partner_userId : " + partner_userId);
       System.out.println("로그인된 세션 아이디" + session.getAttribute("memUserId"));
       //session.setAttribute("userId","hong");
       //session.setAttribute("userId", "gil");
       
       TalkRoomDTO talkRoomDTO = new TalkRoomDTO();
       talkRoomDTO.setItem_seq(Integer.parseInt(item_seq));
       talkRoomDTO.setPartner_userId(partner_userId);
       talkRoomDTO.setUserId((String) session.getAttribute("memUserId"));
       TalkRoomDTO getTalkRoomDTO = talkService.isRoom(talkRoomDTO);
       if (getTalkRoomDTO != null) {
          int talkRoom_seq = getTalkRoomDTO.getTalkRoom_seq();
          session.setAttribute("talkRoom_seq", talkRoom_seq);
       } else {
          session.setAttribute("talkRoom_seq", -1);
       }
       
       
       //판매글 제목, 가격, 상점명, 상대방아이디 - 아이템
       ItemDTO itemDTO = talkService.getItem(Integer.parseInt(item_seq));
       
       //상대방 아이디로 프로필사진 가져오기 - 판매자
       //String partner_userId = itemDTO.getUserId();
       
       SellerDTO sellerDTO = talkService.getSeller(itemDTO.getUserId());
       System.out.println("itemDTO.getUserId() : " + itemDTO.getUserId());
       System.out.println("sellerDTO.getMarketname()"+sellerDTO.getMarketname());
       
       Map<String,Object> sellerItem = new HashMap<String,Object>();
       sellerItem.put("marketName", sellerDTO.getMarketname());
       if(sellerDTO.getPf_photo() == null ||  sellerDTO==null) {
          sellerItem.put("pf_photo", "/pmang/image/grayPmang.png");
           }else {
              sellerItem.put("pf_photo","/pmang/storage/"+ sellerDTO.getPf_photo());                     
           }
       System.out.println("사진"+sellerDTO.getPf_photo());
       sellerItem.put("userId", sellerDTO.getUserid());
       sellerItem.put("img1", itemDTO.getImg1());
       DecimalFormat df = new DecimalFormat("#,##0");
       sellerItem.put("item_price", df.format(itemDTO.getItem_price()));
       sellerItem.put("item_Subject", itemDTO.getItem_subject());
       //sellerItem.put("partner_userId", partner_userId);
       
       //-----------------------------헤더모달
       //상점후기
       Map<String, Integer> ReviewData = talkService.getReviewStamp();
       
       //판매상품
       int itemCount = talkService.getItemCount(itemDTO.getUserId());
       
       //판매내역
       int salesCount = talkService.getSalesCount(itemDTO.getUserId());
       
       ModelAndView mav = new ModelAndView();
       mav.addObject("sellerItem",sellerItem);
       mav.addObject("ReviewData",ReviewData);
       mav.addObject("itemCount",itemCount);
       mav.addObject("salesCount",salesCount);
       mav.setViewName("/talk/talkRoom");
       
       return mav;
    }
	
		@RequestMapping(value = "getMessage", method=RequestMethod.POST)
		public ModelAndView getMessage(@RequestParam String partner_userId,
				HttpSession session) {
			
			//message가 존재한다면, message 가져오기
			Map<String,String> userMap = new HashMap<String,String>();
			
			userMap.put("userId", (String)session.getAttribute("memUserId"));
			userMap.put("partner_userId", partner_userId);
			
			List<MessageDTO> messageList = talkService.getMessage(userMap);
			
			ModelAndView mav = new ModelAndView();
			mav.addObject("messageList",messageList);
			mav.setViewName("jsonView");
			return mav;
		}

	
		@RequestMapping(value = "talkRoomList", method = RequestMethod.GET)
		public String talkRomList(HttpSession session) { // 톡 리스트로 넘어올때, 둘고와야할 데이터.
			// 임시 세션 저장.
			//session.setAttribute("userId", "hong");
			return "/talk/talkRoomList";
		}
	      
		   @RequestMapping(value = "getRoomList", method = RequestMethod.POST)
		   public ModelAndView getRomList(HttpSession session) { // 톡 리스트로 넘어올때, 둘고와야할 데이터.
		      /* session ID 를 들고, DB에 갔다와야함. */

		      // 리스트 봅아내기
		      String userId = (String) session.getAttribute("memUserId");
		      System.out.println("userId: " + userId);
		      List<TalkRoomDTO> list = talkService.getRoomList(userId);
		      System.out.println("list갯수: " + list.size());
		      // 리스트내용
		      List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();

		      for (TalkRoomDTO talkRoomDTO : list) {
		         int talkRoom_seq = talkRoomDTO.getTalkRoom_seq();// 방번호
		         System.out.println(talkRoom_seq);
		         String partner_userId = talkRoomDTO.getPartner_userId();// 상대방 유저아이디
		         if (partner_userId.equals(userId)) {
		            partner_userId = talkRoomDTO.getUserId();
		         }
		         System.out.println("partner_userId: " + partner_userId);

		         Map<String, Object> map = new HashMap<String, Object>();
		         // 방번호, 파트너유저아이디, 알람여부,
		         map.put("talkRoom_seq", talkRoom_seq);
		         map.put("partner_userId", partner_userId);
		         map.put("notification_status", talkRoomDTO.getNotification_status());
		         // 유저마켓이름, 프로필
		         if (partner_userId != null) {
		            SellerDTO sellerDTO = talkService.getSeller(partner_userId);
		            if (sellerDTO == null) {// 마켓네임이 없으면 일단 유저 아이디를 넣어놈
		               map.put("marketname", partner_userId);
		               map.put("pf_photo", "/pmang/image/grayPmang.png");
		            } else {
		               map.put("marketname", sellerDTO.getMarketname());
		               if (sellerDTO.getPf_photo() == null) {
		                  map.put("pf_photo", "/pmang/image/grayPmang.png");
		                  System.out.println(sellerDTO.getPf_photo());
		               } else {
		                  map.put("pf_photo", "/pmang/storage/" + sellerDTO.getPf_photo());
		               }
		            }
		            // 마지막대화내용, 시간, item_seq
		            MessageDTO messageDTO = talkService.getLastMessage(userId, talkRoom_seq);
		            System.out.println("messageDTO : " + messageDTO);

		            try {
		               if (messageDTO != null) {
		                  // 만약<img로 시작하면 사진이라고 써야하는데..
		                  if (messageDTO.getTalk_content().contains("<img")) {
		                     map.put("talk_content", "사진");
		                  } else {
		                     map.put("talk_content", messageDTO.getTalk_content());
		                  }

		                  map.put("send_time", messageDTO.getSend_time().substring(11, 16));
		                  map.put("item_seq", messageDTO.getItem_seq());
		                  mapList.add(map);

		                  // message가 존재한다면, message 가져오기
		                  Map<String, String> userMap = new HashMap<String, String>();

		                  userMap.put("userId", userId);
		                  userMap.put("partner_userId", partner_userId);

		                  // 안읽은 메세지 갯수
		                  int unread_count = 0;
		                  // --------------------------------------Null Point
		                  List<MessageDTO> messageList = talkService.getMessage(userMap);
		               

		                  for (MessageDTO message : messageList) {
		                     //System.out.println("err : " + message);

		                     if (message.getUserId().equals(userId) && message.getReceiver_user_id().equals(userId)) {

		                        LocalDateTime partner_sendtime = LocalDateTime.parse(message.getSend_time().replace(" ", "T"));
		                        LocalDateTime user_readtime = null;
		                        if (message.getRead_time() == null) {
		                           user_readtime = LocalDateTime.parse("2000-11-12T15:20:31.000");
		                        } else {
		                           user_readtime = LocalDateTime.parse(message.getRead_time().replace(" ", "T"));
		                        }

		                        if (user_readtime.isBefore(partner_sendtime)) {
		                           System.out.println("partner_sendtime: " + partner_sendtime);
		                           unread_count++;
		                        }
		                     }

		                  }
		                  // --------------------------------------Null Point해결??
		                  map.put("unread_count", unread_count);
		                  System.out.println(unread_count);
		               }

		            } catch (Exception e) {
		               // TODO: handle exception
		               System.out.println(e);
		            }

		         }

		      }

		      // 리스트 보내기
		      ModelAndView mav = new ModelAndView();
		      mav.addObject("userId", userId);
		      mav.addObject("mapList", mapList);
		      mav.setViewName("jsonView");
		      //
		      return mav;
		   }

		// 나가기
		@RequestMapping(value = "getOut", method = RequestMethod.POST)
		public String getOut(HttpSession session, @RequestParam String partner_userId) {

	         System.out.println("userId : " + session.getAttribute("memUserId"));
	         System.out.println("partner_userId : " + partner_userId);
	         String userId = (String) session.getAttribute("memUserId");

	         talkService.getOut(userId, partner_userId);
	         return "/talk/talkRoomList";
		}
		
		@RequestMapping(value = "roomOut", method = RequestMethod.POST)
		public String roomOut(HttpSession session, @RequestParam String partner_userId) {
			String userId = (String) session.getAttribute("memUserId");

	        talkService.getOut(userId, partner_userId);
			return "/talk/talkRoom";
		}
		
		@RequestMapping(value="itemSold",method=RequestMethod.POST)
		public ModelAndView sold(@RequestParam String item_seq) {
			
			ModelAndView mav = new ModelAndView();
			
			String item_state = talkService.getItemState(item_seq);
			
			if(item_state.equals("sell")) {
				talkService.itemSold(item_seq);
			}
			
			mav.addObject("item_state",item_state);
			mav.setViewName("jsonView");
			return mav;
		}

		 @RequestMapping(value = "sellCheck", method = RequestMethod.POST)
		 public ModelAndView sellCheck(@RequestParam String item_seq) {
	         String check = talkService.sellCheck(Integer.parseInt(item_seq));
	         
	         ModelAndView mav = new ModelAndView();
	         mav.addObject("check", check);
	         mav.setViewName("jsonView");
	           
	           return mav;
		 }
	
}
