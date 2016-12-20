package com.artistshop.restcontroller;



import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.artistshop.repository.Item;
import com.artistshop.repository.ItemRepository;
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
		      itemRepository.save(item);
		    }
		    catch (Exception e) {
		      System.out.println(e.getMessage());
		     // return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		    }
		
	}

}
