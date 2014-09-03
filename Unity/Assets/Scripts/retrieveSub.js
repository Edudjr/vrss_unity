﻿#pragma strict
import MiniJSON;
import System.Collections.Generic;

class JsonData{
	var root : Dictionary.<String,System.Object>; //root of string : root = {"data":"data",...}
	var status : Status;
	var title : String;
	private var itemsList : List.<System.Object>; //not used by the user. See "items"
	var items : Item[]; //this will be the actual list
	
	function JsonData(jsonString : String){
		this.root = Json.Deserialize(jsonString) as Dictionary.<String,System.Object>;
		this.status = new Status( Json.Serialize(this.root['status']) );
		this.title = this.root['title'] as String;
		this.itemsList = this.root['items'] as List.<System.Object>;
		this.items = new Item[this.itemsList.Count]; //instantiate items
		
		//Multiple 'items' objects. Instantiate Item for each 'items'
		for(var i=0; i < this.itemsList.Count; i++){
			this.items[i] = new Item( Json.Serialize(this.itemsList[i]) );
		}
		
	}
	
	class Status{
		var root : Dictionary.<String,System.Object>;
		var code : int;
		var feed : String;
		var http : String;
		var lastParse : long;
		var period : long;
		var lastMaintenanceAt : long;
		var nextFetch : long;
		var lastFetch : long;
		
		function Status(jsonString : String){
			this.root = Json.Deserialize(jsonString) as Dictionary.<String,System.Object>;
			this.feed = this.root['feed'] as String;
		}
	}
	
	class Item{
		var root : Dictionary.<String,System.Object>;
		var title : String;
		var published : long;
		var id : String;
		var content : String;
		
		function Item(jsonString : String){
			this.root = Json.Deserialize(jsonString) as Dictionary.<String,System.Object>;
			this.title = this.root['title'] as String;
			this.content = this.root['content'] as String;
		}
	}
	
}

function Start () {
	var jsonString =
	'{'
	+'	"status":{'
	+'		"period":900,'
	+'		"code":200,'
	+'		"lastMaintenanceAt":1409673562,'
	+'		"nextFetch":1409692450,'
	+'		"lastFetch":1409691550,'
	+'		"feed":"http://www.theverge.com/rss/index.xml",'
	+'		"http":"Fetched (ring) 200 900 and parsed 0/10 entries",'
	+'		"lastParse":1409691550'
	+'	},'
	+'	"title":"The Verge -  All Posts",'
	+'	"items":['
	+'		{'
	+'			"id":"http://www.theverge.com/2014/9/2/6098347/home-depot-investigating-potentially-massive-credit-card-hack",'
	+'			"title":"Home Depot investigating potentially massive credit card hack",'
	+'			"content": "Home Depot could be the latest major company to have customer credit card data siphoned off and sold online. Security researcher that multiple banks have said the chain might be the source of a batch of credit and debit cards currently being sold in an online black market. I can confirm we are looking into some unusual activity and we are working with our banking partners and law enforcement to investigate, said Home Depot spokesperson Paula Drake in a statement to Krebs, saying that it was too early to tell whether there had in fact been a breach. Krebs believes a Home Depot hack could have been carried out by the same people responsible for it",'
	+'			"published":1409688774,'
	+'			"updated":1409688774,'
	+'			"standardLinks":{'
	+'				"alternate":['
	+'					{'
	+'						"title":"Home Depot investigating potentially massive credit card hack",'
	+'						"href":"http://www.theverge.com/2014/9/2/6098347/home-depot-investigating-potentially-massive-credit-card-hack",'
	+'						"rel":"alternate",'
	+'						"type":"text/html"'
	+'					}'
	+'				]'
	+'			},'
	+'			"permalinkUrl":"http://www.theverge.com/2014/9/2/6098347/home-depot-investigating-potentially-massive-credit-card-hack",'
	+'			"actor":{'
	+'				"id":"Adi Robertson",'
	+'				"displayName":"Adi Robertson"'
	+'			}'
	+'		},'
	+'		{'
	+'			"id":"http://www.theverge.com/2014/9/3/6100557/minecraft-comes-to-the-xbox-one-on-friday",'
	+'			"title":"Minecraft comes to the Xbox One on Friday",'
	+'			"content":"the Xbox 360 when a downloadable version was released in 2012, and this week the blocky world-building phenomenon comes to the consoles successor. Minecraft: Xbox One Edition will be released on Friday, featuring bigger levels and more downloadable content. The new version will cost $4.99 if youre one of the 13 million people that bought the game on the Xbox 360, and $19.99 for everyone else. Fridays release date only applies to the Xbox Store download; Microsoft says a packaged disc will hit stores before the holiday season. Versions of Minecraft for the PlayStation 4 and PS Vita are also on the way.",'
	+'			"published":1409722475,'
	+'			"updated":1409722475,'
	+'			"standardLinks":{'
	+'				"alternate":['
	+'					{'
	+'						"title":"Minecraft comes to the Xbox One on Friday",'
	+'						"href":"http://www.theverge.com/2014/9/3/6100557/minecraft-comes-to-the-xbox-one-on-friday",'
	+'						"rel":"alternate",'
	+'						"type":"text/html"'
	+'					}'
	+'				]'
	+'			},'
	+'			"permalinkUrl":"http://www.theverge.com/2014/9/3/6100557/minecraft-comes-to-the-xbox-one-on-friday",'
	+'			"actor":{'
	+'				"id":"Sam Byford",'
	+'				"displayName":"Sam Byford"'
	+'			}'
	+'		}'
	+'	]'
	+'}';
	
	var json = new JsonData(jsonString);
	Debug.Log(json.status.feed);
	Debug.Log(json.title);
	Debug.Log(json.items[0].content);
}

function Update () {

}