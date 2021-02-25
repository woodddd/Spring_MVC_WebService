package hello.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="/")
public class HelloController {
	
	
	@RequestMapping(value="index", method=RequestMethod.GET)
	public String index(Model model) {
		model.addAttribute("display", "/pm_todayItem/todayItem.jsp");
		return "/index";
	}
	
	

}

