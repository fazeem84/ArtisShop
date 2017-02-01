package com.artistshop.request;

public class SendMail {
	public String name;
	public String email;
	public String contactNumber;
	public String itemID;
	public String comments;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getItemID() {
		return itemID;
	}
	public void setItemID(String itemID) {
		this.itemID = itemID;
	}
	
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	@Override
	public String toString() {
		return "SendMail [name=" + name + ", email=" + email + ", contactNumber=" + contactNumber + ", itemID=" + itemID
				+ ", comments=" + comments + "]";
	}
	
	

}
