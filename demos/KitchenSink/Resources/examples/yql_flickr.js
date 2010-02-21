// create table view
var tableview = Titanium.UI.createTableView();

Ti.App.fireEvent("show_indicator");

// create table view event listener
tableview.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
});

var navActInd = Titanium.UI.createActivityIndicator();
navActInd.show();
Titanium.UI.currentWindow.setRightNavButton(navActInd);

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

// set our application oauth configuration
var consumerKey = 'dj0yJmk9VWFyZkNSWktpY3h3JmQ9WVdrOVNqWk5Nazl2TXpBbWNHbzlNVGc0TWpNNE9ERXhOZy0tJnM9Y29uc3VtZXJzZWNyZXQmeD04MQ--';
var sharedSecret = '13631ad61af05628c28fc38e7226442398d0a4c2';
Titanium.Yahoo.setOAuthParameters(consumerKey,sharedSecret);
			
Titanium.Yahoo.yql("select * from flickr.photos.interestingness(75)",function(e)
{
	var images = [];
	var data = e.data;
//	Ti.API.info("data = "+JSON.stringify(data));
	for (var c=0;c<data.photo.length;c++)
	{
		var photo = data.photo[c];
		// form the flickr url
		var url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg';
		Ti.API.info("flickr url = "+url);
		var row = Ti.UI.createTableViewRow({height:60});
		var title = Ti.UI.createLabel({
			left:70,
			right:10,
			textAlign:'left',
			width:'auto',
			height:'auto',
			text:photo.title ? photo.title : "Untitled",
			font:{fontWeight:'bold',fontSize:18}
		});
		var image = Ti.UI.createImageView({
			url : url,
			height:50,
			width:50,
			left:10,
			defaultImage:'../modules/ui/images/photoDefault.png'
		});
		row.add(image);
		row.add(title);
		images[c] = row;
	}
	tableview.setData(images);
	navActInd.hide();
	Ti.App.fireEvent("hide_indicator");
});
				
