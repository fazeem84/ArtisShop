package com.artistshop.restcontroller;



import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.artistshop.repository.Item;
import com.artistshop.repository.ItemRepository;
import com.artistshop.request.SendMail;
//import com.artistshop.service.EmailNotifier;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class ArtistShopController {
	@Autowired
	  private Environment env;
	@Autowired
	ItemRepository itemRepository;
	@RequestMapping(value = "/createItem", method = RequestMethod.POST)
	public void uploadFile(@RequestParam("uploadfile") MultipartFile uploadfile,@RequestParam("inputJSON") String inputJson){
		System.out.println(inputJson);
		ObjectMapper mapper = new ObjectMapper();
		 try {
		      // Get the filename and build the local file path
		      String filename = uploadfile.getOriginalFilename();
		      String directory = env.getProperty("com.artistshop.uploadedFiles");
		      
		      String filepath = Paths.get(directory, filename).toString();
		      
		      // Save the file locally
		      BufferedOutputStream stream =
		          new BufferedOutputStream(new FileOutputStream(new File(filepath)));
		      stream.write(uploadfile.getBytes());
		      stream.close();
		      Item item = mapper.readValue(inputJson, Item.class);
		      System.out.println("item =====>>>"+item);
		      String loc=filepath;
		      item.setLocation(loc);
		      itemRepository.save(item);
		    }
		    catch (Exception e) {
		      System.out.println(e.getMessage());
		     // return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		    }
		
	}
	 @RequestMapping(value = "/files/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	    public void getFile(@PathVariable("id") Integer id, HttpServletResponse response) throws IOException {

		  	Item item=	itemRepository.findOne(new Long(id));
	        String filePath = item.getLocation();
	        returnMimeContent(filePath, response);
	    }
	    
	    private void returnMimeContent(String filePath, HttpServletResponse response) throws IOException {
	    	InputStream is = new FileInputStream(filePath);
	        String fileExtension= filePath.substring(filePath.lastIndexOf(".") + 1);
	        String fileAbsoluteName = filePath.substring(filePath.lastIndexOf("/") + 1);
	        response.setHeader("Content-Disposition", "attachment; filename=" + fileAbsoluteName);        
	        String mimeType= URLConnection.guessContentTypeFromName(filePath);
	        if (mimeType == null) {
	            mimeType = env.getProperty("file.mimetype." + fileExtension);
	        }
	        
	        if (mimeType != null) {
	            response.setContentType(mimeType);
	        }
	        
	        IOUtils.copy(is, response.getOutputStream());
	        response.flushBuffer();
	    }
	    
	    @RequestMapping(value = "/sendMail", method = RequestMethod.POST)
	    public void sendMail(@RequestBody SendMail SendMail) throws IOException {
	    	String msg="Item"+SendMail.itemID+" has requested by "+SendMail.name;
	    	System.out.println(msg);
	    	//new EmailNotifier().sendMail(msg);
	    	
	    }

}
